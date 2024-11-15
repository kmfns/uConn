import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getAuth } from "@clerk/nextjs/server"; // Import getAuth from Clerk for authentication
import { NextRequest } from "next/server"; // Import NextRequest for proper typing

// Tworzymy instancję uploadthing
const f = createUploadthing();

// Funkcja autentykacji użytkownika
const auth = async (req: NextRequest) => {
  // Używamy getAuth z Clerk do sprawdzenia użytkownika
  const { userId } = getAuth(req); // getAuth returns an object, and we can access userId directly
  return userId; // Return userId or null if not authenticated
};

// Tworzymy router plików
export const ourFileRouter = {
  // Endpoint do przesyłania obrazów
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Middleware do autentykacji
    .middleware(async ({ req }) => {
      const userId = await auth(req as NextRequest);

      if (!userId) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId }; // Przechowujemy ID użytkownika w metadanych
    })
    // Po zakończeniu uploadu
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Zwracamy dane po zakończeniu uploadu
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

// Eksportujemy typ dla front-endu
export type OurFileRouter = typeof ourFileRouter;
