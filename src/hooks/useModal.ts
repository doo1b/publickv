import { useEffect, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const modalOpen = () => {
    // 모달이 열릴 때 현재 스크롤 위치 저장
    setScrollPosition(window.scrollY);
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body를 fixed로 설정하고 top 값으로 현재 스크롤 위치 지정
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // 모달이 닫힐 때 원래 상태로 복구
    }

    return () => {};
  }, [isOpen, scrollPosition]);

  return { isOpen, modalClose, modalOpen };
};

export default useModal;
