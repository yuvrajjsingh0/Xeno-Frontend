import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard';
import { Audience } from './pages/Audience';
import Campaigns from './pages/Campaigns';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Campaign } from './pages/Campaign';

function App() {

  return (
    <Router>
      <div className="App">
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<Campaign />} />
          <Route path="/audience" element={<Audience />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
