const Input = ({
  title,
  error,
  value,
  onChange,
  ...rest
}: {
  title: string;
  error?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="relative flex w-full items-center justify-between">
      {title}
      <input
        {...rest}
        value={value}
        onChange={onChange}
        className="body-14-r rounded-md border-[1px] border-secondary-800 px-2 py-1 text-secondary-800 focus:border-secondary-800 focus:outline-none"
      />
      {error && (
        <p className="caption absolute -bottom-4 right-1 font-semibold text-red-500">
          {error}
        </p>
      )}
    </label>
  );
};

export default Input;
