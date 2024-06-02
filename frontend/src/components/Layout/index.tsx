import React from "react";
import Header from "./Header";
import AccountSignInModal from "../Auth/AccountSignInModal";

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="flex justify-center max-w-[1200px] w-full text-center mt-16 p-6">
          {children}
        </div>
      </div>
      <AccountSignInModal />
    </>
  );
}

export default Layout;
