const Input = ({
  title,
  error,
  ...rest
}: {
  title: string;
  error?: string;
}) => {
  return (
    <label className="relative flex w-full items-center justify-between">
      {title}
      <input
        {...rest}
        className="body-14-r rounded-md border-[1px] border-secondary-300 px-2 py-1 text-secondary-800 focus:border-secondary-800 focus:outline-none"
      ></input>
      {error && (
        <p className="caption absolute -bottom-4 right-1 font-semibold text-red-500">
          {error}
        </p>
      )}
    </label>
  );
};

export default Input;
