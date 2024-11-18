import { Button, Html } from "@react-email/components";
import React from "react";

interface EmailProps {
  url: string;
}

export const Email = ({ url }:EmailProps) => {
  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
};
