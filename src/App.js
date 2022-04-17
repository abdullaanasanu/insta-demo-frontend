import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import { isLoggedIn } from "./utils/Auth";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
