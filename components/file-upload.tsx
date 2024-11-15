// components/file-upload.tsx

"use client";

import { useDropzone } from "@uploadthing/react"; // Importuj komponent z uploadthing
import { generateClientDropzoneAccept } from "uploadthing/client"; // Funkcja generująca akceptowane typy plików

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "imageUploader" | "serverImage" | "messageFile"; // Endpointy uploadthing
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: generateClientDropzoneAccept(["image/jpeg", "image/png"]), // Określamy akceptowane typy plików
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]; // Wybieramy pierwszy plik
      if (file) {
        // Zaczynamy upload pliku
        onChange(URL.createObjectURL(file)); // Zmieniamy URL po załadowaniu pliku
      }
    },
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed p-4 text-center">
      <input {...getInputProps()} />
      <p>Przeciągnij plik tutaj lub kliknij, aby wybrać</p>
      {value && <img src={value} alt="Uploaded preview" className="w-20 h-20 mt-4" />}
    </div>
  );
};
