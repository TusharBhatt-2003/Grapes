import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  });

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-black">
      <div className="w-full block">
        <Header />
        <main className="mt-[8rem]">
          <Outlet />
        </main>
      </div>
    </div>
  ) : null;
}

export default App;
