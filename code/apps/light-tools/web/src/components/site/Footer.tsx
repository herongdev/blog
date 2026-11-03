import { renderFooter } from "@herong/site-chrome";

export function Footer() {
  return (
    <div dangerouslySetInnerHTML={{ __html: renderFooter() }} />
  );
}
