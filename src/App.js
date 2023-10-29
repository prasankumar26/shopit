import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Layout from "./components/layouts/Layout";
import { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/products/ProductDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./components/user/Profile";
import UpdateUser from "./components/user/UpdateUser";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import UploadAvatar from "./components/user/UploadAvatar";
import UpdatePassword from "./components/user/UpdatePassword";
import Forgotpassword from "./pages/auth/Forgotpassword";
import Resetpassword from "./pages/auth/Resetpassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentMethod from "./components/cart/PaymentMethod";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="password/forgot" element={<Forgotpassword />} />
          <Route path="password/reset/:token" element={<Resetpassword />} />

          <Route path="me/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="me/update_profile" element={
          <ProtectedRoute>
          <UpdateUser />
          </ProtectedRoute>
          } />
          <Route path="me/update_avatar" element={
          <ProtectedRoute>
          <UploadAvatar />
          </ProtectedRoute>
          } />
          <Route path="me/update_password" element={
          <ProtectedRoute>
          <UpdatePassword />
          </ProtectedRoute>
          } />

          <Route path="cart" element={<Cart />} />
          <Route path="shipping" element={
          <ProtectedRoute>
          <Shipping />
          </ProtectedRoute>
          } />
          <Route path="confirm_order" element={
          <ProtectedRoute>
          <ConfirmOrder />
          </ProtectedRoute>
          } />
          <Route path="payment_method" element={
          <ProtectedRoute>
          <PaymentMethod />
          </ProtectedRoute>
          } />

          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
       </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;