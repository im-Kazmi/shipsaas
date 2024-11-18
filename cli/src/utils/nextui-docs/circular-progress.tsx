export const name = "CircularProgress";

export const importDocs = `
  import {CircularProgress} from "@nextui-org/progress";
`;

export const usageExamples = [
  {
    name: " Chip basic usage",
    import: `
    import {CircularProgress} from "@nextui-org/react";
    `,
    description: "This is a basic example usage of the Chip.",
    code: `
    <CircularProgress aria-label="Loading..." />
    `,
  },
  {
    name: "CircularProgress with label",
    import: `
    import {CircularProgress} from "@nextui-org/react";
    `,
    description: "This is an example usage of the CircularProgress with label.",
    code: `
    <CircularProgress aria-label="Loading..." />
    `,
  },
  {
    name: " CircularProgress with different Sizes.",
    import: `
    import {CircularProgress} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent sizes of the CircularProgress.",
    code: `
    <CircularProgress size="sm" aria-label="Loading..."/>
    CircularProgress size="md" aria-label="Loading..."/>
    CircularProgress size="lg" aria-label="Loading..."/>
    `,
  },
  {
    name: " CircularProgress with different Colors.",
    import: `
    import {CircularProgress} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent Colors of the CircularProgress.",
    code: `
    <CircularProgress color="default" aria-label="Loading..."/>
    <CircularProgress color="primary" aria-label="Loading..."/>
    <CircularProgress color="secondary" aria-label="Loading..."/>
    <CircularProgress color="success" aria-label="Loading..."/>
    <CircularProgress color="warning" aria-label="Loading..."/>
    <CircularProgress color="danger" aria-label="Loading..."/>
    `,
  },
  {
    name: " CircularProgress with value.",
    import: `
    import React from "react";
    import {CircularProgress} from "@nextui-org/react";
    `,
    description:
      "CircularProgress with value often used for file upload progress and things like that.",
    code: `
    export default function App() {
      const [value, setValue] = React.useState(0);

      React.useEffect(() => {
        const interval = setInterval(() => {
          setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 500);

        return () => clearInterval(interval);
      }, []);

      return (
        <CircularProgress
          aria-label="Loading..."
          size="lg"
          value={value}
          color="warning"
          showValueLabel={true}
        />
      );
    }

    `,
  },
  {
    name: "CircularProgress with formatted values.",
    import: `
    import {CircularProgress} from "@nextui-org/react";
    `,
    description:
      "CircularProgress with formatted values is really important for showing the percentage or kilometers etc etc.",
    code: `
    <CircularProgress
      label="Speed"
      size="lg"
      value={70}
      color="success"
      formatOptions={{ style: "unit", unit: "kilometer" }}
      showValueLabel={true}
    />
    `,
  },
  {
    name: " CircularProgress with custom styles.",
    import: `
    import {CircularProgress, Card, CardBody, CardFooter, Chip} from "@nextui-org/react";
    `,
    description:
      "You can style CircularProgress with tailwind css as you want. in this example CircularProgress is used with card and chip component.  ",
    code: `
    <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
          <CardBody className="justify-center items-center pb-0">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36 drop-shadow-md",
                indicator: "stroke-white",
                track: "stroke-white/10",
                value: "text-3xl font-semibold text-white",
              }}
              value={70}
              strokeWidth={4}
              showValueLabel={true}
            />
          </CardBody>
          <CardFooter className="justify-center items-center pt-0">
            <Chip
              classNames={{
                base: "border-1 border-white/30",
                content: "text-white/90 text-small font-semibold",
              }}
              variant="bordered"
            >
              2800 Data points
            </Chip>
          </CardFooter>
        </Card>
    `,
  },
];

export const usageDocs = `


`;
