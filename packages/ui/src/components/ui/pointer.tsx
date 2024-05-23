'use client';

import Image from 'next/image';
import React, { type PropsWithChildren, useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  type MotionValue,
  useScroll,
} from 'framer-motion';

type FollowPointerProps = PropsWithChildren & {
  title?: string | React.ReactNode;
};

const FollowPointer = ({ title, children, ...props }: FollowPointerProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollX, scrollY } = useScroll({ target: containerRef });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [rect, setRect] = useState<DOMRect | null>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    if (containerRef.current)
      setRect(containerRef.current.getBoundingClientRect());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (rect) {
      x.set(e.clientX - rect.left + scrollX.get());
      y.set(e.clientY - rect.top + scrollY.get());
    }
  };
  const handleMouseLeave = () => setIsInside(false);
  const handleMouseEnter = () => setIsInside(true);

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'none' }}
      ref={containerRef}
      className='relative'
      {...props}>
      <AnimatePresence>
        {isInside && <Pointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

type PointProps = {
  title?: string | React.ReactNode;
  x: MotionValue<number>;
  y: MotionValue<number>;
};
const Pointer = ({ x, y, title }: PointProps) => {
  return (
    <motion.div
      className='absolute z-50 h-4 w-4 rounded-full'
      style={{
        left: x,
        top: y,
        pointerEvents: 'none',
      }}
      initial={{
        scale: 1,
        opacity: 1,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}>
      <svg
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        stroke='currentColor'
        strokeWidth='2'
        className='h-6 w-6 -translate-x-[12px] -translate-y-[0px] -rotate-[75deg] transform stroke-white'
        fill='currentColor'>
        <path d='M 21.15 2.86 C 20.37 2.065 19.203 1.789 18.15 2.15 L 4 6.88 C 1.878 7.574 1.304 10.305 2.966 11.795 C 3.234 12.035 3.544 12.223 3.88 12.35 C 3.88 12.35 9.553 14.631 9.65 14.87 L 11.65 20.12 C 12.067 21.255 13.151 22.007 14.36 22 L 14.43 22 C 15.662 21.978 16.744 21.174 17.12 20 L 21.85 5.83 C 22.201 4.787 21.93 3.636 21.15 2.86 Z' />
      </svg>
      <motion.div
        style={{
          background: 'linear-gradient(to right, #6c63ff 0%, #ff636c 100%)',
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className={
          'text-background min-w-max whitespace-nowrap rounded-full px-0.5 py-0.5 text-xs font-medium'
        }>
        {title}
      </motion.div>
    </motion.div>
  );
};

type TitleComponentProps = {
  title: string;
  avatar: string;
};

const TitleComponent = ({ title, avatar }: TitleComponentProps) => (
  <div className='flex items-center space-x-2'>
    <Image
      src={avatar}
      height='44'
      width='44'
      alt='thumbnail'
      loading='lazy'
      className='border-background rounded-full border-2'
    />
    <p className='pr-3'>{title}</p>
  </div>
);

export { FollowPointer, TitleComponent };
