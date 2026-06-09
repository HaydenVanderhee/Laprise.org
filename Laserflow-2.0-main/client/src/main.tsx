import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

if (window.location.pathname.endsWith('/index.html')) {
  window.history.replaceState(null, '', window.location.pathname.replace('/index.html', '/') || '/')
}

createRoot(document.getElementById("root")!).render(<App />);
