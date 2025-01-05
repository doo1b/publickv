import Link from "next/link";
import HeaderBadge from "./HeaderBadge";
import { menu } from "@/utils/category";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 flex h-[70px] w-full items-center justify-center gap-x-3 bg-white px-10">
      {menu.map((m) => (
        <Link href={m[1]} key={m[0]}>
          <HeaderBadge menu={m} />
        </Link>
      ))}
    </header>
  );
};

export default Header;
