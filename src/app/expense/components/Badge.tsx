const Badge = ({
  type,
  onClick,
  name,
}: {
  type: string | null;
  onClick: (type: string) => void;
  name: string;
}) => {
  return (
    <button
      type="button"
      className={`cursor-pointer rounded-sm border-[1px] border-secondary-200 px-2 py-1 text-secondary-200 hover:border-secondary-900 hover:text-secondary-900 ${type === name && "border-secondary-900 text-secondary-900"}`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default Badge;
