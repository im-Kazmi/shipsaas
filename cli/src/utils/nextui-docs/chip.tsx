export const name = "Chip";

export const importDocs = `
  import {Chip} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " Chip basic usage",
    import: `
    import {Chip} from "@nextui-org/react";
    `,
    description: "This is a basic example usage of the Chip.",
    code: `
    <Chip>Hey there</Chip>
    `,
  },
  {
    name: " Chip Disabled",
    import: `
    import {Chip} from "@nextui-org/react";
    `,
    description: "This is a basic example usage of the Chip.",
    code: `
    <Chip isDisabled color="primary">Chip</Chip>
    `,
  },
  {
    name: " Chip with different Sizes.",
    import: `
    import {Chip} from "@nextui-org/react";
    `,
    description: "These are the examples of using diffent sizes of the Chip.",
    code: `
    <Chip size="sm">Small</Chip>
    <Chip size="md">Medium</Chip>
    <Chip size="lg">Large</Chip>
    `,
  },
  {
    name: " Chip with different Colors.",
    import: `
    import {Chip} from "@nextui-org/react";
    `,
    description: "These are the examples of using diffent Colors of the Chip.",
    code: `
    <Chip color="default">Default</Chip>
    <Chip color="primary">Primary</Chip>
    <Chip color="secondary">Secondary</Chip>
    <Chip color="success">Success</Chip>
    <Chip color="warning">Warning</Chip>
    <Chip color="danger">Danger</Chip>
    `,
  },
  {
    name: " Chip with different Radiuses.",
    import: `
    import {Chip} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent radiuses of the Chip.",
    code: `
    <Chip radius="full">Full</Chip>
    <Chip radius="lg">Large</Chip>
    <Chip radius="md">Medium</Chip>
    <Chip radius="sm">Small</Chip>
    `,
  },
  {
    name: " Chip with different Variants.",
    import: `
    import {Chip} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent Variants of the Chip.",
    code: `
    <Chip color="warning" variant="solid">Solid</Chip>
    <Chip color="warning" variant="bordered">Bordered</Chip>
    <Chip color="warning" variant="light">Light</Chip>
    <Chip color="warning" variant="flat">Flat</Chip>
    <Chip color="warning" variant="faded">Faded</Chip>
    <Chip color="warning" variant="shadow">Shadow</Chip>
    <Chip color="warning" variant="dot">Dot</Chip>
    `,
  },
  {
    name: " Chip with Start and End Content",
    import: `
    import {Chip} from "@nextui-org/react";
    import {NotificationIcon} from "lucide-react";
    import {CheckIcon} from "lucide-react";
    `,
    description:
      "These are the examples of Chip with start and end content. enhancing the UI.",
    code: `
    <Chip
      startContent={<CheckIcon size={18} />}
      variant="faded"
      color="success">
       mychip
    </Chip>

    <Chip
      endContent={<NotificationIcon size={18} />}
      variant="flat"
      color="secondary">
      mychip
    </Chip>
    `,
  },
  {
    name: " Chip with Close button.",
    import: `
    import {Chip} from "@nextui-org/react";
    `,
    description: "These are the examples of Chip with Close button.",
    code: `
    <Chip onClose={() => console.log("close")}>Chip</Chip>

    <Chip onClose={() => console.log("close")} variant="bordered">
          mychip
    </Chip>
    `,
  },
  {
    name: " Chip with Avatar.",
    import: `
    import {Chip, Avatar} from "@nextui-org/react";
    `,
    description: "These are the examples of Chip with Avatar.",
    code: `
    <Chip
           variant="flat"
           avatar={
             <Avatar
               name="JW"
               src="https://i.pravatar.cc/300?u=a042581f4e29026709d"
             />
           }
         >
           Avatar
         </Chip>

         <Chip
           variant="flat"
           avatar={
             <Avatar name="JW" size="sm" getInitials={(name) => name.charAt(0)} />
           }
         >
           Avatar
         </Chip>
    `,
  },
  {
    name: " List of Chips Components.",
    import: `
    import React from "react";
    import {Chip} from "@nextui-org/react";
    `,
    description:
      "This is an example of list of chips components with fruits data. you can use any data here.",
    code: `
    const initialFruits = ["Apple", "Banana", "Cherry", "Watermelon", "Orange"]

    export default function App() {
      const [fruits, setFruits] = React.useState(initialFruits);

      const handleClose = (fruitToRemove) => {
        setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
        if (fruits.length === 1) {
          setFruits(initialFruits);
        }
      };

      return (
        <div className="flex gap-2">
          {fruits.map((fruit, index) => (
            <Chip key={index} onClose={() => handleClose(fruit)} variant="flat">
              {fruit}
            </Chip>
          ))}
        </div>
      );
    }
    `,
  },
  {
    name: " List of Chips Components.",
    import: `
    import React from "react";
    import {Chip} from "@nextui-org/react";
    `,
    description:
      "This is an example of list of chips components with fruits data. you can use any data here.",
    code: `
    const initialFruits = ["Apple", "Banana", "Cherry", "Watermelon", "Orange"]

    export default function App() {
      const [fruits, setFruits] = React.useState(initialFruits);

      const handleClose = (fruitToRemove) => {
        setFruits(fruits.filter(fruit => fruit !== fruitToRemove));
        if (fruits.length === 1) {
          setFruits(initialFruits);
        }
      };

      return (
        <div className="flex gap-2">
          {fruits.map((fruit, index) => (
            <Chip key={index} onClose={() => handleClose(fruit)} variant="flat">
              {fruit}
            </Chip>
          ))}
        </div>
      );
    }
    `,
  },
];

export const usageDocs = `


`;
