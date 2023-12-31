import { Outlet, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
    <Header />
    <div className="container">
      <Outlet />
    </div>
    <Footer />
    </>
  )
};

export default Layout;