import { BrowserRouter, Routes, Route } from "react-router-dom";  
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import MyNetwork from "./Pages/MyNetwork";
import Messages from "./Pages/Messages";
import Notifications from "./Pages/Notifications";
import Jobs from "./Pages/Jobs";
import './App.css'
import Settings from "./Pages/Settings";



function App() {
  const user = null;
  return (
    <>
<BrowserRouter>
  <Routes>
      <Route path="/register" element={user ? <Home /> : <Register />} />
      <Route path="/login" element={user ? <Home /> : <Login />} />
  
      <Route  path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/networks" element={ <MyNetwork/> } />
          <Route path="/settings" element={<Settings />} />
        </Route>
  </Routes>
</BrowserRouter>

    </>
  ) 
}

export default App
