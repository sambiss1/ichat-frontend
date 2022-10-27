/* eslint-disable no-console */
import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import "./App.css";
import NotFound from "./pages/NotFound";
import UsersPage from "./pages/UsersPage";
import SignUpPage from "./pages/SignUp";
import Home from "./pages/Home";
import { UserContext } from "./Context";

const App = () => {
  const { auth, socket, setAnError } = useContext(UserContext);
  const actualToken = localStorage.getItem("token");

  useEffect(() => {
    socket.on(`http://localhost:8000`, (data) => {
      console.log(data);
    });

    socket.on("connect_error", (error) => {
      console.log(`connect_error due to ${error.message}`);
      if (error) {
        setAnError(true);
      }
    });

    socket.on("connect_failed", () => {
      console.log("Sorry, there seems to be an issue with the connection!");
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!actualToken && !auth ? (
            <>
              <Route index path="/" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  actualToken ? <NotFound /> : <Navigate replace to="/" />
                }
              />
              <Route path="/signup" element={<SignUpPage />} />
            </>
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/user" element={<UsersPage />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
