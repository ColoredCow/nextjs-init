import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "@/components/common/Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-background shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-foreground">
          MyApp
        </Link>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className="hidden md:flex space-x-4">
          <Link href="/signin">
            <Button variant="primary">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary">Sign Up</Button>
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          <Link href="/signin">
            <Button variant="primary">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary">Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
