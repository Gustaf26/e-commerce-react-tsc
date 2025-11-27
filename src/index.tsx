
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import CreateContextProvider from "./contexts/CreateContext.tsx";
import AuthContextProvider from "./contexts/AuthContext.tsx";

import "./assets/scss/app.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <CreateContextProvider>
      <App />
    </CreateContextProvider>
  </AuthContextProvider>
)


