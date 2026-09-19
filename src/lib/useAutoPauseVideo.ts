import { useEffect, useRef } from "react";

// Pauses a looping background <video> whenever it scrolls out of view and
// resumes it when it scrolls back in, so decode/compositing work isn't spent
// on video the visitor can't currently see while they scroll past it.
export function useAutoPauseVideo<T extends HTMLVideoElement>(threshold = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
