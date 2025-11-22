import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
