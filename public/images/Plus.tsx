const Plus = ({ classname }: { classname?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C9.44771 0 9 0.447715 9 1V9H1C0.447715 9 0 9.44771 0 10C0 10.5523 0.447715 11 1 11H9V19C9 19.5523 9.44771 20 10 20C10.5523 20 11 19.5523 11 19V11H19C19.5523 11 20 10.5523 20 10C20 9.44771 19.5523 9 19 9H11V1C11 0.447715 10.5523 0 10 0Z"
      />
    </svg>
  );
};

export default Plus;
