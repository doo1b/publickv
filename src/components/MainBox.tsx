import { formatWithCommas } from "@/utils/formatWithCommas";

const MainBox = ({ totalMain, m }: { totalMain: number; m: string }) => {
  return (
    <div className="mb-1 flex justify-between gap-x-6 border-b-2 border-secondary-900 pb-1">
      <p className="title-18-s">{m}</p>
      <p className="title-18-m">{formatWithCommas(totalMain)}원</p>
    </div>
  );
};

export default MainBox;
