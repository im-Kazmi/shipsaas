export const name = "Avatar";

export const importDocs = `
import {Avatar} from "@nextui-org/react";
`;

export const usageDocs = `
  <div className="flex gap-3 items-center">
       <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
       <Avatar name="Junior" />
       <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
       <Avatar name="Jane" />
       <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
       <Avatar name="Joe" />

      <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />

      <Avatar isBordered color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      <Avatar isBordered color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <Avatar isBordered color="success" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <Avatar isBordered color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <Avatar isBordered color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />

      <AvatarGroup isBordered>
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </AvatarGroup>

      </div>
`;
