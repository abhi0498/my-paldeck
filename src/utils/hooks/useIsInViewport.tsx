// useIsInViewPort.js
import { useState, useEffect, useRef } from "react";

const useIsInViewPort = (options: any) => {
  const [isInView, setIsInView] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [options]);

  return [targetRef, isInView];
};

export default useIsInViewPort;
