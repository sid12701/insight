import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Journal from './pages/Journal'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
