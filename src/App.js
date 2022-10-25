import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import './App.css';
import NotFound from "./pages/NotFound";
import UsersPage from "./pages/UsersPage";
import SignUpPage from "./pages/SignUp";
import Home from "./pages/Home";
import { UserContext } from "./Context";



function App() {
  const { auth, socket } = useContext(UserContext)
  let actualToken = localStorage.getItem("token")


  useEffect(() => {

    socket.on(`http://localhost:8000`, data => {
      console.log(data);
    });

  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!actualToken && !auth ? (
            <>
              <Route index path="/" element={<LoginPage />} />
              <Route path="/*"
                element={actualToken ? <NotFound /> : <Navigate replace to="/" />} />
              <Route path="/signup" element={<SignUpPage />} />


            </>
          ) :
            <>
              <Route index element={<Home />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/user" element={<UsersPage />} />
            </>}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
