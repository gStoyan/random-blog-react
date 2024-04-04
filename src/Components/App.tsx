import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom'
import Create from './Create'
import Home from './Home'
import Login from './Login'
import Statistics from './UserStatistics'

function App() {
  return (
    <div className="App"> 

  <Navbar />
  <div className="content">
  <Routes>
      <Route path='/' element={<Home />} />
      <Route path="create" element={<Create />} />
      <Route path="statistics" element={<Statistics />} />

      <Route path="login" element={<Login />} />
  </Routes>
      </div>
</div>
  );
}

export default App;
