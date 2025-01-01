import { useState } from "react";

const useDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrop = () => {
    setIsOpen(!isOpen);
  };

  const dropClose = () => {
    setIsOpen(false);
  };

  return { isOpen, toggleDrop, dropClose };
};

export default useDropDown;
