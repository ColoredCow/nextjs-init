"use client";

import { useAuth } from "@/hooks/auth";
import Navigation from "@/app/(app)/Navigation";
import Loading from "@/app/(app)/Loading";
import ToastProvider from "@/components/ToastProvider";

const AppLayout = ({ children }) => {
  const { user } = useAuth({ middleware: "auth" });

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />

      <main>
        <ToastProvider />
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
