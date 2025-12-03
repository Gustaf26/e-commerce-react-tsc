
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import CreateContextProvider from "./contexts/CreateContext.tsx";
import AuthContextProvider from "./contexts/AuthContext.tsx";

import "./assets/scss/app.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <AuthContextProvider>
    <CreateContextProvider>
      <App />
    </CreateContextProvider>
  </AuthContextProvider>
)


