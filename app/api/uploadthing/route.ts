import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core"; // Ensure correct import of your file router

// Create route handlers for GET and POST requests
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Optional: Add custom configurations (if necessary)
  // config: {
  //   maxFileSize: "4MB", // Example: Global file size restriction
  // },
});
