import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

// Keep the interaction mode aligned with the sidebar's 760px CSS breakpoint.
const mobileQuery = "(max-width: 760px)";

/** Desktop disclosure and the temporary mobile drawer have independent state. */
export function useSidebarDisclosure() {
  const id = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState(() => ({
    mobile: matchMedia(mobileQuery).matches,
    desktopOpen: true,
    mobileOpen: false,
  }));
  const open = state.mobile ? state.mobileOpen : state.desktopOpen;
  const previousOpen = useRef(open);

  useEffect(() => {
    const media = matchMedia(mobileQuery);
    const update = () =>
      setState((current) =>
        current.mobile === media.matches
          ? current
          : { ...current, mobile: media.matches, mobileOpen: false },
      );
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useLayoutEffect(() => {
    if (previousOpen.current !== open) {
      // Move focus off the inert control. Mobile opening is handled by its focus manager.
      if (!open) openButtonRef.current?.focus({ preventScroll: true });
      else if (!state.mobile)
        closeButtonRef.current?.focus({ preventScroll: true });
    }
    previousOpen.current = open;
  }, [open, state.mobile]);

  function setOpen(next: boolean) {
    setState((current) =>
      current.mobile
        ? { ...current, mobileOpen: next }
        : { ...current, desktopOpen: next },
    );
  }
  return {
    id,
    open,
    mobile: state.mobile,
    openButtonRef,
    closeButtonRef,
    expand: () => setOpen(true),
    collapse: () => setOpen(false),
  };
}
