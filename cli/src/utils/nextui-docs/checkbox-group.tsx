export const name = "CheckboxGroup";

export const importDocs = `
  import {CheckboxGroup, Checkbox} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " Checkbox Group basic usage",
    import: `
   import {CheckboxGroup, Checkbox} from "@nextui-org/react";
    `,
    description: "This is a basic example usage of the CheckboxGroup.",
    code: `
    <CheckboxGroup
         label="Select cities"
         defaultValue={["buenos-aires", "london"]}
       >
         <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
         <Checkbox value="sydney">Sydney</Checkbox>
         <Checkbox value="san-francisco">San Francisco</Checkbox>
         <Checkbox value="london">London</Checkbox>
         <Checkbox value="tokyo">Tokyo</Checkbox>
       </CheckboxGroup>
    `,
  },
  {
    name: "Checkbox Group Disabled",
    import: `
    import {CheckboxGroup, Checkbox} from "@nextui-org/react";
    `,
    description: "This is an examples of the Disabled CheckboxGroup.",
    code: `
    <CheckboxGroup
         isDisabled
         label="Select cities"
         defaultValue={["buenos-aires", "london"]}
       >
         <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
         <Checkbox value="sydney">Sydney</Checkbox>
         <Checkbox value="san-francisco">San Francisco</Checkbox>
         <Checkbox value="london">London</Checkbox>
         <Checkbox value="tokyo">Tokyo</Checkbox>
       </CheckboxGroup>
    `,
  },
  {
    name: "CheckboxGroup Horizontal",
    import: `
    import {CheckboxGroup, Checkbox} from "@nextui-org/react";
    `,
    description:
      "This is an example of the checkboxGroup Horizontal view. often used in filters etc etc. ",
    code: `
    <CheckboxGroup
      label="Select cities"
      orientation="horizontal"
      color="secondary"
      defaultValue={["buenos-aires", "san-francisco"]}
    >
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>;
    `,
  },
  {
    name: "CheckboxGroup controlled.",
    import: `
    import React from "react";
    import {CheckboxGroup, Checkbox} from "@nextui-org/react";
    `,
    description:
      "you can use the value and onValueChange properties to control the checkbox input value.",
    code: `
    const [selected, setSelected] = React.useState(["buenos-aires", "sydney"]);

    <div className="flex flex-col gap-3">
          <CheckboxGroup
            label="Select cities"
            color="warning"
            value={selected}
            onValueChange={setSelected}
          >
            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
            <Checkbox value="sydney">Sydney</Checkbox>
            <Checkbox value="san-francisco">San Francisco</Checkbox>
          </CheckboxGroup>
          <p className="text-default-500 text-small">Selected: {selected.join(", ")}</p>
        </div>
    `,
  },
  {
    name: "CheckboxGroup invalid.",
    import: `
    import {CheckboxGroup, Checkbox} from "@nextui-org/react";
    `,
    description:
      "This is an example of the CheckboxGroup invalid. it is used when of the checkbox checked is required. ",
    code: `
    export default function App() {
      const [isInvalid, setIsInvalid] = React.useState(true);

      return (
        <CheckboxGroup
          isRequired
          description="Select the cities you want to visit"
          isInvalid={isInvalid}
          label="Select cities"
          onValueChange={(value) => {
            setIsInvalid(value.length < 1);
          }}
        >
          <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
          <Checkbox value="sydney">Sydney</Checkbox>
          <Checkbox value="san-francisco">San Francisco</Checkbox>
          <Checkbox value="london">London</Checkbox>
          <Checkbox value="tokyo">Tokyo</Checkbox>
        </CheckboxGroup>
      );
    }
    `,
  },
  {
    name: "Custom CheckboxGroup Style.",
    import: `
    import React from "react";
    import {CheckboxGroup, Checkbox} from "@nextui-org/react";
    import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";
    `,
    description:
      "You can customize the CheckboxGroup component by passing custom Tailwind CSS classes to the component slots.",
    code: `
    export const CustomCheckbox = ({ user, statusColor, value }) => {
      return (
        <Checkbox
          aria-label={user.name}
          classNames={{
            base: cn(
              "inline-flex max-w-md w-full bg-content1 m-0",
              "hover:bg-content2 items-center justify-start",
              "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-primary"
            ),
            label: "w-full",
          }}
          value={value}
        >
          <div className="w-full flex justify-between gap-2">
            <User
              avatarProps={{ size: "md", src: user.avatar }}
              description={
                <Link isExternal href={user.url} size="sm">
                  @{user.username}
                </Link>
              }
              name={user.name}
            />
            <div className="flex flex-col items-end gap-1">
              <span className="text-tiny text-default-500">{user.role}</span>
              <Chip color={statusColor} size="sm" variant="flat">
                {user.status}
              </Chip>
            </div>
          </div>
        </Checkbox>
      );
    };

    export default function App() {
      const [groupSelected, setGroupSelected] = React.useState([]);

      return (
        <div className="flex flex-col gap-1 w-full">
          <CheckboxGroup
            label="Select employees"
            value={groupSelected}
            onChange={setGroupSelected}
            classNames={{
              base: "w-full"
            }}
          >
            <CustomCheckbox
              value="junior"
              user={{
                name: "Junior Garcia",
                avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
                username: "jrgarciadev",
                url: "https://twitter.com/jrgarciadev",
                role: "Software Developer",
                status: "Active",
              }}
              statusColor="secondary"
            />
            <CustomCheckbox
              value="johndoe"
              user={{
                name: "John Doe",
                avatar: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
                username: "johndoe",
                url: "#",
                role: "Product Designer",
                status: "Vacation",
              }}
              statusColor="warning"
            />
            <CustomCheckbox
              value="zoeylang"
              user={{
                name: "Zoey Lang",
                avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
                username: "zoeylang",
                url: "#",
                role: "Technical Writer",
                status: "Out of office",
              }}
              statusColor="danger"
            />
            <CustomCheckbox
              value="william"
              user={{
                name: "William Howard",
                avatar: "https://i.pravatar.cc/300?u=a048581f4e29026701d",
                username: "william",
                url: "#",
                role: "Sales Manager",
                status: "Active",
              }}
              statusColor="secondary"
            />
          </CheckboxGroup>
          <p className="mt-4 ml-1 text-default-500">
            Selected: {groupSelected.join(", ")}
          </p>
        </div>
      );
    }
    `,
  },
];

export const usageDocs = `


`;
