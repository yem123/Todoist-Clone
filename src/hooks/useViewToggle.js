import { useEffect, useRef, useState } from "react";

const useViewToggle = () => {
  const viewButtonRef = useRef(null);
  const viewBarRef = useRef(null);
  const [isViewBarVisible, setIsViewBarVisible] = useState(false);

  const handleDocumentClick = (event) => {
    if (
      viewButtonRef.current &&
      viewBarRef.current &&
      (viewButtonRef.current.contains(event.target) ||
        viewBarRef.current.contains(event.target))
    ) {
      setIsViewBarVisible(true);
    } else {
      setIsViewBarVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  return { viewButtonRef, viewBarRef, isViewBarVisible, setIsViewBarVisible };
};

export default useViewToggle;
