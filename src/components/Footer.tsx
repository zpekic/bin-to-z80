
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-6 px-8 border-t border-border mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          BIN to Z80 Disassembler — A command line tool for Windows
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
