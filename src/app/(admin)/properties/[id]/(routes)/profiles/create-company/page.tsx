import React from "react";
import CompanyProfileForm from "../_components/CompanyProfileForm";

const CreateCompanyProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div>
        <h2 className="font-semibold text-xl mb-8">
          Create New Company Profile
        </h2>
      </div>
      <div>
        <CompanyProfileForm propertyId={params?.id} />
      </div>
    </div>
  );
};

export default CreateCompanyProfilePage;
