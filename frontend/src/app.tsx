import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./Pages/home";
import LoginPage from "./Pages/login";
import NavBar from "./components/Navebar";
import RegisterPage from "./Pages/Register";
import AuthProvider from "./context/Auth/AuthProvider";
import CartPage from "./Pages/cart";
import ProtectedRoute from "./components/protectedRoute";

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
            <Route  path="/register" element={<RegisterPage/>}/>            
            <Route  path="/" element={<HomePage/>}/>
            <Route  path="/login" element={<LoginPage/>} />
            <Route element={<ProtectedRoute />}>
            <Route  path="/cart" element={<CartPage/>} />
            </Route>
        </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default App