import Navbar from "../Shared/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Create from "../Pages/Create/Create";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Statistics from "../Pages/UserStatistics/UserStatistics";

function App() {
  return (
    <div className="App">
       
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
