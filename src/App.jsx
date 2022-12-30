import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { MovieDetailed } from "./components/MovieDetailed";
import { Signup } from "./components/Signup";
import { AuthContext } from "./AuthContext";
import { useState } from "react";

export function App() {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={[token, setToken]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movie-details/:id" element={<MovieDetailed />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
