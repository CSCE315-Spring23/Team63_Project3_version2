// components/Layout.tsx
// components/Layout.tsx

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <nav>
      <div id="google_translate_element"></div>
      </nav>
      
      <main>{children}</main>
    </>
  );
};

export default Layout;

