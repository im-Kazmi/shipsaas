export const name = "Dropdown";

export const importDocs = `
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " Dropdown basic usage",
    import: `
    import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/react";`,
    description: "This is a basic example usage of the Dropdown.",
    code: `
    <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            Open Menu
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    `,
  },
  {
    name: " Dropdown with Dynamic items",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
    `,
    description: `
    Dropdown follows the Collection Components API, accepting both static and dynamic collections.

    Static: The usage example above shows the static implementation, which can be used when the full list of options is known ahead of time.
    Dynamic: The example below can be used when the options come from an external data source such as an API call, or update over time.
    `,
    code: `
    export default function App() {
      const items = [
        {
          key: "new",
          label: "New file",
        },
        {
          key: "copy",
          label: "Copy link",
        },
        {
          key: "edit",
          label: "Edit file",
        },
        {
          key: "delete",
          label: "Delete file",
        }
      ];

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={items}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "delete" ? "danger" : "default"}
                className={item.key === "delete" ? "text-danger" : ""}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown with Disabled keys",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
    `,
    description: `
    Dropdown items can be disabled using the disabledKeys prop to the DropdownMenu component.
    Note: It's important to have a unique key for each item, otherwise the disabled keys will not work.
`,
    code: `
    export default function App() {
      return (
        <Dropdown >
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown Action event",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
    `,
    description: `
    You can use the onAction prop to get the key of the selected item.
`,
    code: `
    export default function App() {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Action event example"
            onAction={(key) => alert(key)}
          >
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown with different Variants.",
    import: `
    import React from "react";
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent Variants of the Dropdown component.",
    code: `
    export default function App() {
      const [selectedColor, setSelectedColor] = React.useState("default")

      const variants = ["solid", "bordered", "light", "flat", "faded", "shadow"];

      const DropdownContent = ({variant, color}) => (
        <Dropdown>
          <DropdownTrigger>
            <Button
              color={color}
              variant={variant}
              className="capitalize"
            >
              {variant}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dropdown Variants"
            color={color}
            variant={variant}
          >
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )

      return (
        <div className="flex flex-wrap gap-4">
          {variants.map((variant) => (
            <DropdownContent key={variant} color={selectedColor} variant={variant} />
          ))}
          <RadioGroup
            label="Select dropdown color"
            orientation="horizontal"
            color={selectedColor}
            defaultValue="default"
            onValueChange={setSelectedColor}
          >
            <Radio value="default">Default</Radio>
            <Radio value="primary">Primary</Radio>
            <Radio value="secondary">Secondary</Radio>
            <Radio value="success">Success</Radio>
            <Radio value="warning">Warning</Radio>
            <Radio value="danger">Danger</Radio>
          </RadioGroup>
        </div>
      );
    }
    `,
  },
  {
    name: " Dropdown Single item selection.",
    import: `
    import React from "react";
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
    `,
    description: `You can set the selectionMode property as single to allow the user to select only one item at a time.
`,
    code: `
    export default function App() {
      const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

      const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
      );

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize"
            >
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="text">Text</DropdownItem>
            <DropdownItem key="number">Number</DropdownItem>
            <DropdownItem key="date">Date</DropdownItem>
            <DropdownItem key="single_date">Single Date</DropdownItem>
            <DropdownItem key="iteration">Iteration</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    `,
  },
  {
    name: " Dropdown multiple items selection.",
    import: `
    import React from "react";
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
    `,
    description: `You can set the selectionMode property as single to allow the user to select only one item at a time.
    Note: To allow empty selection, you can set the disallowEmptySelection property as false.
`,
    code: `
    export default function App() {
      const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

      const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]
      );

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="capitalize"
            >
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Multiple selection example"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
          >
            <DropdownItem key="text">Text</DropdownItem>
            <DropdownItem key="number">Number</DropdownItem>
            <DropdownItem key="date">Date</DropdownItem>
            <DropdownItem key="single_date">Single Date</DropdownItem>
            <DropdownItem key="iteration">Iteration</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown with shortcut.",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
`,
    description: `You can use the shortcut prop to add a shortcut to the dropdown item.
    Note: Dropdown does not handle the shortcut event, you need to handle it yourslef.

`,
    code: `
    export default function App() {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" aria-label="Dropdown menu with shortcut">
            <DropdownItem key="new" shortcut="⌘N">New file</DropdownItem>
            <DropdownItem key="copy" shortcut="⌘C">Copy link</DropdownItem>
            <DropdownItem key="edit" shortcut="⌘⇧E">Edit file</DropdownItem>
            <DropdownItem key="delete" shortcut="⌘⇧D" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown items with icons.",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
    import {AddNoteIcon} from "lucide-react";
    import {CopyDocumentIcon} from "lucide-react";
    import {EditDocumentIcon} from "lucide-react";
    import {DeleteDocumentIcon} from "lucide-react";
`,
    description: `It is possible to add icons to the dropdown items using the startContent / endContent props.
    Note: If you use currentColor as the icon color, the icon will have the same color as the item text.
`,
    code: `
    export default function App() {
      const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
            <DropdownItem
              key="new"
              shortcut="⌘N"
              startContent={<AddNoteIcon className={iconClasses} />}
            >
              New file
            </DropdownItem>
            <DropdownItem
              key="copy"
              shortcut="⌘C"
              startContent={<CopyDocumentIcon className={iconClasses} />}
            >
              Copy link
            </DropdownItem>
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              startContent={<EditDocumentIcon className={iconClasses} />}
            >
              Edit file
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
            >
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown items with description.",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
    import {AddNoteIcon} from "lucide-react";
    import {CopyDocumentIcon} from "lucide-react";
    import {EditDocumentIcon} from "lucide-react";
    import {DeleteDocumentIcon} from "lucide-react";
`,
    description: `You can use the description prop to add a description to the dropdown item.
`,
    code: `
    export default function App() {
      const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
            <DropdownItem
              key="new"
              shortcut="⌘N"
              description="Create a new file"
              startContent={<AddNoteIcon className={iconClasses} />}
            >
              New file
            </DropdownItem>
            <DropdownItem
              key="copy"
              shortcut="⌘C"
              description="Copy the file link"
              startContent={<CopyDocumentIcon className={iconClasses} />}
            >
              Copy link
            </DropdownItem>
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              showDivider
              description="Allows you to edit the file"
              startContent={<EditDocumentIcon className={iconClasses} />}
            >
              Edit file
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              description="Permanently delete the file"
              startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
            >
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown with sections.",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button, cn} from "@nextui-org/react";
    import {AddNoteIcon} from "lucide-react";
    import {CopyDocumentIcon} from "lucide-react";
    import {EditDocumentIcon} from "lucide-react";
    import {DeleteDocumentIcon} from "lucide-react";
`,
    description: `You can use the DropdownSection component to group dropdown items.
    Note: Sections without a title must provide an aria-label for accessibility.
`,
    code: `
    export default function App() {
      const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
          <DropdownSection title="Actions" showDivider>
            <DropdownItem
                key="new"
                shortcut="⌘N"
                description="Create a new file"
                startContent={<AddNoteIcon className={iconClasses} />}
              >
                New file
              </DropdownItem>
              <DropdownItem
                key="copy"
                shortcut="⌘C"
                description="Copy the file link"
                startContent={<CopyDocumentIcon className={iconClasses} />}
              >
                Copy link
              </DropdownItem>
              <DropdownItem
                key="edit"
                shortcut="⌘⇧E"
                description="Allows you to edit the file"
                startContent={<EditDocumentIcon className={iconClasses} />}
              >
                Edit file
              </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Danger zone">
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                shortcut="⌘⇧D"
                description="Permanently delete the file"
                startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
              >
                Delete file
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: " Dropdown with custom Triggers.",
    import: `
    import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
`,
    description: `You can use any component as a trigger for the dropdown menu, just wrap it in the DropdownTrigger component.
`,
    code: `
    export default function App() {
      return (
        <div className="flex items-center gap-4">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                description="@tonyreichert"
                name="Tony Reichert"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">@tonyreichert</p>
              </DropdownItem>
              <DropdownItem key="settings">
                My Settings
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">
                Analytics
              </DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }
    `,
  },
  {
    name: "Changing the Dropdown backdrop. .",
    import: `
    import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
`,
    description: `the Dropdown component is an extension of the Popover component, so it accepts all the props of the Popover component, including the backdrop prop.`,
    code: `
    export default function App() {
      return (
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button
              variant="bordered"
            >
              Open Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
  {
    name: "Dropdown Routing.",
    import: `
    import {Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button} from "@nextui-org/react";
`,
    description: `The <DropdownItem> component works with frameworks and client side routers like Next.js `,
    code: `
    function App() {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Link Actions">
            <DropdownItem key="home" href="/home">
              Home
            </DropdownItem>
            <DropdownItem key="about" href="/about">
              About
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    `,
  },
];

export const usageDocs = `


`;
