import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { currentProfile } from "~/lib/current-profile";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn redirectUrl="/" />;
  }

  if (!params.inviteCode) {
    return redirect("/");
  }


  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }


  const serverToUpdate = await db.server.findFirst({
    where: { inviteCode: params.inviteCode },
  });

  if (!serverToUpdate) {
    return redirect("/"); 
  }


  const server = await db.server.update({
    where: { id: serverToUpdate.id },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });


  if (server) return redirect(`/servers/${server.id}`);

 
  return null;
}

export default InviteCodePage;
