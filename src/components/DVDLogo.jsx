import { nextFriday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";

const DVDLogo = () => {
  const dvdRef = useRef(null);
  const [color, setColor] = useState("hsl(0, 100%, 50%)");

  useEffect(() => {
    const dvd = dvdRef.current;
    const parent = dvd.parentElement; // container div
    let x = 50, y = 50;
    let dx = 2, dy = 2;

    function randomColor() {
      return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
    }

    function animate() {
      const containerWidth = parent.clientWidth;
      const containerHeight = parent.clientHeight;
      const logoWidth = dvd.offsetWidth;
      const logoHeight = dvd.offsetHeight;

      x += dx;
      y += dy;

      let bounced = false;

      // Horizontal bounce
      if (x + logoWidth >= containerWidth) {
        dx *= -1;
        x = containerWidth - logoWidth;
        bounced = true;
      } else if (x <= 0) {
        dx *= -1;
        x = 0;
        bounced = true;
      }

      // Vertical bounce
      if (y + logoHeight >= containerHeight) {
        dy *= -1;
        y = containerHeight - logoHeight;
        bounced = true;
      } else if (y <= 0) {
        dy *= -1;
        y = 0;
        bounced = true;
      }

      // Change color on bounce
      if (bounced) {
        setColor(randomColor());
      }

      dvd.style.left = x + "px";
      dvd.style.top = y + "px";

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <img
      ref={dvdRef}
      src="assets/stamp-nobg.png"
      alt="DVD Logo"
      className="absolute w-32 select-none pointer-events-none"
      style={{
        filter: `drop-shadow(0 0 15px ${color})`,
        backgroundColor: color,
      }}
    />
  );
nextFriday};

export default DVDLogo;
