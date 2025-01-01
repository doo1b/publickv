import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  return { isOpen, modalClose, modalOpen };
};

export default useModal;
