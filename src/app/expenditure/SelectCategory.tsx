import { useState } from "react";

const SelectMain = ({
  onSelectMain,
  onSelectSub,
  error,
  onReset,
}: {
  onSelectMain: (main: string) => void;
  onSelectSub: (sub: string) => void;
  error?: string;
  onReset?: (reset: () => void) => void;
}) => {
  const main = ["키친빌리지", "스테이크레이브", "생각대로", "기타"];
  const sub = ["임대", "렌탈", "이자", "원리금", "운영비", "공과금"];

  const [selectedMain, setSelectedMain] = useState("");
  const [selectedSub, setSelectedSub] = useState("");

  const reset = () => {
    setSelectedMain("");
    setSelectedSub("");
  };

  if (onReset) {
    onReset(reset);
  }

  return (
    <div className="body-14-r relative flex w-full flex-col gap-y-2">
      <p className="body-16-m text-center">카테고리</p>
      <div className="flex gap-x-3">
        <div className="flex h-full w-full flex-col gap-y-[1px] overflow-clip rounded-md border-[1px] bg-accent text-center">
          {main.map((m) => (
            <div
              className={`flex h-full w-full items-center justify-center ${selectedMain === m ? "bg-accent" : "bg-white"} cursor-pointer`}
              key={m}
              onClick={() => {
                setSelectedMain(m);
                onSelectMain(m);
              }}
            >
              {m}
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col gap-y-[1px] overflow-clip rounded-md border-[1px] bg-accent text-center">
          {sub.map((c) => (
            <div
              className={`h-fit w-full py-2 ${selectedSub === c ? "bg-accent" : "bg-white"} cursor-pointer`}
              key={c}
              onClick={() => {
                setSelectedSub(c);
                onSelectSub(c);
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
      {error && (
        <p className="caption absolute -bottom-4 right-1 font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectMain;
