import * as sdgAPI from "../api/sdg";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

export const SDGContext = createContext();
export const useSDGs = () => useContext(SDGContext);

export const SDGProvider = ({ children }) => {
  const [sdgs, setSdgs] = useState([]);
  const [sdg, setSdg] = useState([]);
  const [subSdgs, setSubSdgs] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const refreshSDGs = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await sdgAPI.getAllSDG();
      setSdgs(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSDGByID = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      const data = await sdgAPI.getSDGByID(id);
      // setSdg(data.data.SDG);
      // setSubSdgs(data.data.subSDGs);
      return data.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (sdgs?.length === 0) {
      refreshSDGs();
    }
  }, [sdgs, refreshSDGs]);

  const value = useMemo(
    () => ({
      sdgs,
      sdg,
      subSdgs,
      error,
      loading,
      getSDGByID,
    }),
    [sdgs, sdg, subSdgs, error, loading, getSDGByID]
  );

  return <SDGContext.Provider value={value}>{children}</SDGContext.Provider>;
};
