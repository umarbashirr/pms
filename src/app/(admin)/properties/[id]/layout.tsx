import React from "react";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

const SinglePropertyLayout = ({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full">
      <div className="hidden lg:block lg:w-72 lg:fixed lg:h-full">
        <Sidebar propertyId={params?.id} />
      </div>
      <div className="lg:pl-72">
        <div className="h-16 flex items-center justify-start border-b px-6">
          <Header propertyId={params?.id} />
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SinglePropertyLayout;
