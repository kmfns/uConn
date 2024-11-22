import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Tworzenie instancji uploadthing
const f = createUploadthing();

// Funkcja autoryzacji, może być dostosowana w zależności od Twojego systemu
const auth = (req: Request) => ({ id: "fakeId" }); // Przykład fałszywej autoryzacji

// FileRouter z definicją rutera uploadu
export const ourFileRouter = {
  // FileRoute dla uploadu obrazu
  imageUploader: f({
    image: {
      maxFileSize: "4MB", // Maksymalny rozmiar pliku
    }
  })
    // Middleware autoryzacji
    .middleware(async ({ req }) => {
      const user = await auth(req); // Sprawdzanie użytkownika

      if (!user) throw new UploadThingError("Unauthorized"); // Rzucenie błędu, jeśli brak użytkownika

      // Metadane, które będą dostępne później
      return { userId: user.id };
    })
    // Obsługa po zakończeniu uploadu
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Zwracamy metadane do klienta
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

