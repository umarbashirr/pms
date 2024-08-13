import React, { ReactNode } from "react";

const AdminRootLayout = ({ children }: { children: ReactNode }) => {
  return <div className="h-full">{children}</div>;
};

export default AdminRootLayout;
