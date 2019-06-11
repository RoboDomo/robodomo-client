import { useContext } from "react";
import ConfigurationContext from "common/hooks/contexts/ConfigurationContext";

const useConfig = () => {
  return useContext(ConfigurationContext);
};

export default useConfig;
