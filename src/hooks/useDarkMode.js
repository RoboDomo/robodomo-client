import { useState } from "react";

const useDarkMode = () => {
  const [dark, setDark] = useState(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--prefer-theme")
      .trim() === "dark"
  );
  return [dark, setDark];
};

export default useDarkMode;
