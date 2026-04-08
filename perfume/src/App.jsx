// src/App.jsx
import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-950">
      <Header />

      {/* Layout principal: flex horizontal */}
      <div className="flex">
        {/* Sidebar: w-64 fija, visible en lg+ */}
        <Sidebar className="w-64 border-r border-gray-100 p-8 hidden lg:block" />
        
        {/* ProductGrid: se expande para llenar el resto */}
        <div className="flex-1">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}