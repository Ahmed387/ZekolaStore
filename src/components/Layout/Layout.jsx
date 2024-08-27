
//import style from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

//import Footer from "../Footer/Footer";
export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-24 sm:mt-14  md:mt-8 py-6 sm:py-12">
        <Outlet />
      </div>
    </>
  );
}

