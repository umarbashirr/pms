import { redirect } from "next/navigation";
import React from "react";

const SinglePropertyPage = ({ params }: { params: { id: string } }) => {
  if (params?.id) {
    redirect(`/properties/${params.id}/dashboard`);
  }
  return <div>SinglePropertyPage {params.id}</div>;
};

export default SinglePropertyPage;
