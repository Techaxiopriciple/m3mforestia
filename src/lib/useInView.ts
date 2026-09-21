import { useEffect, useRef, useState } from "react";

// Defers mounting/loading heavy media (video, large images) until the
// element is about to scroll into view, instead of fetching it eagerly
// on page load alongside everything else above the fold.
// By default it fires once and stays true; pass `once = false` to keep
// tracking so `inView` flips back to false when the element leaves view.
export function useInView<T extends HTMLElement>(rootMargin = "300px", once = true) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const done = once && inView;

  useEffect(() => {
    const el = ref.current;
    if (!el || done) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [done, rootMargin, once]);

  return { ref, inView };
}
