import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import V2 from "./v2.tsx";
createRoot(document.getElementById("root")!).render(<App />);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/v2" element={<V2 />} />
    </Routes>
  </BrowserRouter>
);