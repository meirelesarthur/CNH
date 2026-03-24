import { RouterProvider } from "react-router";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider } from "./components/AuthContext";
import { router } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}
