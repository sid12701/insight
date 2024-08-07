import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Register from "./pages/Register";
import Login from './pages/Login'
import Viewjournals from "./pages/ViewJournals";
import SingleJournal from "./pages/SingleJournal";
import Chat from "./pages/Chat";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RecoilRoot>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/viewjournal" element={<Viewjournals />} />
            <Route path="/viewjournal/:id" element={<SingleJournal />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </RecoilRoot>
    </LocalizationProvider>
  );
}

export default App;
