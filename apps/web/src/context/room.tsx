'use client';

import { createContext, useContext, type PropsWithChildren } from 'react';
import { v4 as uuid } from 'uuid';

type RoomContextProps = { roomId: string };

const RoomContext = createContext<RoomContextProps | null>(null);

export const RoomProvider = ({ children }: PropsWithChildren) => {
  return (
    <RoomContext.Provider value={{ roomId: uuid() }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a ChatProvider');
  }
  return context;
};
