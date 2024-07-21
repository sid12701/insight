import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar />
        {children}
      </ThemeProvider>
    </div>
  );
};

export default Layout;
