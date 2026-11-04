import { forwardRef, type ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { 'aria-label': string };

/** A named native button; DOM props and refs remain intact for Radix asChild. */
const IconButton = forwardRef<HTMLButtonElement, Props>(function IconButton({ type = 'button', ...props }, ref) {
  return <button type={type} {...props} ref={ref} />;
});

export default IconButton;
