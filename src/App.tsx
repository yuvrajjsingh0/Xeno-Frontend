import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard';
import { Audience } from './pages/Audience';
import Campaign from './pages/Campaign';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/campaigns" element={<Campaign />} />
          <Route path="/audience" element={<Audience />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
