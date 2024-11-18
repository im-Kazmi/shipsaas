"use client";

import React from "react";

import { UploadButton } from "~/lib/uploadthing";

export default function FileUpload() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
