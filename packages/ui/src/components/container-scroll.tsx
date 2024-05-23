'use client';

import React, { type PropsWithChildren, useRef } from 'react';
import {
  useScroll,
  useTransform,
  motion,
  type MotionValue,
} from 'framer-motion';

type ContainerProps = PropsWithChildren & {
  titleComponent: string | React.ReactNode;
};

export const ContainerScroll = ({
  titleComponent,
  children,
}: ContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.32, 1.1]);

  const rotate = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      className='relative flex items-center justify-center px-2 md:mb-32 md:h-[60rem] md:px-20 lg:mb-[20vh] lg:h-[75rem]'
      ref={containerRef}>
      <div
        className='relative w-full py-10 md:py-40'
        style={{
          perspective: '1000px',
        }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className='mx-auto max-w-5xl text-center'>
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className='border-muted-foreground/30 bg-background mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-3xl border p-2 shadow-2xl md:h-[40rem] md:p-4'>
      <div className='h-full w-full overflow-hidden rounded-2xl'>
        {children}
      </div>
    </motion.div>
  );
};
