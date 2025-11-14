import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./Pages/home";
import LoginPage from "./Pages/login";
import NavBar from "./components/Navebar";
import RegisterPage from "./Pages/Register";
import AuthProvider from "./context/Auth/AuthProvider";
function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
            <Route  path="/register" element={<RegisterPage/>}/>            
            <Route  path="/home" element={<HomePage/>}/>
            <Route  path="/" element={<LoginPage/>} />
        </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default App