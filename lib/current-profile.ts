import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const currentProfile = async (req: NextRequest) => {
  try {
    const { userId } = getAuth(req); // Extract userId from Clerk's authentication

    if (!userId) {
      console.error("Unauthorized access: userId not found.");
      return null; // Return null if no userId is found
    }

    const profile = await db.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      console.error(`Profile not found for userId: ${userId}`);
      return null; // Return null if no profile is found
    }

    return profile;
  } catch (error) {
    console.error("An error occurred while fetching the profile:", error);
    return null; // Return null in case of an unexpected error
  }
};
