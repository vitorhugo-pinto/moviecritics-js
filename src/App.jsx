import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { MovieDetailed } from "./components/MovieDetailed";
import { Signup } from "./components/Signup";
import { AuthContext } from "./AuthContext";
import { UserContext } from "./UserContext";
import { useState } from "react";

export function App() {
  const initialToken = localStorage.getItem('token');

  const [token, setToken] = useState(initialToken);

  const [user, setUser] = useState('');


  return (
    <AuthContext.Provider value={[token, setToken]}>
      <UserContext.Provider value={[user, setUser]}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movie-details/:id" element={<MovieDetailed />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
