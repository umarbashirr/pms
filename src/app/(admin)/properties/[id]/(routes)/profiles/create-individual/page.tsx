import React from "react";
import ProfileForm from "../_components/ProfileForm";

const CreateIndividualProfilePage = ({
  params,
}: {
  params: { id: string };
}) => {
  return (
    <div>
      <div>
        <h2 className="font-semibold text-lg mb-8">
          Create New Individual Profile
        </h2>
      </div>
      <div>
        <ProfileForm propertyId={params?.id} />
      </div>
    </div>
  );
};

export default CreateIndividualProfilePage;
