"use client";

import { usePathname } from "next/navigation";
import React from "react";

const HeaderBadge = ({ menu }: { menu: string[] }) => {
  const pathname = usePathname();
  return (
    <div
      className={`body-16-r h-fit min-w-fit rounded-xl px-4 py-2 ${pathname === menu[1] ? "bg-secondary-800 text-white" : "bg-secondary-100 hover:bg-secondary-400 hover:text-white"}`}
    >
      {menu[0]}
    </div>
  );
};

export default HeaderBadge;
