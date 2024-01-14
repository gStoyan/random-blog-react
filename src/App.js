import Navbar from './Navbar';
import Home from './Home';
import { Routes, Route,Router } from 'react-router-dom';
import Create from "./Create";

function App() {
  return (
    <div className="App"> 

  <Navbar />
  <div className="content">
  <Routes>
      <Route path='/' element={<Home />} />
      <Route path="create" element={<Create />} />
  </Routes>
      </div>
</div>
  );
}

export default App;
