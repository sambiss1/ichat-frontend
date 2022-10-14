import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import './App.css';
import NotFound from "./pages/NotFound";
// import SignUp from "./pages/SignUp";
import SignUpPage from "./pages/SignUp";
import Home from "./pages/Home";


function App() {
  let actualToken = localStorage.getItem("token")
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!actualToken ? (
            <>
              <Route index element={<LoginPage />} />
              <Route path="/*"
                element={actualToken ? <NotFound /> : <Navigate replace to="/" />} />
              <Route path="/signup" element={<SignUpPage />} />
            </>
          ) :
            <>
              <Route index element={<Home />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/signup" element={<SignUpPage />} />
            </>}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
