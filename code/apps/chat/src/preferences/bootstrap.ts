import { applyPreferences, readPreferences } from "./browser";
// Bundled as a small classic head script by Vite, before CSS and React load.
applyPreferences(readPreferences());
