import { useEffect, useRef } from "react";

function chatScroll(depend: any) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 100);
  }, [depend]);
  return ref;
}
export default chatScroll;
