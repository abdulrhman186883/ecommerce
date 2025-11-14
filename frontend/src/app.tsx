import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./Pages/home";
import LoginPage from "./Pages/login";
import NavBar from "./components/Navebar";
import RegisterPage from "./Pages/Register";
import AuthProvider from "./context/Auth/AuthProvider";
import CartPage from "./Pages/cart";
import ProtectedRoute from "./components/protectedRoute";
import CartProvider from "./context/Cart/cartProvider";

function App() {
    return (
        <AuthProvider>
        <CartProvider>
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
        </CartProvider>
        </AuthProvider>
    )
}

export default App