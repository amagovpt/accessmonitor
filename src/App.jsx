import "./styles/theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home/";
import "./i18n";
import Resume from "./pages/Resume";
import Detail from "./pages/Details";
import PageCode from "./pages/PageCode";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [ele, setEle] = useState([]);
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/resumo"
              element={<Resume setAllData={setAllData} setEle={setEle} />}
            />
            <Route
              path="/detalhe"
              element={<Detail allData={allData} ele={ele} />}
            />
            <Route
              path="/resumo/code"
              element={<PageCode setAllData={setAllData} setEle={setEle} />}
            />
            {/* Outras rotas */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
