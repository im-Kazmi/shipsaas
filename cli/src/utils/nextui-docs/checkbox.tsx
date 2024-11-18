export const name = "Checkbox";

export const importDocs = `
  import {Checkbox} from "@nextui-org/react";
`;
export const notes =
  "NextUI Checkbox also supports native events like onChange, useful for form libraries such as Formik and React Hook Form.";
export const usageExamples = [
  {
    name: " Checkbox basic usage",
    import: `
  import {Checkbox} from "@nextui-org/react";
    `,
    description: "This is a basic example usage of the Checkbox.",
    code: `
    <Checkbox defaultSelected>Option</Checkbox>
    `,
  },
  {
    name: "Checkbox Disabled",
    import: `
    import {Checkbox} from "@nextui-org/react";
    `,
    description: "This is an examples of the Disabled Checkbox.",
    code: `
      <Checkbox isDisabled>Option</Checkbox>
    `,
  },
  {
    name: "Checkbox with different Sizes",
    import: `
    import {Checkbox} from "@nextui-org/react";
    `,
    description: "These are the examples of the checkbox sizes. ",
    code: `
    <Checkbox defaultSelected size="sm">Small</Checkbox>
    <Checkbox defaultSelected size="md">Medium</Checkbox>
    <Checkbox defaultSelected size="lg">Large</Checkbox>
    `,
  },
  {
    name: "Checkbox with different Colors",
    import: `
    import {Checkbox} from "@nextui-org/react";
    `,
    description:
      "These are the examples of the Checkbox with different color. ",
    code: `
    <Checkbox defaultSelected color="default">Default</Checkbox>
    <Checkbox defaultSelected color="primary">Primary</Checkbox>
    <Checkbox defaultSelected color="secondary">Secondary</Checkbox>
    <Checkbox defaultSelected color="success">Success</Checkbox>
    <Checkbox defaultSelected color="warning">Warning</Checkbox>
    <Checkbox defaultSelected color="danger">Danger</Checkbox>
    `,
  },
  {
    name: "Checkbox with different Radiuses.",
    import: `
    import {Checkbox} from "@nextui-org/react";
    `,
    description:
      "These are the examples of the Checkbox with different radiuses for rounding/circiling the checkbox. ",
    code: `
    <Checkbox defaultSelected radius="full">Full</Checkbox>
       <Checkbox defaultSelected radius="lg">Large</Checkbox>
       <Checkbox defaultSelected radius="md">Medium</Checkbox>
       <Checkbox defaultSelected radius="sm">Small</Checkbox>
       <Checkbox defaultSelected radius="none">None</Checkbox>
    `,
  },
  {
    name: "Checkbox with Custom Check icon.",
    import: `
    import {Checkbox} from "@nextui-org/react";
    import {HeartIcon} from 'lucide-react';
    import {PlusIcon} from 'lucide-react';
    `,
    description:
      "These are the examples of the Checkbox with custom Check icons. ",
    code: `
      <Checkbox defaultSelected icon={<HeartIcon/>}>Option</Checkbox>
      <Checkbox defaultSelected icon={<PlusIcon/>} color="warning">Option</Checkbox>
    `,
  },
  {
    name: "Checkbox Controlled.",
    import: `
    import React from "react";
    import {Checkbox} from "@nextui-org/react";
    `,
    description:
      "These are the examples of the Checkbox with custom Check icons. ",
    code: `
    const [isSelected, setIsSelected] = React.useState(false);

      return (
        <div className="flex flex-col gap-2">
          <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
            Subscribe (controlled)
          </Checkbox>
          <p className="text-default-500">
            Selected: {isSelected ? "true" : "false"}
          </p>
        </div>
      );
    `,
  },
];

export const usageDocs = `


`;
