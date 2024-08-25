import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Viewjournals from "./pages/ViewJournals";
import SingleJournal from "./pages/SingleJournal";
import Chat from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/toaster";
import TestChatComponent from "./pages/TestChat";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RecoilRoot>
        <BrowserRouter>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/journal"
                element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/viewjournal"
                element={
                  <ProtectedRoute>
                    <Viewjournals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/viewjournal/:id"
                element={
                  <ProtectedRoute>
                    <SingleJournal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/testchat"
                element={
                  <ProtectedRoute>
                    <TestChatComponent />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster />
            </ThemeProvider>
        </BrowserRouter>
      </RecoilRoot>
    </LocalizationProvider>
  );
}



export default App;
