import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "./ui/toaster";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar />
        {children}
        <Toaster />
      </ThemeProvider>
  );
};

export default Layout;


