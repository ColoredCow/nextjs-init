import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MyApp
        </Link>
        <div className="space-x-4">
          <Link href="/signin">
            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
              Sign In
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
