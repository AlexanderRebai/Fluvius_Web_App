import * as doelstellingenAPI from "../api/doelstellingen";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

export const DoelstellingenContext = createContext();
export const useDoelstellingen = () => useContext(DoelstellingenContext);

export const DoelstellingenProvider = ({ children }) => {
  const [doelstellingen, setDoelstellingen] = useState([]);
  const [doelstelling, setDoelstelling] = useState([]);
  const [datasources, setDatasources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const refreshDoelstellingen = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await doelstellingenAPI.getAllDoelstellingen();
      setDoelstellingen(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDoelstellingById = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      const data = await doelstellingenAPI.getDoelstellingByID(id);
      console.log("PROVIDER");
      console.log([data.data.datasources]);
      setDoelstelling(data.data.doelstelling);
      setDatasources([data.data.datasources]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (doelstellingen?.length === 0) {
      refreshDoelstellingen();
    }
  }, [doelstellingen, refreshDoelstellingen]);

  const value = useMemo(() => ({
    doelstelling,
    doelstellingen,
    datasources,
    loading,
    error,
    getDoelstellingById
  }), [doelstelling, doelstellingen, datasources, loading, error, getDoelstellingById]);

  return (
    <DoelstellingenContext.Provider value={value}>
      {children}
    </DoelstellingenContext.Provider>
  );
};
