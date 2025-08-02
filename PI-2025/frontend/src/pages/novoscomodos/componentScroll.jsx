import React, { useState, useRef, useEffect } from 'react';

function ComponenteScroll() {
  const scrollContainerRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    const thumbEl = thumbRef.current;

    if (!scrollEl || !thumbEl) return;

    const updateThumbPosition = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      const thumbTop = (scrollTop / scrollHeight) * clientHeight;

      thumbEl.style.height = `${thumbHeight}px`;
      thumbEl.style.top = `${thumbTop}px`;
    };

    scrollEl.addEventListener("scroll", updateThumbPosition);
    updateThumbPosition();

    return () => scrollEl.removeEventListener("scroll", updateThumbPosition);
  }, []);

  return (
    <div className="mid" ref={scrollContainerRef} >
      <div className='border row'>
        {[...Array(100)].map((_, i) => (
          <p key={i}>Linha {i + 1}</p>
        ))}
      </div>
      <div className="scroll-bar" ref={thumbRef}></div>
    </div>
  );
}

export default ComponenteScroll;
