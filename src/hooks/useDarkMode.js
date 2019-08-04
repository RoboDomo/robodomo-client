import { useState } from "react";

const useDarkMode = () => {
  const [dark, setDark] = useState(false);

  return [dark, setDark];
};

export default useDarkMode;
