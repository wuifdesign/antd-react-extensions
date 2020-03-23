import * as React from 'react';

export type AdminLayoutContextType = {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
}

export const DefaultLayoutContext = React.createContext<AdminLayoutContextType>({
  mobileNavOpen: true,
  setMobileNavOpen: () => null,
});
