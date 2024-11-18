export const name = "Card";

export const importDocs = `
import {Card, CardBody} from "@nextui-org/react";
`;

export const usageExamples = [
  {
    name: " basic usage",
    import: `
      import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
    `,
    description: "This is a basic example usage of the Card.",
    code: `
    <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>;
    `,
  },
  {
    name: "card with image",
    import: `
     import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
    `,
    description:
      "This is how you can render a card with an image which is so useful in a lot of apps.",
    code: `
    <Card className="py-4">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <p className="text-tiny font-bold uppercase">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="text-large font-bold">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="rounded-xl object-cover"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>
    </Card>;
      `,
  },
  {
    name: "Card with Blurred footer",
    import: `
    import {Card, CardFooter, Image, Button} from "@nextui-org/react";
    `,
    description:
      "you can pass the isFooterBlurred prop to the card to blur the footer like below example.",
    code: `
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="https://nextui.org/images/hero-card.jpeg"
        width={200}
      />
      <CardFooter className="border-1 rounded-large shadow-small absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden border-white/20 py-1 before:rounded-xl before:bg-white/10">
        <p className="text-tiny text-white/80">Available soon.</p>
        <Button
          className="text-tiny bg-black/20 text-white"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>;
      `,
  },
  {
    name: "Card with Primary Action",
    import: `
   import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
    `,
    description:
      "if you pass the isPressable prop to the card, it will be rendered as a button. like below example.",
    code: `
    <Card
      shadow="sm"
      key={index}
      isPressable
      onPress={() => console.log("item pressed")}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          shadow="sm"
          radius="lg"
          width="100%"
          alt={item.title}
          className="h-[140px] w-full object-cover"
          src={item.img}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <b>Hey there</b>
        <p className="text-default-500">99$</p>
      </CardFooter>
    </Card>;
      `,
  },
  {
    name: "Card with coverer Image",
    import: `
    import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
    `,
    description:
      "You can use Image component as the cover of the card by taking it out of the CardBody component. like below.",
    code: `
    <Card className="col-span-12 h-[300px] sm:col-span-4">
      <CardHeader className="absolute top-1 z-10 flex-col !items-start">
        <p className="text-tiny font-bold uppercase text-white/60">What to watch</p>
        <h4 className="text-large font-medium text-white">Stream the Acme event</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card background"
        className="z-0 h-full w-full object-cover"
        src="https://nextui.org/images/card-example-4.jpeg"
      />
    </Card>;
      `,
  },
  {
    name: "Card with Devider",
    import: `
    import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
    `,
    description:
      "You can use Card with devider to separate different sections in a card.",
    code: `
    <Card className="max-w-[400px]">
       <CardHeader className="flex gap-3">
         <Image
           alt="nextui logo"
           height={40}
           radius="sm"
           src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
           width={40}
         />
         <div className="flex flex-col">
           <p className="text-md">NextUI</p>
           <p className="text-small text-default-500">nextui.org</p>
         </div>
       </CardHeader>
       <Divider/>
       <CardBody>
         <p>Make beautiful websites regardless of your design experience.</p>
       </CardBody>
       <Divider/>
       <CardFooter>
         <Link
           isExternal
           showAnchorIcon
           href="https://github.com/nextui-org/nextui"
         >
           Visit source code on GitHub.
         </Link>
       </CardFooter>
     </Card>
      `,
  },
  {
    name: "Card Composition",
    import: `
    import React from "react";
    import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
    `,
    description:
      "you can use other NextUI components inside the card to compose a more complex card.",
    code: `
    const [isFollowed, setIsFollowed] = React.useState(false);

     return (
       <Card className="max-w-[340px]">
         <CardHeader className="justify-between">
           <div className="flex gap-5">
             <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
             <div className="flex flex-col gap-1 items-start justify-center">
               <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
               <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
             </div>
           </div>
           <Button
             className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
             color="primary"
             radius="full"
             size="sm"
             variant={isFollowed ? "bordered" : "solid"}
             onPress={() => setIsFollowed(!isFollowed)}
           >
             {isFollowed ? "Unfollow" : "Follow"}
           </Button>
         </CardHeader>
         <CardBody className="px-3 py-0 text-small text-default-400">
           <p>
             Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
           </p>
           <span className="pt-2">
             #FrontendWithZoey
             <span className="py-2" aria-label="computer" role="img">
               💻
             </span>
           </span>
         </CardBody>
         <CardFooter className="gap-3">
           <div className="flex gap-1">
             <p className="font-semibold text-default-400 text-small">4</p>
             <p className=" text-default-400 text-small">Following</p>
           </div>
           <div className="flex gap-1">
             <p className="font-semibold text-default-400 text-small">97.1K</p>
             <p className="text-default-400 text-small">Followers</p>
           </div>
         </CardFooter>
       </Card>
       )
      `,
  },
  {
    name: "Blurred Card",
    import: `
    import React from "react";
    import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
    import {HeartIcon} from "lucide-react";
    import {PauseCircleIcon} from "lucide-react";
    import {NextIcon} from "lucide-react";
    import {PreviousIcon} from "lucide-react";
    import {RepeatOneIcon} from "lucide-react";
    import {ShuffleIcon} from "lucide-react";`,
    description: "can pass the isBlurred prop to the card to blur the card.",
    code: `
     const [liked, setLiked] = React.useState(false);

     return (
       < <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
          >
            <CardBody>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4">
                  <Image
                    alt="Album cover"
                    className="object-cover"
                    height={200}
                    shadow="md"
                    src="https://nextui.org/images/album-cover.png"
                    width="100%"
                  />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0">
                      <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                      <p className="text-small text-foreground/80">12 Tracks</p>
                      <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
                    </div>
                    <Button
                      isIconOnly
                      className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                      radius="full"
                      variant="light"
                      onPress={() => setLiked((v) => !v)}
                    >
                      <HeartIcon
                        className={liked ? "[&>path]:stroke-transparent" : ""}
                        fill={liked ? "currentColor" : "none"}
                      />
                    </Button>
                  </div>

                  <div className="flex flex-col mt-3 gap-1">
                    <Slider
                      aria-label="Music progress"
                      classNames={{
                        track: "bg-default-500/30",
                        thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                      }}
                      color="foreground"
                      defaultValue={33}
                      size="sm"
                    />
                    <div className="flex justify-between">
                      <p className="text-small">1:23</p>
                      <p className="text-small text-foreground/50">4:32</p>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-center">
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <RepeatOneIcon className="text-foreground/80" />
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <PreviousIcon />
                    </Button>
                    <Button
                      isIconOnly
                      className="w-auto h-auto data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <PauseCircleIcon size={54} />
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <NextIcon />
                    </Button>
                    <Button
                      isIconOnly
                      className="data-[hover]:bg-foreground/10"
                      radius="full"
                      variant="light"
                    >
                      <ShuffleIcon className="text-foreground/80" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
      `,
  },
];

export const usageDocs = `


`;
