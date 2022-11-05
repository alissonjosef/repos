import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Repositore } from "./pages/Repositores";

export function PageRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/repositore/:repositorio" element={<Repositore />} />
      </Routes>
    </BrowserRouter>
  );
}
