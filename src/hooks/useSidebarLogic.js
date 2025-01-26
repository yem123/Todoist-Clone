import { useState, useRef, useEffect } from "react";

const useSidebarLogic = () => {
  const sidebarRef = useRef(null);
  const [showItems, setShowItems] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isWindowResized, setIsWindowResized] = useState(false);

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (sidebarRef.current) {
        setSidebarWidth(sidebarRef.current.offsetWidth);
      }
    };

    const handleWinResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsWindowResized(true);
      } else {
        setIsSidebarOpen(true);
        setIsWindowResized(false);
      }
    };

    updateSidebarWidth();
    handleWinResize();

    window.addEventListener("resize", handleWinResize);

    const sidebarObserver = new ResizeObserver(() => {
      updateSidebarWidth();
    });
    if (sidebarRef.current) {
      sidebarObserver.observe(sidebarRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleWinResize);
      sidebarObserver.disconnect();
    };
  }, []);

  const resizerStyles = {
    backgroundColor: " #fffbf7",
    zIndex: "10000",
    height: "100%",
    animation: `${
      isSidebarOpen
        ? "sidebarSlideIn 0.3s forwards"
        : "sidebarSlideOut 0.3s forwards"
    }`,
    borderRight: "2px solid #ddd",
  };

  const mainContentMarginLeft = isWindowResized
    ? isSidebarOpen
      ? "-500px"
      : sidebarWidth > 300 
      ? "-460px" : "-320px"
    : isSidebarOpen
      ? "-150px"
      : "-350px";

  return {
    sidebarRef,
    showItems,
    setShowItems,
    isSidebarOpen,
    setIsSidebarOpen,
    isWindowResized,
    sidebarWidth,
    resizerStyles,
    mainContentMarginLeft,
  };
};

export default useSidebarLogic;
