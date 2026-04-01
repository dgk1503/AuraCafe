import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Ingredients", path: "/ingredients" },
    { name: "About", path: "/about" },
  ];

  return (
    <div className="flex justify-center items-center py-8">
      <div
        className="flex gap-6 px-8 py-4 rounded-full bg-gradient-to-br from-amber-50/30 to-amber-100/20 backdrop-blur-2xl border border-amber-200/40"
        style={{
          boxShadow:
            "0 8px 32px rgba(217, 119, 6, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.8)",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            onClick={() => setActive(item.name)}
            className={`flex items-center justify-center px-6 py-2 rounded-full font-bold capitalize text-lg transition-all duration-200 ${
              active === item.name
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg"
                : "text-amber-800 hover:bg-amber-100/40"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
