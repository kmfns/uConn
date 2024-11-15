"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing"; // Import z odpowiednią ścieżką
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "imageUploader"; // Zmiana typu endpoint na 'imageUploader'
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value.split(".")[0];

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full 
          absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint} // Przekazujemy endpoint 'imageUploader'
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url); // Aktualizujemy URL po zakończeniu uploadu
      }}
      onUploadError={(error: Error) => console.log(error)} // Obsługa błędów
    />
  );
};
