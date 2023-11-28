import React, { useEffect, useRef, ReactNode, FC } from "react";

interface ObserverProps {
  children: ReactNode;
  onContentEndVisible: () => void;
}

interface Options {
  rootMargin: string;
  threshold: number;
  root: null;
}

export const Observer: FC<ObserverProps> = ({
  children,
  onContentEndVisible,
}: ObserverProps) => {
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: Options = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
};
