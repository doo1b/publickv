import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";

const DatePicker = ({
  value,
  onChange,
  children,
}: {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  children: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-y-2 text-center">
      <p>{children}</p>
      <Calendar
        mode="single"
        selected={value}
        onSelect={(date) => onChange?.(date!)}
        locale={ko}
        initialFocus
        className="z-0 rounded-lg border-[1px] border-secondary-800 shadow-[0_2px_3px_0_rgba(0,0,0,0.1)]"
      />
    </div>
  );
};

export default DatePicker;
