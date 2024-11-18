export const name = "Button";

export const importDocs = `
  import {Button, ButtonGroup} from "@nextui-org/react";
`;

export const usageDocs = `
  <Button color="default">
         Default
       </Button>
       <Button color="primary">
         Primary
       </Button>
       <Button color="secondary">
         Secondary
       </Button>
       <Button color="success">
         Success
       </Button>
       <Button color="warning">
         Warning
       </Button>
       <Button color="danger">
         Danger
       </Button>
       <Button color="primary" variant="solid">
              Solid
      </Button>
      <Button color="primary" variant="faded">
              Faded
      </Button>
      <Button color="primary" variant="bordered">
         Bordered
      </Button>
      <Button color="primary" variant="light">
       Light
      </Button>
            <Button color="primary" variant="flat">
              Flat
            </Button>
            <Button color="primary" variant="ghost">
              Ghost
            </Button>
            <Button color="primary" variant="shadow">
              Shadow
            </Button>
            <Button color="primary" isLoading>
                 Loading
               </Button>
            <Button color="success" endContent={<CameraIcon/>}>
                      Take a photo
            </Button>
           <Button color="danger" variant="bordered" startContent={<UserIcon/>}>
              Delete user
          </Button>

          <Button isIconOnly color="danger" aria-label="Like">
                 <HeartIcon />
               </Button>
               <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo">
                 <CameraIcon />
               </Button>

               <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
                   Button
                  </Button>


                 <ButtonGroup>
                     <Button>One</Button>
                     <Button>Two</Button>
                     <Button>Three</Button>
                   </ButtonGroup>
`;
