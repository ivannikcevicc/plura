import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { Plan } from "@prisma/client";
import AgencyDetails from "@/components/forms/AgencyDetails";

const Agency = async ({
  params,
}: {
  params: { plan: Plan; code: string; state: string };
}) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await getAuthUserDetails();

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER")
      redirect("/subaccount");
    else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      if (params.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${params.plan}`);
      }

      if (params.state) {
        const statePath = params.state.split("__")[0];
        const stateAgencyId = params.state.split("__")[1];

        if (!stateAgencyId) return <div>Not auth</div>;
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${params.code}`
        );
      }
    } else return redirect(`/agency/${agencyId}`);
  } else return <div>Not auth</div>;

  const authUser = await currentUser();

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[85-px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl ">Create an Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser?.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
};

export default Agency;
