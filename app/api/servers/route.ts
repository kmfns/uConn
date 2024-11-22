import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import * as z from "zod";

// Validation schema for the request body
const serverSchema = z.object({
  name: z.string().min(1, "Server name is required."),
  imageUrl: z.string().url("Invalid URL format."),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req); // Authenticate the request

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, imageUrl } = serverSchema.parse(body);

    // Fetch the user's profile
    const profile = await db.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json({ message: "Profile not found" }, { status: 404 });
    }

    // Create a new server
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", issues: error.errors },
        { status: 400 }
      );
    }

    console.error("Error in POST /api/servers:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
