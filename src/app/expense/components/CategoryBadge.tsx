const CategoryBadge = ({
  c,
  selected,
  setSelected,
  onSelect,
  classname,
}: {
  c: string;
  selected: string;
  setSelected: (c: string) => void;
  onSelect?: (c: string) => void;
  classname?: string;
}) => {
  return (
    <div
      className={`h-full w-full ${selected === c ? "bg-secondary-800 text-white" : "bg-white hover:bg-accent"} flex cursor-pointer items-center justify-center ${classname && classname}`}
      key={c}
      onClick={() => {
        setSelected(c);
        if (onSelect) {
          onSelect(c);
        }
      }}
    >
      {c}
    </div>
  );
};

export default CategoryBadge;
