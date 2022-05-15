import * as templateAPI from "../api/template";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from "react";

export const TemplateContext = createContext();
export const useTemplates = () => useContext(TemplateContext);

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState([]);
  const [categories, setCategories] = useState([]);

  const refreshTemplates = useCallback(async () => {
    try {
      setError();
      setLoading(true);
      const data = await templateAPI.getAllTemplates();
      setTemplates(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTemplateByID = useCallback(async (id) => {
    try {
      setError();
      setLoading(true);
      const data = await templateAPI.getTemplateById(id);
      setTemplate(data.template);
      setCategories(data.categories);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTemplate = useCallback(
    async (id, role, template, categorieIDs) => {
      try {
        setError();
        setLoading(true);
        delete template.allCats;
        const data = await templateAPI.updateTemplate(
          id,
          role,
          template,
          categorieIDs
        );
        await refreshTemplates();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [refreshTemplates]
  );

  useEffect(() => {
    if (templates?.length === 0) {
      refreshTemplates();
    }
  }, [templates, refreshTemplates]);

  const value = useMemo(
    () => ({
      templates,
      loading,
      updateTemplate,
      refreshTemplates,
      template,
      categories,
      getTemplateByID,
      // currentCategorie,
    }),
    [
      templates,
      updateTemplate,
      loading,
      refreshTemplates,
      template,
      categories,
      getTemplateByID,
    ]
  );

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};
