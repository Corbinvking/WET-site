'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Market } from '@/data/markets';
import { MarketDrawer } from '@/components/market/MarketDrawer';

interface DrawerContextType {
  openDrawer: (markets: Market[], title?: string) => void;
  closeDrawer: () => void;
  isOpen: boolean;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [title, setTitle] = useState('Related Markets');

  const openDrawer = (newMarkets: Market[], newTitle?: string) => {
    setMarkets(newMarkets);
    setTitle(newTitle || 'Related Markets');
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, isOpen }}>
      {children}
      <MarketDrawer 
        isOpen={isOpen} 
        onClose={closeDrawer} 
        markets={markets}
        title={title}
      />
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
}


