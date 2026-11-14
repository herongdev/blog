import { chmodSync, lstatSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { equal, SUBJECT } from './config.mjs';
import { RegistryRepository } from './repository.mjs';

const TABLES = new Set(['browser_sessions', 'wechat_flows', 'authorization_codes', 'access_tokens', 'session_bridges', 'session_handoffs']);

export class IdentityStore extends RegistryRepository {
  constructor(directory) {
    mkdirSync(directory, { recursive: true, mode: 0o700 });
    const info = lstatSync(directory);
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('Identity data directory must not be a link');
    chmodSync(directory, 0o700);
    const path = join(directory, 'identity.sqlite');
    for (const suffix of ['', '-wal', '-shm', '-journal']) {
      let entry;
      try { entry = lstatSync(`${path}${suffix}`); } catch (error) { if (error.code !== 'ENOENT') throw error; }
      if (entry) {
        if (!entry.isFile() || entry.isSymbolicLink()) throw new Error('Identity database must be a regular file');
        chmodSync(`${path}${suffix}`, 0o600);
      }
    }
    const database = new DatabaseSync(path);
    super(database);
    chmodSync(path, 0o600);
    this.db.exec(`
      PRAGMA busy_timeout=3000;
      PRAGMA journal_mode=WAL;
      PRAGMA synchronous=FULL;
      PRAGMA secure_delete=ON;
      PRAGMA max_page_count=8192;
      PRAGMA journal_size_limit=1048576;
      PRAGMA wal_autocheckpoint=100;
      CREATE TABLE IF NOT EXISTS owner (
        singleton INTEGER PRIMARY KEY CHECK(singleton=1),
        subject TEXT NOT NULL UNIQUE,
        app_id TEXT NOT NULL,
        openid TEXT NOT NULL,
        name TEXT NOT NULL,
        active INTEGER NOT NULL CHECK(active IN (0,1)),
        created_at INTEGER NOT NULL
      ) STRICT;
    `);
    for (const table of TABLES) {
      this.db.exec(`CREATE TABLE IF NOT EXISTS ${table} (hash TEXT PRIMARY KEY, expires INTEGER NOT NULL, payload TEXT NOT NULL) STRICT;
        CREATE INDEX IF NOT EXISTS ${table}_expires ON ${table}(expires);`);
    }
    this.initializeRegistrySchema();
    this.cleanup();
  }

  transaction(action) {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const result = action();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  owner() {
    return this.db.prepare('SELECT subject,app_id,openid,name,active FROM owner WHERE singleton=1').get() || null;
  }

  importOwner(source, appId, name = '管理员') {
    if (source?.version !== 1 || source.provider !== 'wechat' || source.appId !== appId || !SUBJECT.test(source.id || '') || !/^[A-Za-z0-9_-]{16,128}$/.test(source.openid || '')) throw new Error('Source must be a verified author WeChat owner for this website AppID');
    if (typeof name !== 'string' || !name.trim() || name.length > 100) throw new Error('Owner display name is invalid');
    return this.transaction(() => {
      const existing = this.owner();
      if (existing) {
        if (existing.app_id !== appId || !equal(existing.openid, source.openid) || existing.subject !== source.id) throw new Error('A different owner is already bound; replacement is forbidden');
        this._migrateLegacyOwner();
        return false;
      }
      // Keep the already established local subject; never derive it from a public nickname or UnionID.
      this.db.prepare('INSERT INTO owner VALUES(1,?,?,?,?,1,?)').run(source.id, appId, source.openid, name.trim(), Date.now());
      this._migrateLegacyOwner();
      return true;
    });
  }

  setOwnerActive(active) {
    return this.transaction(() => {
      const owner = this.owner();
      if (!owner) throw new Error('No owner has been imported');
      const user = this.getUser(owner.subject);
      if (!active && user?.status === 'active' && user.platformRole === 'platform_owner' && this.db.prepare("SELECT COUNT(*) AS count FROM users WHERE status='active' AND platform_role='platform_owner'").get().count <= 1) throw new Error('Cannot disable the last active platform owner');
      this.db.prepare('UPDATE owner SET active=? WHERE singleton=1').run(active ? 1 : 0);
      this.db.prepare('UPDATE users SET status=?,updated_at=?,version=version+1 WHERE subject=?').run(active ? 'active' : 'disabled', Date.now(), owner.subject);
      if (!active) {
        this._purgeUserCredentials(owner.subject);
      }
      this._audit(owner.subject, 'user.offline_status', 'user', owner.subject, null, { status: active ? 'active' : 'disabled', source: 'local_cli' });
    });
  }

  row(table, hash) {
    this.checkTable(table);
    const row = this.db.prepare(`SELECT expires,payload FROM ${table} WHERE hash=?`).get(hash);
    if (!row || row.expires <= Date.now()) return null;
    return { ...JSON.parse(row.payload), expires: row.expires };
  }

  put(table, hash, expires, payload, limit) {
    this.checkTable(table);
    this.db.prepare(`DELETE FROM ${table} WHERE expires<=?`).run(Date.now());
    if (this.db.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count >= limit) throw new Error('Identity state capacity reached');
    this.db.prepare(`INSERT INTO ${table}(hash,expires,payload) VALUES(?,?,?)`).run(hash, expires, JSON.stringify(payload));
  }

  remove(table, hash) {
    this.checkTable(table);
    this.db.prepare(`DELETE FROM ${table} WHERE hash=?`).run(hash);
  }

  cleanup() {
    for (const table of TABLES) this.db.prepare(`DELETE FROM ${table} WHERE expires<=?`).run(Date.now());
  }

  checkTable(table) {
    if (!TABLES.has(table)) throw new Error('Invalid identity table');
  }

  close() { this.db.close(); }
}
