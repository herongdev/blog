"use client";

import { useEffect } from "react";
import { initSiteChrome } from "@herong/site-chrome/client";

/** The shared package owns behavior; React only connects its lifecycle. */
export function SiteChromeClient() {
  useEffect(() => initSiteChrome(document), []);
  return null;
}
