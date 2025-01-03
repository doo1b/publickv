import React from "react";
import AddFinancialForm from "./components/AddFinancialForm";

const page = () => {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <p className="title-18-s">금융 비용 등록</p>
      <AddFinancialForm />
    </div>
  );
};

export default page;
