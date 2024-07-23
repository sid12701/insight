import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar />
        {children}
      </ThemeProvider>
  );
};

export default Layout;


