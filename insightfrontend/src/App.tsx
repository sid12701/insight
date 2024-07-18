import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './components/Layout';
function App() {
  return (
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
        </Layout>
      </BrowserRouter>
    )
}

export default App
