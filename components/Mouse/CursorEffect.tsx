'use client'

// components/CursorEffect.js
import { useEffect, useState } from 'react';
import styles from './CursorEffect.module.css';

const CursorEffect = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event:any) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        className={styles.cursor}
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
    </>
  );
};

export default CursorEffect;
