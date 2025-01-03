import { UseFormSetValue, Path, FieldValues, PathValue } from "react-hook-form";
import { useState } from "react";

type NumberFieldValues<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

interface UseCommaFormatProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  fieldName: Path<T> & NumberFieldValues<T>;
}

export const useCommaFormat = <T extends FieldValues>({
  setValue,
  fieldName,
}: UseCommaFormatProps<T>) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  const formatWithCommas = (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(rawValue);

    if (!isNaN(numericValue)) {
      setValue(fieldName, numericValue as PathValue<T, Path<T>>);
      setDisplayValue(formatWithCommas(numericValue));
    }
  };

  return {
    displayValue,
    handleValueChange,
    formatWithCommas,
  };
};
