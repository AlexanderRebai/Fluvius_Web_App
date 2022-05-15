import * as categorieënAPI from "../api/categorieën";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

export const CategorieContext = createContext();
export const useCategorieën = () => useContext(CategorieContext);

export const CategorieënProvider = ({ children }) => {
  const [categorieën, setCategorieën] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [doelstellingen, setDoelstellingen] = useState([]);
  const [onlyCategories, setOnlyCategories] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  // const [currentCategorie, setCurrentCategorie] = useState({});

  const refreshCategorieën = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await categorieënAPI.getFullDataCategories();
      setCategorieën(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategorieën = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await categorieënAPI.getAllCategories();
      setOnlyCategories(data.data);
      return data.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategorieByID = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      const data = await categorieënAPI.getCategorieByID(id);
      setDoelstellingen(data.data.doelstellingen);
      setCategorie(data.data.categorie);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (categorieën?.length === 0 && onlyCategories?.length === 0) {
      refreshCategorieën();
      getCategorieën();
    }
  }, [categorieën, refreshCategorieën]);

  const value = useMemo(
    () => ({
      categorieën,
      categorie,
      doelstellingen,
      error,
      loading,
      onlyCategories,
      getCategorieByID,
      refreshCategorieën,
      getCategorieën,
      // currentCategorie,
    }),
    [
      categorieën,
      categorie,
      doelstellingen,
      error,
      loading,
      onlyCategories,
      getCategorieByID,
      refreshCategorieën,
      getCategorieën,
    ]
  );

  return (
    <CategorieContext.Provider value={value}>
      {children}
    </CategorieContext.Provider>
  );
};
