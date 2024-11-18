export const name = "SignupPages";

export const importDocs = `
  "use client";

  import React from "react";
  import {Button, Input, Checkbox, Link} from "@nextui-org/react";
  import {Icon} from "@iconify/react";
`;

export const usageExamples = [
  {
    name: "Simple Signup page.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    `,
    description: "Simple Signup page.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);
      const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);
      const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
            <p className="pb-4 text-left text-3xl font-semibold">
              Sign Up
              <span aria-label="emoji" className="ml-2" role="img">
                👋
              </span>
            </p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                isRequired
                label="Username"
                labelPlacement="outside"
                name="username"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Confirm Password"
                labelPlacement="outside"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={isConfirmVisible ? "text" : "password"}
                variant="bordered"
              />
              <Checkbox isRequired className="py-4" size="sm">
                I agree with the&nbsp;
                <Link href="#" size="sm">
                  Terms
                </Link>
                &nbsp; and&nbsp;
                <Link href="#" size="sm">
                  Privacy Policy
                </Link>
              </Checkbox>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </form>
            <p className="text-center text-small">
              <Link href="#" size="sm">
                Already have an account? Log In
              </Link>
            </p>
          </div>
        </div>
    `,
  },
  {
    name: "Left Signup with image background.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "lucide-react";

    import {AcmeIcon} from "lucide-react";
    `,
    description: "Left Signup with image background.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);
      const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);
      const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

      return (
        <div
          className="flex h-screen w-screen items-center justify-start overflow-hidden rounded-small bg-content1 p-2 sm:p-4 lg:p-8"
          style={{
            backgroundImage:
              "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture-2.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Brand Logo */}
          <div className="absolute right-10 top-10">
            <div className="flex items-center">
              <AcmeIcon className="text-white" size={40} />
              <p className="font-medium text-white">ACME</p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="absolute bottom-10 right-10 hidden md:block">
            <p className="max-w-xl text-right text-white/60">
              <span className="font-medium">“</span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa
              volutpat aliquet.
              <span className="font-medium">”</span>
            </p>
          </div>

          {/* Sign Up Form */}
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <p className="pb-2 text-xl font-medium">Sign Up</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                isRequired
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={isConfirmVisible ? "text" : "password"}
                variant="bordered"
              />
              <Checkbox isRequired className="py-4" size="sm">
                I agree with the&nbsp;
                <Link href="#" size="sm">
                  Terms
                </Link>
                &nbsp; and&nbsp;
                <Link href="#" size="sm">
                  Privacy Policy
                </Link>
              </Checkbox>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                startContent={<Icon icon="flat-color-icons:google" width={24} />}
                variant="bordered"
              >
                Continue with Google
              </Button>
              <Button
                startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                variant="bordered"
              >
                Continue with Github
              </Button>
            </div>
            <p className="text-center text-small">
              Already have an account?&nbsp;
              <Link href="#" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Left Signup with Testimonial at Right.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Link, Divider, User, Checkbox} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    `,
    description: "Left Signup with Testimonial at Right.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

      return (
        <div className="relative flex h-screen w-screen">
          {/* Brand Logo */}
          <div className="absolute left-2 top-5 lg:left-5">
            <div className="flex items-center">
              <AcmeIcon size={40} />
              <p className="font-medium">ACME</p>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
            <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
              <div className="w-full text-left">
                <p className="pb-2 text-xl font-medium">Create Account</p>
                <p className="text-small text-default-500">Sign up for a new account to get started</p>
              </div>

              <div className="flex w-full flex-col gap-2">
                <Button
                  startContent={<Icon icon="flat-color-icons:google" width={24} />}
                  variant="bordered"
                >
                  Sign Up with Google
                </Button>
                <Button
                  startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                  variant="bordered"
                >
                  Sign Up with Github
                </Button>
              </div>

              <div className="flex w-full items-center gap-4 py-2">
                <Divider className="flex-1" />
                <p className="shrink-0 text-tiny text-default-500">OR</p>
                <Divider className="flex-1" />
              </div>

              <form className="flex w-full flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  isRequired
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="underlined"
                />
                <Input
                  isRequired
                  endContent={
                    <button type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-closed-linear"
                        />
                      ) : (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-bold"
                        />
                      )}
                    </button>
                  }
                  label="Password"
                  name="password"
                  placeholder="Create a password"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                />
                <Input
                  isRequired
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type={isVisible ? "text" : "password"}
                  variant="underlined"
                />
                <Checkbox isRequired className="py-4" size="sm">
                  I agree with the&nbsp;
                  <Link href="#" size="sm">
                    Terms
                  </Link>
                  &nbsp; and&nbsp;
                  <Link href="#" size="sm">
                    Privacy Policy
                  </Link>
                </Checkbox>
                <Button color="primary" type="submit">
                  Sign Up
                </Button>
              </form>

              <p className="text-center text-small">
                Already have an account?&nbsp;
                <Link href="#" size="sm">
                  Log In
                </Link>
              </p>
            </div>
          </div>

          {/* Right side */}
          <div
            className="relative hidden w-1/2 flex-col-reverse rounded-medium p-10 shadow-small lg:flex"
            style={{
              backgroundImage:
                "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/white-building.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col items-end gap-4">
              <User
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
                }}
                classNames={{
                  base: "flex flex-row-reverse",
                  name: "w-full text-right text-black",
                  description: "text-black/80",
                }}
                description="Founder & CEO at ACME"
                name="Bruno Reichert"
              />
              <p className="w-full text-right text-2xl text-black/60">
                <span className="font-medium">“</span>
                <span className="font-normal italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget augue nec massa
                  volutpat aliquet.
                </span>
                <span className="font-medium">”</span>
              </p>
            </div>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Signup page without background.",
    import: `
    "use client";
    import React from "react";
    import {Button, Input, Link, Divider, User, Checkbox} from "@nextui-org/react";
    import {Icon} from "@iconify/react";

    import {AcmeIcon} from "lucide-react";
    `,
    description: "Signup page without background.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);
      const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);
      const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
            <div className="flex flex-col items-center pb-6">
              <AcmeIcon size={60} />
              <p className="text-xl font-medium">Welcome</p>
              <p className="text-small text-default-500">Create an account to get started</p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                <Input
                  isRequired
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                  label="Username"
                  name="username"
                  placeholder="Enter your username"
                  type="text"
                  variant="bordered"
                />
                <Input
                  isRequired
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                />
                <Input
                  isRequired
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                  endContent={
                    <button type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-closed-linear"
                        />
                      ) : (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-bold"
                        />
                      )}
                    </button>
                  }
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                />
                <Input
                  isRequired
                  classNames={{
                    inputWrapper: "rounded-t-none",
                  }}
                  endContent={
                    <button type="button" onClick={toggleConfirmVisibility}>
                      {isConfirmVisible ? (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-closed-linear"
                        />
                      ) : (
                        <Icon
                          className="pointer-events-none text-2xl text-default-400"
                          icon="solar:eye-bold"
                        />
                      )}
                    </button>
                  }
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type={isConfirmVisible ? "text" : "password"}
                  variant="bordered"
                />
              </div>
              <Checkbox isRequired className="py-4" size="sm">
                I agree with the&nbsp;
                <Link href="#" size="sm">
                  Terms
                </Link>
                &nbsp; and&nbsp;
                <Link href="#" size="sm">
                  Privacy Policy
                </Link>
              </Checkbox>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                startContent={<Icon icon="flat-color-icons:google" width={24} />}
                variant="bordered"
              >
                Sign Up with Google
              </Button>
              <Button
                startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                variant="bordered"
              >
                Sign Up with Github
              </Button>
            </div>
            <p className="text-center text-small">
              Already have an account?&nbsp;
              <Link href="#" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },

  {
    name: "Centerd Signup with animated form.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Link, Divider} from "@nextui-org/react";
    import {AnimatePresence, m, LazyMotion, domAnimation} from "framer-motion";
    import {Icon} from "@iconify/react";
    `,
    description: "Center Signup with animated form.",
    code: `
    export default function Component() {
      const [isFormVisible, setIsFormVisible] = React.useState(false);

      const variants = {
        visible: {opacity: 1, y: 0},
        hidden: {opacity: 0, y: 10},
      };

      const orDivider = (
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OR</p>
          <Divider className="flex-1" />
        </div>
      );

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <LazyMotion features={domAnimation}>
              <h1 className="mb-4 text-xl font-medium">Sign Up</h1>
              <AnimatePresence initial={false} mode="popLayout">
                {isFormVisible ? (
                  <m.form
                    animate="visible"
                    className="flex flex-col gap-y-3"
                    exit="hidden"
                    initial="hidden"
                    variants={variants}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <Input
                      autoFocus
                      isRequired
                      label="Email Address"
                      name="email"
                      type="email"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Password"
                      name="password"
                      type="password"
                      variant="bordered"
                    />
                    <Button color="primary" type="submit">
                      Sign Up
                    </Button>
                    {orDivider}
                    <Button
                      fullWidth
                      startContent={
                        <Icon className="text-default-500" icon="solar:arrow-left-linear" width={18} />
                      }
                      variant="flat"
                      onPress={() => setIsFormVisible(false)}
                    >
                      Other Sign Up options
                    </Button>
                  </m.form>
                ) : (
                  <>
                    <Button
                      fullWidth
                      color="primary"
                      startContent={
                        <Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />
                      }
                      type="button"
                      onPress={() => setIsFormVisible(true)}
                    >
                      Continue with Email
                    </Button>
                    {orDivider}
                    <m.div
                      animate="visible"
                      className="flex flex-col gap-y-2"
                      exit="hidden"
                      initial="hidden"
                      variants={variants}
                    >
                      <Button
                        fullWidth
                        startContent={<Icon icon="flat-color-icons:google" width={24} />}
                        variant="flat"
                      >
                        Continue with Google
                      </Button>
                      <Button
                        fullWidth
                        startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                        variant="flat"
                      >
                        Continue with GitHub
                      </Button>
                      <p className="mt-3 text-center text-small">
                        Already have an account?&nbsp;
                        <Link href="#" size="sm">
                          Log In
                        </Link>
                      </p>
                    </m.div>
                  </>
                )}
              </AnimatePresence>
            </LazyMotion>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Centerd Signup with blurred container.",
    import: `
    "use client";

    import type {InputProps} from "@nextui-org/react";
    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    `,
    description: "Center Signup with blurred container.",
    code: `

    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);
      const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);
      const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

      const inputClasses: InputProps["classNames"] = {
        inputWrapper:
          "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
      };

      const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";

      return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
            <p className="pb-2 text-xl font-medium">Sign Up</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                isRequired
                classNames={inputClasses}
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                classNames={inputClasses}
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
                classNames={inputClasses}
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-foreground/50"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-foreground/50"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
              <Input
                isRequired
                classNames={inputClasses}
                endContent={
                  <button type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-foreground/50"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-foreground/50"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={isConfirmVisible ? "text" : "password"}
                variant="bordered"
              />
              <Checkbox
                isRequired
                classNames={{
                  base: "py-4",
                  label: "text-foreground/50",
                  wrapper: "before:border-foreground/50",
                }}
                size="sm"
              >
                I agree with the&nbsp;
                <Link color="foreground" href="#" size="sm">
                  Terms
                </Link>
                &nbsp; and&nbsp;
                <Link color="foreground" href="#" size="sm">
                  Privacy Policy
                </Link>
              </Checkbox>
              <Button className={buttonClasses} type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button className={buttonClasses} startContent={<Icon icon="fe:google" width={24} />}>
                Continue with Google
              </Button>
              <Button className={buttonClasses} startContent={<Icon icon="fe:github" width={24} />}>
                Continue with Github
              </Button>
            </div>
            <p className="text-center text-small text-foreground/50">
              Already have an account?&nbsp;
              <Link color="foreground" href="#" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Signup with gradient background.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    `,
    description: "Center Signup with gradient background.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);
      const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);
      const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

      return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <p className="pb-2 text-xl font-medium">Sign Up</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                isRequired
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={isConfirmVisible ? "text" : "password"}
                variant="bordered"
              />
              <Checkbox isRequired className="py-4" size="sm">
                I agree with the&nbsp;
                <Link href="#" size="sm">
                  Terms
                </Link>
                &nbsp; and&nbsp;
                <Link href="#" size="sm">
                  Privacy Policy
                </Link>
              </Checkbox>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                startContent={<Icon icon="flat-color-icons:google" width={24} />}
                variant="bordered"
              >
                Continue with Google
              </Button>
              <Button
                startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                variant="bordered"
              >
                Continue with Github
              </Button>
            </div>
            <p className="text-center text-small">
              Already have an account?&nbsp;
              <Link href="#" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Signup with only email field.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";

    `,
    description: "Center Signup with only email field.",
    code: `
    export default function Component() {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <p className="pb-2 text-xl font-medium">Sign Up</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                isRequired
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Button
                color="primary"
                startContent={
                  <Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />
                }
                type="submit"
              >
                Continue with Email
              </Button>
            </form>
            <div className="flex items-center gap-4 py-2">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button startContent={<Icon icon="flat-color-icons:google" width={24} />} variant="flat">
                Continue with Google
              </Button>
              <Button
                startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                variant="flat"
              >
                Continue with Github
              </Button>
            </div>
            <p className="text-center text-small">
              Already have an account?&nbsp;
              <Link href="#" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Signup with top logo.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    import {AcmeIcon} from "lucide-react";
    `,
    description: "Center Signup with top logo.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);
      const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);
      const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

      return (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center pb-2">
            <AcmeIcon size={60} />
            <p className="text-xl font-medium">Welcome</p>
            <p className="text-small text-default-500">Create your account to get started</p>
          </div>
          <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                isRequired
                label="Username"
                name="username"
                placeholder="Enter your username"
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Password"
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
              />
              <Input
                isRequired
                endContent={
                  <button type="button" onClick={toggleConfirmVisibility}>
                    {isConfirmVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={isConfirmVisible ? "text" : "password"}
                variant="bordered"
              />
              <Checkbox isRequired className="py-4" size="sm">
                I agree with the&nbsp;
                <Link href="#" size="sm">
                  Terms
                </Link>
                &nbsp; and&nbsp;
                <Link href="#" size="sm">
                  Privacy Policy
                </Link>
              </Checkbox>
              <Button color="primary" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex items-center gap-4">
              <Divider className="flex-1" />
              <p className="shrink-0 text-tiny text-default-500">OR</p>
              <Divider className="flex-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Button
                startContent={<Icon icon="flat-color-icons:google" width={24} />}
                variant="bordered"
              >
                Continue with Google
              </Button>
              <Button
                startContent={<Icon className="text-default-500" icon="fe:github" width={24} />}
                variant="bordered"
              >
                Continue with Github
              </Button>
            </div>
            <p className="text-center text-small">
              Already have an account?&nbsp;
              <Link href="#" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Signup with two steps.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Link, Tooltip} from "@nextui-org/react";
    import {AnimatePresence, domAnimation, LazyMotion, m} from "framer-motion";
    import {Icon} from "@iconify/react";
    `,
    description: "Center Signup with two steps.",
    code: `
    export default function Component() {
      const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
      const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
      const [email, setEmail] = React.useState("");
      const [password, setPassword] = React.useState("");
      const [confirmPassword, setConfirmPassword] = React.useState("");
      const [[page, direction], setPage] = React.useState([0, 0]);
      const [isEmailValid, setIsEmailValid] = React.useState(true);
      const [isPasswordValid, setIsPasswordValid] = React.useState(true);
      const [isConfirmPasswordValid, setIsConfirmPasswordValid] = React.useState(true);

      const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
      const toggleConfirmPasswordVisibility = () =>
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

      const Title = React.useCallback(
        (props: React.PropsWithChildren<{}>) => (
          <m.h1
            animate={{opacity: 1, x: 0}}
            className="text-xl font-medium"
            exit={{opacity: 0, x: -10}}
            initial={{opacity: 0, x: -10}}
          >
            {props.children}
          </m.h1>
        ),
        [page],
      );

      const titleContent = React.useMemo(() => {
        return page === 0 ? "Sign Up" : page === 1 ? "Enter Password" : "Confirm Password";
      }, [page]);

      const variants = {
        enter: (direction: number) => ({
          x: direction > 0 ? 50 : -50,
          opacity: 0,
        }),
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1,
        },
        exit: (direction: number) => ({
          zIndex: 0,
          x: direction < 0 ? 50 : -50,
          opacity: 0,
        }),
      };

      const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
      };

      const handleEmailSubmit = () => {
        if (!email.length) {
          setIsEmailValid(false);

          return;
        }
        setIsEmailValid(true);
        paginate(1);
      };

      const handlePasswordSubmit = () => {
        if (!password.length) {
          setIsPasswordValid(false);

          return;
        }
        setIsPasswordValid(true);
        paginate(1);
      };

      const handleConfirmPasswordSubmit = () => {
        if (!confirmPassword.length || confirmPassword !== password) {
          setIsConfirmPasswordValid(false);

          return;
        }
        setIsConfirmPasswordValid(true);
        // Submit logic or API call here
      };

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        switch (page) {
          case 0:
            handleEmailSubmit();
            break;
          case 1:
            handlePasswordSubmit();
            break;
          case 2:
            handleConfirmPasswordSubmit();
            break;
          default:
            break;
        }
      };

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <LazyMotion features={domAnimation}>
              <m.div className="flex min-h-[40px] items-center gap-2 pb-2">
                <AnimatePresence initial={false} mode="popLayout">
                  {page >= 1 && (
                    <m.div
                      animate={{opacity: 1, x: 0}}
                      exit={{opacity: 0, x: -10}}
                      initial={{opacity: 0, x: -10}}
                    >
                      <Tooltip content="Go back" delay={3000}>
                        <Button isIconOnly size="sm" variant="flat" onPress={() => paginate(-1)}>
                          <Icon
                            className="text-default-500"
                            icon="solar:alt-arrow-left-linear"
                            width={16}
                          />
                        </Button>
                      </Tooltip>
                    </m.div>
                  )}
                </AnimatePresence>
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <Title>{titleContent}</Title>
                </AnimatePresence>
              </m.div>
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <m.form
                  key={page}
                  animate="center"
                  className="flex flex-col gap-3"
                  custom={direction}
                  exit="exit"
                  initial="enter"
                  transition={{duration: 0.2}}
                  variants={variants}
                  onSubmit={handleSubmit}
                >
                  {page === 0 && (
                    <Input
                      autoFocus
                      isRequired
                      label="Email Address"
                      name="email"
                      type="email"
                      validationState={isEmailValid ? "valid" : "invalid"}
                      value={email}
                      onValueChange={(value) => {
                        setIsEmailValid(true);
                        setEmail(value);
                      }}
                    />
                  )}
                  {page === 1 && (
                    <Input
                      autoFocus
                      isRequired
                      endContent={
                        <button type="button" onClick={togglePasswordVisibility}>
                          {isPasswordVisible ? (
                            <Icon
                              className="pointer-events-none text-2xl text-default-400"
                              icon="solar:eye-closed-linear"
                            />
                          ) : (
                            <Icon
                              className="pointer-events-none text-2xl text-default-400"
                              icon="solar:eye-bold"
                            />
                          )}
                        </button>
                      }
                      label="Password"
                      name="password"
                      type={isPasswordVisible ? "text" : "password"}
                      validationState={isPasswordValid ? "valid" : "invalid"}
                      value={password}
                      onValueChange={(value) => {
                        setIsPasswordValid(true);
                        setPassword(value);
                      }}
                    />
                  )}
                  {page === 2 && (
                    <Input
                      autoFocus
                      isRequired
                      endContent={
                        <button type="button" onClick={toggleConfirmPasswordVisibility}>
                          {isConfirmPasswordVisible ? (
                            <Icon
                              className="pointer-events-none text-2xl text-default-400"
                              icon="solar:eye-closed-linear"
                            />
                          ) : (
                            <Icon
                              className="pointer-events-none text-2xl text-default-400"
                              icon="solar:eye-bold"
                            />
                          )}
                        </button>
                      }
                      errorMessage={!isConfirmPasswordValid ? "Passwords do not match" : undefined}
                      label="Confirm Password"
                      name="confirmPassword"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                      validationState={isConfirmPasswordValid ? "valid" : "invalid"}
                      value={confirmPassword}
                      onValueChange={(value) => {
                        setIsConfirmPasswordValid(true);
                        setConfirmPassword(value);
                      }}
                    />
                  )}
                  <Button fullWidth color="primary" type="submit">
                    {page === 0
                      ? "Continue with Email"
                      : page === 1
                        ? "Enter Password"
                        : "Confirm Password"}
                  </Button>
                </m.form>
              </AnimatePresence>
            </LazyMotion>
            <p className="text-center text-small">
              Already have an account?&nbsp;
              <Link href="#" size="sm">
                Log In
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
];
