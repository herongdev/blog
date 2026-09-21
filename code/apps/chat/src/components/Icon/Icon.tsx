import type { LucideIcon, LucideProps } from "lucide-react";
import styles from "./Icon.module.css";

export function Icon({
  icon: Glyph,
  size = "md",
  weight = "normal",
  className = "",
  ...props
}: Omit<LucideProps, "size" | "strokeWidth"> & {
  icon: LucideIcon;
  size?: "xs" | "sm" | "md" | "lg" | "hero";
  weight?: "normal" | "light" | "strong";
}) {
  return (
    <Glyph
      aria-hidden="true"
      {...props}
      className={`${styles.icon} ${styles[size]} ${styles[weight]} ${className}`}
    />
  );
}
