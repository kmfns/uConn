import { redirect } from "next/navigation";
import { RedirectToSignUp } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return <RedirectToSignUp />;
    }

    const server = await db.server.findUnique({
      where: {
        id: params.serverId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
    });

    if (!server) {
      return redirect("/");
    }

    return (
      <div className="h-full">
        {/* Sidebar for desktop view */}
        <div
          className="hidden md:flex h-full w-60 z-20 
          flex-col fixed inset-y-0"
        >
          <ServerSidebar serverId={params.serverId} />
        </div>

        {/* Main content area */}
        <main className="h-full md:pl-60">{children}</main>
      </div>
    );
  } catch (error) {
    console.error("Error in ServerIdLayout:", error);
    return redirect("/");
  }
};

export default ServerIdLayout;
