import MainCalendar from "./MainCalendar";
import { FaCheck } from "react-icons/fa6";

const legend: { [key: string]: string } = {
  "50만원 이하": "black",
  "100만원 이하": "green",
  "500만원 이하": "blue",
  "500만원 초과": "red",
};

const HomeCalender = () => {
  return (
    <div className={`relative w-full`}>
      <MainCalendar>
        <div className="caption mt-2 flex gap-x-4 md:hidden">
          {Object.entries(legend).map((o) => (
            <div key={o[0]} className="flex items-center gap-x-1">
              <FaCheck color={o[1]} />
              <p>{o[0]}</p>
            </div>
          ))}
        </div>
      </MainCalendar>
    </div>
  );
};

export default HomeCalender;
