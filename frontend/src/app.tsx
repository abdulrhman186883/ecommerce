import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./Pages/home";
import LoginPage from "./Pages/login";
import NavBar from "./components/Navebar";
import RegisterPage from "./Pages/Register";
import AuthProvider from "./context/Auth/AuthProvider";
import CartPage from "./Pages/cart";
import ProtectedRoute from "./components/protectedRoute";
import CartProvider from "./context/Cart/cartProvider";
import CheckoutPage from "./Pages/checkoutpage"
import SuccessPage from "./Pages/success";
import  OrdersPage from "./Pages/myorders"

import AdminProtectedRoute from "./components/adminprotectedRoute";
import AdminDashboard from "./admin/AdminDashboard";
import ProductsList from "./admin/ProductsList";
import CreateProduct from "./admin/CreateProduct";
import EditProduct from "./admin/EditProduct";

function App() {
    return (
        <AuthProvider>
        <CartProvider>
        <BrowserRouter>
        <NavBar />

        <Routes>

            {/* Public Routes */}
            <Route path="/register" element={<RegisterPage/>}/>            
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>} />

            {/* User Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage/>} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/myorder" element={<OrdersPage />} />
            </Route>


            {/*  ADMIN ONLY ROUTES  */}
            <Route element={<AdminProtectedRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductsList />} />
                <Route path="/admin/products/create" element={<CreateProduct />} />
                <Route path="/admin/products/edit/:id" element={<EditProduct />} />
            </Route>

        </Routes>

        </BrowserRouter>
        </CartProvider>
        </AuthProvider>
    );
}


export default App