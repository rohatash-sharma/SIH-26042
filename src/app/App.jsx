import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./providers";
import AppRoutes from "./routes";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
