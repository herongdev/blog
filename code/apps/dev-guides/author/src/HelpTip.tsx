import IconButton from './IconButton';
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CircleHelp } from 'lucide-react';

/** A text-only help tooltip that also opens by tap, without trapping focus. */
export default function HelpTip({ label, children }: { label: string; children: ReactNode }) {
  const id = useId();
  const button = useRef<HTMLButtonElement>(null); const tip = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pinned = useRef(false); const hovered = useRef(false); const focused = useRef(false);
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const [position, setPosition] = useState({ left: 12, top: 12 });
  const cancelClose = () => { clearTimeout(timer.current); };
  const close = () => { cancelClose(); pinned.current = false; setOpen(false); };
  const scheduleClose = () => { cancelClose(); timer.current = setTimeout(() => { if (!hovered.current && !focused.current && !pinned.current) setOpen(false); }, 120); };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (open) { setPresent(true); return; }
    if (!present) return;
    const exit = setTimeout(() => setPresent(false), window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160);
    return () => clearTimeout(exit);
  }, [open, present]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!button.current?.contains(event.target as Node) && !tip.current?.contains(event.target as Node)) close(); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); close(); } };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open]);
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      if (!button.current || !tip.current) return;
      const anchor = button.current.getBoundingClientRect(); const box = tip.current.getBoundingClientRect();
      const left = Math.max(12, Math.min(anchor.left + anchor.width / 2 - box.width / 2, window.innerWidth - box.width - 12));
      const below = anchor.bottom + 6;
      const top = below + box.height <= window.innerHeight - 12 ? below : Math.max(12, anchor.top - box.height - 6);
      setPosition({ left, top });
    };
    place(); window.addEventListener('resize', place); window.addEventListener('scroll', place, true);
    return () => { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
  }, [open, children]);
  return <><IconButton ref={button} type="button" className="help-tip-trigger" aria-label={label} aria-describedby={open ? id : undefined}
    onPointerEnter={(event) => { if (event.pointerType === 'touch') return; hovered.current = true; cancelClose(); setOpen(true); }}
    onPointerLeave={() => { hovered.current = false; scheduleClose(); }}
    onFocus={() => { focused.current = true; cancelClose(); setOpen(true); }}
    onBlur={() => { focused.current = false; pinned.current = false; scheduleClose(); }}
    onClick={() => { cancelClose(); if (pinned.current) close(); else { pinned.current = true; setOpen(true); } }}><CircleHelp size={16} aria-hidden="true" /></IconButton>
    {(open || present) && createPortal(<div ref={tip} id={id} role="tooltip" className="help-tip" style={position} data-state={open ? 'open' : 'closed'} aria-hidden={!open || undefined}
      onAnimationEnd={(event) => { if (event.target === event.currentTarget && !open) setPresent(false); }}
      onPointerEnter={() => { hovered.current = true; cancelClose(); }}
      onPointerLeave={() => { hovered.current = false; scheduleClose(); }}>{children}</div>, document.body)}</>;
}
