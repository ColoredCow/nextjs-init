import { createCookie, readCookie } from "@/services/cookiesService";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const theme = await readCookie("theme");
      const storedTheme = theme?.value || "light";
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(storedTheme);
      setTheme(storedTheme);
    };
    fetchTheme();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    createCookie("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
