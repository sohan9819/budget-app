'use client';

import { DesktopNavbar } from './components/desktop-navbar';
import { MobileNavbar } from './components/mobile-navbar';

const Navbar = () => {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};

export default Navbar;
