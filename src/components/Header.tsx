import Link from "next/link";
import HeaderBadge from "./HeaderBadge";

const Header = () => {
  const menu = [
    ["지출 등록", "/expenditure"],
    ["가계부", "/"],
  ];
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
