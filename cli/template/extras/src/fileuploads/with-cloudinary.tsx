"use client";

import { CldUploadWidget } from "next-cloudinary";
import React from "react";

export default function FileUpload() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
            alert("file uploaded url is =" + result.info.url);
          }
        }}
        options={{
          singleUploadAutoClose: true,
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Upload
            </button>
          );
        }}
      </CldUploadWidget>
    </main>
  );
}
