import { useState, useEffect } from "react";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Ingredients", id: "ingredients" },
    { name: "About", id: "about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionBottom = sectionTop + section.element.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActive(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center py-8 z-50 bg-linear-to-b from-black/20 to-transparent">
      <div
        className="flex gap-6 px-8 py-4 rounded-full bg-linear-to-br from-amber-50/30 to-amber-100/20 backdrop-blur-2xl border border-amber-200/40"
        style={{
          boxShadow:
            "0 8px 32px rgba(217, 119, 6, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.8)",
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex items-center justify-center px-6 py-2 rounded-full font-bold capitalize text-lg transition-all duration-200 cursor-pointer ${
              active === item.id
                ? "bg-linear-to-r from-amber-400 to-amber-500 text-white shadow-lg"
                : "text-amber-800 hover:bg-amber-100/40"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
