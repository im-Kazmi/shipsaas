export const name = "LoginPages";

export const importDocs = `
  "use client";

  import type {InputProps} from "@nextui-org/react";

  import React from "react";
  import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
  import {Icon} from "@iconify/react";

`;

export const usageExamples = [
  {
    name: "Login page with social buttons.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "lucide-react";
    `,
    description: "Basic login page with social buttons.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <p className="pb-2 text-xl font-medium">Log In</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
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
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button color="primary" type="submit">
                Log In
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
              Need to create an account?&nbsp;
              <Link href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Left login with image background.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "lucide-react";

    import {AcmeIcon} from "lucide-react";
    `,
    description: "Left login with image background.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

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

          {/* Login Form */}
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <p className="pb-2 text-xl font-medium">Log In</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
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
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button color="primary" type="submit">
                Log In
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
              Need to create an account?&nbsp;
              <Link href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Left login with Testimonial at Right.",
    import: `
    "use client";
    import React from "react";
    import {Button, Input, Link, Divider, User, Checkbox} from "@nextui-org/react";
    import {Icon} from "@iconify/react";

    import {AcmeIcon} from "lucide-react";
    `,
    description: "Left login with Testimonial at Right.",
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

          {/* Login Form */}
          <div className="flex w-full items-center justify-center bg-background lg:w-1/2">
            <div className="flex w-full max-w-sm flex-col items-center gap-4 p-4">
              <div className="w-full text-left">
                <p className="pb-2 text-xl font-medium">Welcome Back</p>
                <p className="text-small text-default-500">Log in to your account to continue</p>
              </div>

              <div className="flex w-full flex-col gap-2">
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

              <div className="flex w-full items-center gap-4 py-2">
                <Divider className="flex-1" />
                <p className="shrink-0 text-tiny text-default-500">OR</p>
                <Divider className="flex-1" />
              </div>

              <form className="flex w-full flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="underlined"
                />
                <Input
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
                  variant="underlined"
                />
                <div className="flex items-center justify-between px-1 py-2">
                  <Checkbox name="remember" size="sm">
                    Remember for 15 days
                  </Checkbox>
                  <Link className="text-default-500" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
                <Button color="primary" type="submit">
                  Log In
                </Button>
              </form>

              <p className="text-center text-small">
                Need to create an account?&nbsp;
                <Link href="#" size="sm">
                  Sign Up
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
    name: "Login page without background.",
    import: `
    "use client";
    import React from "react";
    import {Button, Input, Link, Divider, User, Checkbox} from "@nextui-org/react";
    import {Icon} from "@iconify/react";

    import {AcmeIcon} from "lucide-react";
    `,
    description: "Login page without background.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
            <div className="flex flex-col items-center pb-6">
              <AcmeIcon size={60} />
              <p className="text-xl font-medium">Welcome Back</p>
              <p className="text-small text-default-500">Log in to your account to continue</p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                <Input
                  classNames={{
                    base: "-mb-[2px]",
                    inputWrapper:
                      "rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10",
                  }}
                  label="Email Address"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                />
                <Input
                  classNames={{
                    inputWrapper: "rounded-t-none",
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
              </div>
              <div className="flex items-center justify-between px-1 py-2">
                <Check
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
              Need to create an account?&nbsp;
              <Link href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Login page without social buttons",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    `,
    description: "Login page without social buttons",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
            <p className="pb-4 text-left text-3xl font-semibold">
              Log In
              <span aria-label="emoji" className="ml-2" role="img">
                👋
              </span>
            </p>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
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
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox defaultSelected name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button color="primary" type="submit">
                Log In
              </Button>
            </form>
            <p className="text-center text-small">
              <Link href="#" size="sm">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Login with animated form.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Link, Divider, ResizablePanel} from "@nextui-org/react";
    import {AnimatePresence, m, domAnimation, LazyMotion} from "framer-motion";
    import {Icon} from "@iconify/react";
    `,
    description: "Center Login with animated form.",
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
            <ResizablePanel>
              <h1 className="mb-4 text-xl font-medium">Log In</h1>
              <AnimatePresence initial={false} mode="popLayout">
                <LazyMotion features={domAnimation}>
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
                        label="Email Address"
                        name="email"
                        type="email"
                        variant="bordered"
                      />
                      <Input label="Password" name="password" type="password" variant="bordered" />
                      <Button color="primary" type="submit">
                        Log In
                      </Button>
                      {orDivider}
                      <Button
                        fullWidth
                        startContent={
                          <Icon
                            className="text-default-500"
                            icon="solar:arrow-left-linear"
                            width={18}
                          />
                        }
                        variant="flat"
                        onPress={() => setIsFormVisible(false)}
                      >
                        Other Login options
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
                        <div className="flex flex-col gap-2">
                          <Button
                            fullWidth
                            startContent={<Icon icon="flat-color-icons:google" width={24} />}
                            variant="flat"
                          >
                            Continue with Google
                          </Button>
                          <Button
                            fullWidth
                            startContent={
                              <Icon className="text-default-500" icon="fe:github" width={24} />
                            }
                            variant="flat"
                          >
                            Continue with Github
                          </Button>
                        </div>
                        <p className="mt-3 text-center text-small">
                          Need to create an account?&nbsp;
                          <Link href="#" size="sm">
                            Sign Up
                          </Link>
                        </p>
                      </m.div>
                    </>
                  )}
                </LazyMotion>
              </AnimatePresence>
            </ResizablePanel>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Login with blurred container.",
    import: `
    "use client";

    import type {InputProps} from "@nextui-org/react";

    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";

    `,
    description: "Center Login with blurred container.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

      const inputClasses: InputProps["classNames"] = {
        inputWrapper:
          "border-transparent bg-default-50/40 dark:bg-default-50/20 group-data-[focus=true]:border-primary data-[hover=true]:border-foreground/20",
      };

      const buttonClasses = "bg-foreground/10 dark:bg-foreground/20";

      return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-background/60 px-8 pb-10 pt-6 shadow-small backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
            <p className="pb-2 text-xl font-medium">Log In</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                classNames={inputClasses}
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
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
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox
                  classNames={{
                    wrapper: "before:border-foreground/50",
                  }}
                  name="remember"
                  size="sm"
                >
                  Remember me
                </Checkbox>
                <Link className="text-foreground/50" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button className={buttonClasses} type="submit">
                Log In
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
              Need to create an account?&nbsp;
              <Link color="foreground" href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    `,
  },
  {
    name: "Center Login with gradient background.",
    import: `
    "use client";
    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    `,
    description: "Center Login with gradient background.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

      return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
            <p className="pb-2 text-xl font-medium">Log In</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
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
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button color="primary" type="submit">
                Log In
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
              Need to create an account?&nbsp;
              <Link href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Login with only email field.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";

    `,
    description: "Center Login with only email field.",
    code: `

    export default function Component() {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <p className="pb-2 text-xl font-medium">Log In</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input label="Email Address" name="email" type="email" variant="bordered" />
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
              Need to create an account?&nbsp;
              <Link href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Login with top logo.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
    import {Icon} from "@iconify/react";
    import {AcmeIcon} from "lucide-react";
    `,
    description: "Center Login with top logo.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);

      const toggleVisibility = () => setIsVisible(!isVisible);

      return (
        <div className="flex h-full  w-full flex-col items-center justify-center">
          <div className="flex flex-col items-center pb-6">
            <AcmeIcon size={60} />
            <p className="text-xl font-medium">Welcome Back</p>
            <p className="text-small text-default-500">Log in to your account to continue</p>
          </div>
          <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                type="email"
                variant="bordered"
              />
              <Input
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
              <div className="flex items-center justify-between px-1 py-2">
                <Checkbox name="remember" size="sm">
                  Remember me
                </Checkbox>
                <Link className="text-default-500" href="#" size="sm">
                  Forgot password?
                </Link>
              </div>
              <Button color="primary" type="submit">
                Log In
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
              Need to create an account?&nbsp;
              <Link href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
  {
    name: "Center Login with two steps.",
    import: `
    "use client";

    import React from "react";
    import {Button, Input, Link, Divider, Tooltip} from "@nextui-org/react";
    import {AnimatePresence, domAnimation, LazyMotion, m} from "framer-motion";
    import {Icon} from "@iconify/react";
    `,
    description: "Center Login with two steps.",
    code: `
    export default function Component() {
      const [isVisible, setIsVisible] = React.useState(false);
      const [email, setEmail] = React.useState("example@mail.com");
      const [password, setPassword] = React.useState("");
      const [[page, direction], setPage] = React.useState([0, 0]);
      const [isEmailValid, setIsEmailValid] = React.useState(true);
      const [isPasswordValid, setIsPasswordValid] = React.useState(true);

      const toggleVisibility = () => setIsVisible(!isVisible);

      const variants = {
        enter: (direction: number) => ({
          x: direction > 0 ? 20 : -20,
          opacity: 0,
        }),
        center: {
          zIndex: 1,
          x: 0,
          opacity: 1,
        },
        exit: (direction: number) => ({
          zIndex: 0,
          x: direction < 0 ? 20 : -20,
          opacity: 0,
        }),
      };

      const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
      };

      const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.length) {
          setIsEmailValid(false);

          return;
        }
        setIsEmailValid(true);
        paginate(1);
      };

      const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!password.length) {
          setIsPasswordValid(false);

          return;
        }
        setIsPasswordValid(true);
        // Here you can send the email and password to your API for authentication.
      };

      const handleSubmit = page === 0 ? handleEmailSubmit : handlePasswordSubmit;

      return (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
            <LazyMotion features={domAnimation}>
              <m.div layout className="flex min-h-[40px] items-center gap-2 pb-2">
                {page === 1 && (
                  <m.div>
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
                <m.h1 layout className="text-xl font-medium" transition={{duration: 0.25}}>
                  Log In
                </m.h1>
              </m.div>
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <m.form
                  key={page}
                  animate="center"
                  className="flex flex-col gap-3"
                  custom={direction}
                  exit="exit"
                  initial="enter"
                  transition={{
                    duration: 0.25,
                  }}
                  variants={variants}
                  onSubmit={handleSubmit}
                >
                  {page === 0 ? (
                    <Input
                      errorMessage={!isEmailValid ? "Enter a valid email" : undefined}
                      isInvalid={!isEmailValid}
                      label="Email Address"
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      variant="bordered"
                      onValueChange={(value) => {
                        setIsEmailValid(true);
                        setEmail(value);
                      }}
                    />
                  ) : (
                    <Input
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
                      errorMessage={!isPasswordValid ? "Enter a valid password" : undefined}
                      label="Password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      validationState={isPasswordValid ? "valid" : "invalid"}
                      value={password}
                      variant="bordered"
                      onValueChange={(value) => {
                        setIsPasswordValid(true);
                        setPassword(value);
                      }}
                    />
                  )}

                  <Button fullWidth color="primary" type="submit">
                    {page === 0 ? "Continue with Email" : "Log In"}
                  </Button>
                </m.form>
              </AnimatePresence>
            </LazyMotion>
            <p className="text-center text-small">
              <Link href="#" size="sm">
                Forgot password?
              </Link>
            </p>
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
              Need to create an account?&nbsp;
              <Link href="#" size="sm">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      );
    }
    `,
  },
];
