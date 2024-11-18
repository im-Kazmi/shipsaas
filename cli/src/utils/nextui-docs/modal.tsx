export const name = "Modal";

export const importDocs = `
  import {  Modal,ModalContent,ModalHeader,ModalBody,ModalFooter} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " Modal basic usage",
    import: `
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
    `,
    description: "This is a basic example usage of the Modal Component.",
    code: `
    export default function App() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();

      return (
        <>
          <Button onPress={onOpen}>Open Modal</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                      Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                      proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }
    `,
  },
  {
    name: " Modal Component with different Sizes.",
    import: `
    import React from "react";
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
    `,
    description:
      "These are the examples of using diffent sizes of the Code. you will probably need to create only one at a time not an array.",
    code: `
    export default function App() {
      const {isOpen, onOpen, onClose} = useDisclosure();
      const [size, setSize] = React.useState('md')

      const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "full"];


      const handleOpen = (size) => {
        setSize(size)
        onOpen();
      }

      return (
        <>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <Button key={size} onPress={() => handleOpen(size)}>Open {size}</Button>
            ))}
          </div>
          <Modal
            size={size}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }
    `,
  },
  {
    name: " Modal component with different Colors.",
    import: `
    import {  Modal,ModalContent,ModalHeader,ModalBody,ModalFooter} from "@nextui-org/react";
    `,
    description: `
    By default, the modal can be closed by clicking on the overlay or pressing the
    Esc
     key. You can disable this behavior by setting the following properties:

    Set the isDismissable property to false to prevent the modal from closing when clicking on the overlay.
    Set the isKeyboardDismissDisabled property to true to prevent the modal from closing when pressing the Esc key.`,
    code: `
    export default function App() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();

      return (
        <>
          <Button onPress={onOpen}>Open Modal</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                      Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                      proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }

    `,
  },
  {
    name: "Modal Component placement.",
    import: `
    import React from "react";
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
    `,
    description: `By default the modal is centered on screens higher than sm and is at the bottom of the screen on mobile. This placement is called auto, but you can change it by using the placement prop.

    Note: The top-center and bottom-center positions mean that the modal is positioned at the top / bottom of the screen on mobile and at the center of the screen on desktop.
      `,
    code: `
    export default function App() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();
      const [modalPlacement, setModalPlacement] = React.useState("auto");

      return (
        <div className="flex flex-col gap-2">
          <Button onPress={onOpen} className="max-w-fit">Open Modal</Button>
          <RadioGroup
            label="Select modal placement"
            orientation="horizontal"
            value={modalPlacement}
            onValueChange={setModalPlacement}
          >
            <Radio value="auto">auto</Radio>
            <Radio value="top">top</Radio>
            <Radio value="bottom">bottom</Radio>
            <Radio value="center">center</Radio>
            <Radio value="top-center">top-center</Radio>
            <Radio value="bottom-center">bottom-center</Radio>
          </RadioGroup>
          <Modal
            isOpen={isOpen}
            placement={modalPlacement}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      );
    }
    `,
  },
  {
    name: "Modal Overflow Scroll.",
    import: `
    import React from "react";
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";
    `,
    description: `You can use the scrollBehavior prop to set the scroll behavior of the modal.
    inside: The modal content will be scrollable.
    outside: The modal content will be scrollable and the modal will be fixed.
      `,
    code: `
    export default function App() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();
      const [scrollBehavior, setScrollBehavior] = React.useState("inside");

      return (
        <div className="flex flex-col gap-2">
          <Button onPress={onOpen}>Open Modal</Button>
          <RadioGroup
            label="Select scroll behavior"
            orientation="horizontal"
            value={scrollBehavior}
            onValueChange={setScrollBehavior}
          >
            <Radio value="inside">inside</Radio>
            <Radio value="outside">outside</Radio>
          </RadioGroup>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat
                      consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                      incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                      aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                      nisi consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      Magna exercitation reprehenderit magna aute tempor cupidatat
                      consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                      incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                      aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                      nisi consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                      duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse laborum
                      eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
                      nostrud ad veniam. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Nullam pulvinar risus non risus hendrerit
                      venenatis. Pellentesque sit amet hendrerit risus, sed
                      porttitor quam. Magna exercitation reprehenderit magna aute
                      tempor cupidatat consequat elit dolor adipisicing. Mollit
                      dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et
                      mollit incididunt nisi consectetur esse laborum eiusmod
                      pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
                      veniam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat
                      consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                      incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                      aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                      nisi consectetur esse laborum eiusmod pariatur proident Lorem
                      eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    <p>
                      Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                      duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse laborum
                      eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
                      nostrud ad veniam. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. Nullam pulvinar risus non risus hendrerit
                      venenatis. Pellentesque sit amet hendrerit risus, sed
                      porttitor quam. Magna exercitation reprehenderit magna aute
                      tempor cupidatat consequat elit dolor adipisicing. Mollit
                      dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et
                      mollit incididunt nisi consectetur esse laborum eiusmod
                      pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
                      veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      );
    }

    `,
  },
  {
    name: "Modal With Form.",
    import: `
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
    import {MailIcon} from 'lucide-react';
    import {LockIcon} from 'lucide-react';
    `,
    description: `The Modal handles the focus within the modal content. It means that you can use the modal with form elements without any problem. the focus returns to the trigger when the modal closes.
      `,
    code: `
    export default function App() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();

      return (
        <>
          <Button onPress={onOpen} color="primary">Open Modal</Button>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                    />
                    <Input
                      endContent={
                        <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                    />
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Remember me
                      </Checkbox>
                      <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Sign in
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }
    `,
  },
  {
    name: "Modal With blur, Transparent, opaque Backdrops.",
    import: `
    import React from "react";
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
    `,
    description: `The Modal component has a backdrop prop to show a backdrop behind the modal. The backdrop can be either transparent, opaque or blur. The default value is opaque.
      `,
    code: `
    export default function App() {
      const {isOpen, onOpen, onClose} = useDisclosure();
      const [backdrop, setBackdrop] = React.useState('opaque')

      const backdrops = ["opaque", "blur", "transparent"];

      const handleOpen = (backdrop) => {
        setBackdrop(backdrop)
        onOpen();
      }

      return (
        <>
          <div className="flex flex-wrap gap-3">
            {backdrops.map((b) => (
              <Button
                key={b}
                variant="flat"
                color="warning"
                onPress={() => handleOpen(b)}
                className="capitalize"
              >
               {b}
              </Button>
            ))}
          </div>
          <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                      Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                      proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }
    `,
  },
  {
    name: "Modal With Custom motion.",
    import: `
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
    `,
    description: `Modal offers a motionProps property to customize the enter / exit animation.
      `,
    code: `
    export default function App() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();

      return (
        <>
          <Button onPress={onOpen}>Open Modal</Button>
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                },
              }
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                      Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                      proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }
    `,
  },
  {
    name: "Modal With Custom Styles using Tailwind css.",
    import: `
    import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
    `,
    description: `You can customize the Modal component by passing custom Tailwind CSS classes to the component slots.`,
    code: `
    export default function App() {
      const {isOpen, onOpen, onOpenChange} = useDisclosure();

      return (
        <>
          <Button onPress={onOpen} color="secondary">Open Modal</Button>
          <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            radius="lg"
            classNames={{
              body: "py-6",
              backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
              base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
              header: "border-b-[1px] border-[#292f46]",
              footer: "border-t-[1px] border-[#292f46]",
              closeButton: "hover:bg-white/5 active:bg-white/10",
            }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                      dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                      Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                      Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
                      proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="foreground" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    }
    `,
  },
];

export const usageDocs = `


`;
