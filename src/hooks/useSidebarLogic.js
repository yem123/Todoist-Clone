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
    position: !isSidebarOpen ? "absolute" : "relative",
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

  return {
    sidebarRef,
    showItems,
    setShowItems,
    isSidebarOpen,
    setIsSidebarOpen,
    isWindowResized,
    setSidebarWidth,
    sidebarWidth,
    resizerStyles,
  };
};

export default useSidebarLogic;
