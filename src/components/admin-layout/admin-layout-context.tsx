import * as React from 'react';

export type AdminLayoutContextType = {
  mobileNavOpen: boolean
  setMobileNavOpen: (open: boolean) => void
}

export const AdminLayoutContext = React.createContext<AdminLayoutContextType>({
  mobileNavOpen: true,
  setMobileNavOpen: () => null,
});
