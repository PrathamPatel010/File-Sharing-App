import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import MainPage from './Components/MainPage';
import DownloadPage from './Components/DownloadPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/file/:id" element={<DownloadPage/>}/>
      </Routes>  
    </Router>
  )
}

export default App;
