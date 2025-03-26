import Link from "next/link";
import AuthCard from "@/app/(auth)/AuthCard";
import ApplicationLogo from "@/components/ApplicationLogo";

export const metadata = {
  title: "ColoredCow",
};

const Layout = ({ children }) => {
  return (
    <div>
      <div className="text-gray-900 antialiased">
        <AuthCard
          logo={
            <Link href="/">
              <img
                src={process.env.NEXT_PUBLIC_APP_LOGO || "/logo.png"}
                alt="logo"
                className="h-10 w-auto"
              />
            </Link>
          }
        >
          {children}
        </AuthCard>
      </div>
    </div>
  );
};

export default Layout;
