import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";

const Agency = async () => {
  const agencyId = await verifyAndAcceptInvitation();
  g;
  const user = await getAuthUserDetails();

  return <div>Agency</div>;
};

export default Agency;
