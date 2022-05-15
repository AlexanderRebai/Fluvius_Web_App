import Navigatie from "./components/Navigatie";
import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "./pages/DashboardPage";
import CategorieDetailPage from "./pages/CategorieDetailPage";
import DoelstellingDetailPage from "./pages/DoelstellingDetailPage";
import E_idPage from "./pages/E-idPage";
import LogInPage from "./pages/LogInPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthProvider";
import { SDGProvider } from "./contexts/SDGProvider";
import { DoelstellingenProvider } from "./contexts/DoelstellingenProvider";
import {
  CategorieënProvider,
  useCategorieën,
} from "./contexts/CategorieënProvider";
import { DatasourcesProvider } from "./contexts/DatasourcesProvider";

import NotFoundPage from "./pages/NotFoundPage";
import TemplatePage from "./pages/TemplatePage";
import Test from "./pages/Test";
import { TemplateProvider } from "./contexts/TemplateProvider";
import DatasourceDetailPage from "./pages/DatasourceDetailPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <AuthProvider>
        <CategorieënProvider>
          <DatasourcesProvider>
            <DoelstellingenProvider>
              <SDGProvider>
                <TemplateProvider>
                  <div>
                    <Routes>
                      <Route exact path="/" element={<LogInPage />} />
                      <Route exact path="/e-id" element={<E_idPage />} />
                      <Route exact path="dashboard" element={<DashboardPage />} />
                      <Route exact path="dashboard/:categorieId" element={<CategorieDetailPage />} />
                      <Route exact path="dashboard/:categorieId/:doelstellingId" element={<DoelstellingDetailPage />} />
                      <Route exact path="dashboard/:categorieId/:doelstellingId/:datasourceId" element={<DatasourceDetailPage />} />
                      <Route exact path="test" element={<Test />} />
                      <Route exact path="dashboard/template" element={<TemplatePage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </div>
                </TemplateProvider>
              </SDGProvider>
            </DoelstellingenProvider>
          </DatasourcesProvider>
        </CategorieënProvider>
      </AuthProvider>
    </>
  );
}

export default App;
