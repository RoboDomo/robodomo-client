import { useContext } from "react";
import { ConfigContext } from "@/providers/config";

const useConfig = () => {
  return useContext(ConfigContext);
};

export default useConfig;
