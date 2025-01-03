import AddExpenditureForm from "./components/AddExpenditureForm";

const page = () => {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <p className="title-18-s">지출 등록하기</p>
      <AddExpenditureForm />
    </div>
  );
};

export default page;
