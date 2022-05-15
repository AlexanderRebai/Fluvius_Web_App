import * as datasourcesAPI from "../api/datasources";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

export const DatasourceContext = createContext();
export const useDatasources = () => useContext(DatasourceContext);

export const DatasourcesProvider = ({ children }) => {
  const [datasources, setDatasources] = useState([]);
  const [datasource, setDatasource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  const refreshDatasources = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await datasourcesAPI.getAllDatasources();
      setDatasources(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDatasourceById = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      const data = await datasourcesAPI.getDatasourceByID(id);
      setDatasource(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getFileByName = useCallback( async (name) => {
    try {
      setError();
      setLoading(true);
      const data = await datasourcesAPI.getFileByName(name);
      setData(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (datasources?.length === 0) {
      refreshDatasources();
    }
  }, [datasources, refreshDatasources]);

  const value = useMemo(
    () => ({
      datasource,
      datasources,
      loading,
      error,
      data,
      getDatasourceById,
      getFileByName,
    }),
    [datasources, datasource, loading, error, data,  getDatasourceById, getFileByName]
  );

  return (
    <DatasourceContext.Provider value={value}>
      {children}
    </DatasourceContext.Provider>
  );
};
