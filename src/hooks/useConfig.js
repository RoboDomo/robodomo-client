import { useContext } from "react";
import ConfigurationContext from "@/hooks/contexts/ConfigurationContext";

const useConfig = () => {
  return useContext(ConfigurationContext);
};

//
export default useConfig;
