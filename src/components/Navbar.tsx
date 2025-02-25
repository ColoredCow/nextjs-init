import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/theme";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-background shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-foreground">
          BoilerPlate
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Menu Items (Hidden on mobile, shown on md+ screens) */}
        <div className="hidden md:flex space-x-5">
          <Link href="/signin">
            <button className="px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 transition">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
              Sign Up
            </button>
          </Link>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded bg-neutral-500 text-white hover:bg-neutral-600 transition"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link href="/signin">
            <button className="w-full px-4 py-2 rounded bg-primary-500 text-white hover:bg-primary-600 transition">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="w-full px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
              Sign Up
            </button>
          </Link>
          <button
            onClick={toggleTheme}
            className="w-full px-4 py-2 rounded bg-neutral-500 text-white hover:bg-neutral-600 transition"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
