const verifyAdminRights = async (user: any, propertyId: string) => {
  const currentProperty = user.properties.find((d: any) => {
    return d.property === propertyId;
  });

  if (currentProperty.role === "BOT" || currentProperty.role === "AD") {
    return true;
  }

  return false;
};

export default verifyAdminRights;
