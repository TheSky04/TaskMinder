import React, { useState, useRef } from "react";

export default function DraggableProcessBar({progress = 50,setProgress}) {
  const barRef = useRef(null);
  const dragging = useRef(false);

  const handleMouseDown = () => {
    dragging.current = true;
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    const bar = barRef.current;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.min(Math.max((offsetX / rect.width) * 100, 0), 100);
    setProgress(newProgress);
  };

  return (
    <div
      className="w-full mr-auto"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        ref={barRef}
        className="relative h-4 bg-violet-300 rounded-full cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        <div
          className="h-4 bg-violet-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className="absolute top-0 right-0 -mt-8 text-sm font-semibold text-violet-400"
          style={{ left: `calc(${progress}% - 15px)` }}
        >
          %{Math.round(progress)}
        </div>
      </div>
    </div>
  );
}
