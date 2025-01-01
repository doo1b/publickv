"use client";

import Input from "./Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SelectCategory from "./SelectCategory";
import DatePicker from "./DatePicker";
import { useAddExp } from "@/querys/dataQuerys";
import { GeneralExpenditureType, LoanExpenditureType } from "@/type/type";

const AddExpenditureForm = () => {
  const addExp = useAddExp();
  const expSchema = z
    .object({
      amount: z
        .number({
          invalid_type_error: "숫자만 입력",
        })
        .min(1, { message: "0보다 큰 수만 입력" })
        .int({ message: "정수만 입력" }),
      comment: z.string(),
      title: z.string().nonempty({ message: "제목 미입력" }),
      main: z.string().nonempty({ message: "대분류를 선택하세요" }),
      sub: z.string().nonempty({ message: "소분류를 선택하세요" }),
      type: z.string().nonempty({ message: "지출 형태를 선택하세요" }),
      date: z.date({ required_error: "날짜를 선택하세요" }),
      endDate: z.date().optional(),
      card: z.string().nonempty({ message: "카드를 선택하세요" }),
    })
    .refine(
      (data) => {
        if (data.type === "저축" || data.type === "대출") {
          return !!data.endDate;
        }
        return true;
      },
      { message: "만기일을 선택하세요.", path: ["endDate"] },
    );

  type ExpenditureFormData = z.infer<typeof expSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<ExpenditureFormData>({
    resolver: zodResolver(expSchema),
    mode: "onBlur",
    defaultValues: {
      amount: 0,
      comment: "",
      title: "",
      main: "",
      sub: "",
      type: "",
      date: new Date(),
      card: "",
    },
  });

  const dateValue = watch("date");

  const onSubmit = (data: GeneralExpenditureType | LoanExpenditureType) => {
    addExp(data);
    reset();
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
        {...register("amount", {
          valueAsNumber: true,
        })}
        error={errors.amount?.message}
      />
      <SelectCategory
        onSelectMain={(main) => setValue("main", main)}
        onSelectSub={(sub) => setValue("sub", sub)}
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
