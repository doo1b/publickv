import { useState } from "react";
import CategoryBadge from "./CategoryBadge";

const SelectMain = ({
  onSelectMain,
  onSelectSub,
  error,
  onReset,
}: {
  onSelectMain: (main: string) => void;
  onSelectSub?: (sub: string) => void;
  error?: string;
  onReset?: (reset: () => void) => void;
}) => {
  const main = ["주 재료", "공용 재료", "대행비"];
  const sub: { [key: string]: string[] } = {
    "주 재료": [
      "포아이니",
      "장칼국수",
      "스테이크",
      "행찜",
      "그집냉면",
      "아수라",
      "오삼땡",
      "효자동",
      "계탄족",
      "뼈해장국",
      "달봉이네",
      "정셰프",
    ],
    "공용 재료": ["공용 식자재", "공용 용기"],
    대행비: ["2호", "3호", "5호", "6호"],
  };

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
        <div className="flex h-[250px] w-1/3 flex-col gap-y-[1px] overflow-clip rounded-md border-[1px] border-secondary-800 bg-secondary-800 text-center">
          {main.map((m) => (
            <CategoryBadge
              key={m}
              c={m}
              setSelected={setSelectedMain}
              onSelect={onSelectMain}
              selected={selectedMain}
            />
          ))}
        </div>
        <div
          className={`${selectedMain === "주 재료" ? "grid-cols-2" : "grid-cols-1"} grid h-full w-2/3 gap-[1px] overflow-clip rounded-md border-[1px] border-secondary-800 bg-secondary-800 text-center`}
        >
          {selectedMain ? (
            sub[selectedMain].map((c) => (
              <CategoryBadge
                key={c}
                c={c}
                setSelected={setSelectedSub}
                onSelect={onSelectSub}
                selected={selectedSub}
              />
            ))
          ) : (
            <p className="flex items-center justify-center bg-accent">
              선택 필요
            </p>
          )}
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
