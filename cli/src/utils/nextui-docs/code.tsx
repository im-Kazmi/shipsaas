export const name = "Code";

export const importDocs = `
  import {Code} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " Code basic usage",
    import: `
    import {Code} from "@nextui-org/react";
    `,
    description:
      "This is a basic example usage of the Code. it is often used in documentation sites.",
    code: `
      <Code>npm install @nextui-org/react</Code>
    `,
  },
  {
    name: " Chip Disabled",
    import: `
    import {Code} from "@nextui-org/react";
    `,
    description: "This is a basic example usage of the Chip.",
    code: `
    <Chip isDisabled color="primary">Chip</Chip>
    `,
  },
  {
    name: " Code with different Sizes.",
    import: `
    import {Code} from "@nextui-org/react";
    `,
    description: "These are the examples of using diffent sizes of the Code.",
    code: `
    <Code size="sm">npm install @nextui-org/react</Code>
     <Code size="md">npm install @nextui-org/react</Code>
     <Code size="lg">npm install @nextui-org/react</Code>
    `,
  },
  {
    name: " Code with different Colors.",
    import: `
    import {Code} from "@nextui-org/react";
    `,
    description: "These are the examples of using diffent Colors of the Code.",
    code: `
    <Code color="default">npm install @nextui-org/react</Code>
    <Code color="primary">npm install @nextui-org/react</Code>
    <Code color="secondary">npm install @nextui-org/react</Code>
    <Code color="success">npm install @nextui-org/react</Code>
    <Code color="warning">npm install @nextui-org/react</Code>
    <Code color="danger">npm install @nextui-org/react</Code>
    `,
  },
];

export const usageDocs = `


`;
