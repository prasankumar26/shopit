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

          <Route path="me/profile" element={<Profile />} />
          <Route path="me/update_profile" element={<UpdateUser />} />

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