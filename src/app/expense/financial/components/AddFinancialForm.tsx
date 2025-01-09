"use client";

import Input from "../../../expense/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "../../../expense/components/DatePicker";
import { FinancialInputType } from "@/type/type";
import { useRef } from "react";
import { useAddFin } from "@/querys/dataQuerys";
import Category from "./Category";
import { formatWithCommas } from "@/utils/formatWithCommas";

const AddExpenditureForm = () => {
  // 지출 등록하는 뮤테이션
  const addFin = useAddFin();

  // 폼 제출 후 카테고리 초기화를 위한 Ref 연결
  const resetRef = useRef<(() => void) | null>(null);

  // zod 스키마 설정
  const finSchema = z.object({
    amount: z
      .number({
        invalid_type_error: "숫자만 입력",
      })
      .min(1, { message: "0보다 큰 수만 입력" })
      .int({ message: "정수만 입력" }),
    comment: z.string(),
    title: z.string().nonempty({ message: "내용을 입력하세요" }),
    main: z.string().nonempty({ message: "분류를 선택하세요" }),
    date: z.date({ required_error: "날짜를 선택하세요" }),
  });
  type FinancialFormData = z.infer<typeof finSchema>;

  // react hook form
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FinancialFormData>({
    resolver: zodResolver(finSchema),
    mode: "onBlur",
    defaultValues: {
      amount: 0,
      comment: "",
      title: "",
      main: "",
      date: new Date(),
    },
  });
  const dateValue = watch("date");
  const amountValue = watch("amount");

  // 폼 제출 동작
  const onSubmit = (data: FinancialInputType) => {
    addFin(data);
    reset(); // 폼 리셋
    if (resetRef.current) {
      resetRef.current();
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = Number(rawValue);

    if (!isNaN(numericValue)) {
      setValue("amount", numericValue);
    }
  };

  return (
    <form
      className="body-16-m relative flex w-full flex-col items-center gap-y-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        title="내용"
        {...register("title")}
        error={errors.title?.message}
      />
      <Input
        title="비고"
        {...register("comment")}
        error={errors.comment?.message}
      />
      <Input
        title="금액"
        value={amountValue !== undefined ? formatWithCommas(amountValue) : ""}
        onChange={handleAmountChange}
        error={errors.amount?.message}
      />
      <Category
        onSelectMain={(main) => setValue("main", main)}
        onReset={(reset) => (resetRef.current = reset)}
        error={errors.main?.message}
      />
      <div className="flex gap-x-7">
        <DatePicker
          value={dateValue}
          onChange={(date) => setValue("date", date as Date)}
        >
          지출일
        </DatePicker>
      </div>
      <button className="body-14-m w-fit rounded-md bg-secondary-800 px-4 py-2 text-white hover:bg-secondary-600">
        등록하기
      </button>
    </form>
  );
};

export default AddExpenditureForm;
