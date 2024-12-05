// components/server/server-sidebar.tsx
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";
import { currentProfile } from "~/lib/current-profile";
import { db } from "~/lib/db";
import { ServerHeader } from "@/components/server/server-header"; // Absolute path
import { ServerWithMembersWithProfiles } from "@/types"; // Adjust import if necessary

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  // Get the current profile of the logged-in user
  const profile = await currentProfile();

  if (!profile) {
    // Redirect to sign-in if profile is not available
    return redirect("/");
  }

  // Fetch the server data based on the server ID
  const server = await db.server.findUnique({
    where: { id: serverId },
    include: {
      channels: {
        orderBy: { createdAt: "asc" },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: { role: "asc" },
      },
    },
  });

  if (!server) {
    // Redirect if the server doesn't exist or if the user doesn't have access
    return redirect("/");
  }

  // Filter the channels based on their type (TEXT, AUDIO, VIDEO)
  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  // Filter out the current user's profile from the members list
  const members = server.members.filter((member) => member.profileId !== profile.id);

  // Find the role of the current user in the server
  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      {/* Render Server Header */}
      <ServerHeader server={server} role={role} />

      {/* You can render the channels and members here */}
      <div className="channels">
        <h3>Text Channels</h3>
        <ul>
          {textChannels.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>

        <h3>Audio Channels</h3>
        <ul>
          {audioChannels.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>

        <h3>Video Channels</h3>
        <ul>
          {videoChannels.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      </div>

      {/* Render Members */}
      <div className="members">
        <h3>Members</h3>
        <ul>
          {members.map((member) => (
            <li key={member.profileId}>
              {member.profile?.name} - {member.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};