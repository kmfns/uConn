import { UploadDropzone } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import { OurFileRouter } from "@/lib/uploadthing";

interface FileUploadProps {
  value: string;
  onChange: (value: string) => void;
  endpoint: keyof OurFileRouter; // Restrict to valid router endpoints
}

export const FileUpload = ({ value, onChange, endpoint }: FileUploadProps) => {
  return value ? (
    <div className="relative">
      <img
        src={value}
        alt="Uploaded file"
        className="h-20 w-20 rounded-full object-cover"
      />
      <button
        type="button"
        onClick={() => onChange("")}
        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
      >
        X
      </button>
    </div>
  ) : (
    <UploadDropzone<OurFileRouter, "imageUploader">
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res?.[0]?.url) {
          onChange(res[0].url);
        }
      }}
      onUploadError={(error) => {
        console.error("Upload error:", error);
      }}
    />
  );
};
