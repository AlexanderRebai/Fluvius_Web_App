import { useLocation } from "react-router";
import Header from "../components/Header";

//Onbekende url's opvangen met deze pagina

export default function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <div>
      <Header />
      <p>De webpagina met als url {pathname} bestaat niet.</p>
    </div>
  );
}
