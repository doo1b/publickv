import React, { useState } from "react";
import CategoryBadge from "../../components/CategoryBadge";
import { financialMain } from "@/utils/category";

const Category = ({
  onSelectMain,
  error,
  onReset,
  value,
}: {
  onSelectMain: (main: string) => void;
  error?: string;
  onReset?: (reset: () => void) => void;
  value?: string;
}) => {
  const [selectedMain, setSelectedMain] = useState(value ? value : "");

  const reset = () => {
    setSelectedMain("");
  };

  if (onReset) {
    onReset(reset);
  }

  return (
    <div className="body-14-r relative flex w-full flex-col gap-y-2">
      <p className="body-16-m text-center">카테고리</p>
      <div className="grid grid-cols-2 gap-[1px] overflow-clip rounded-md border-[1px] border-secondary-800 bg-secondary-800 text-center">
        {financialMain.map((m) => (
          <CategoryBadge
            key={m}
            c={m}
            setSelected={setSelectedMain}
            onSelect={onSelectMain}
            selected={selectedMain}
            classname={"py-2"}
          />
        ))}
      </div>
      {error && (
        <p className="caption absolute -bottom-4 right-1 font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Category;
