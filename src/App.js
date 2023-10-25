import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Layout from "./components/layouts/Layout";
import { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/products/ProductDetails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Route>
       </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;