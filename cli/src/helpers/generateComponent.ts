import { createWriteStream } from "fs";
import dedent from "dedent";
import { execa } from "execa";
import ora from "ora";
import Together from "together-ai";
import { z } from "zod";

import nextuidocs from "~/utils/nextui-docs/index.js";
import nextuiAdvanceComponents from "~/utils/nextui-docs/pages/index.js";
import shadcnDocs from "~/utils/shadcn-docs/index.js";

let options: ConstructorParameters<typeof Together>[0] = {};
if (process.env.HELICONE_API_KEY) {
  options.baseURL = "https://together.helicone.ai/v1";
  options.defaultHeaders = {
    "Helicone-Auth": `Bearer ${process.env.HELICONE_API_KEY}`,
  };
}

let together = new Together({
  ...options,
  apiKey: "",
});

let schema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
  projectDir: z.string(),
});
export async function generateComponent(values: z.infer<typeof schema>) {
  const spinner = ora(`Generating component...`).start();

  const { messages, projectDir } = values;
  let systemPrompt = getSystemPrompt(true, true);

  try {
    let res = await together.chat.completions.create({
      model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages.map((message) => ({
          ...message,
          content:
            message.role === "user"
              ? message.content +
                "\nPlease ONLY return code, NO backticks or language names."
              : message.content,
        })),
      ],
      stream: true,
      temperature: 0.2,
    });

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        const decodedChunk = decoder.decode(chunk);

        try {
          // Assuming this is how you're processing the stream (like JSON parsing)
          const parsed = JSON.parse(decodedChunk);
          const text = parsed.choices[0]?.text;

          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        } catch (error) {
          console.error("Error while processing stream:", error);
          controller.error(error || "There was an error.");
        }
      },
    });

    async function handleReadableStream(
      readableStream: ReadableStream,
      filepath: string
    ) {
      const reader = readableStream.getReader();
      const decoder = new TextDecoder();
      let result = "";
      const writableStream = createWriteStream(filePath, { flags: "r+" });

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          result += chunk;
          writableStream.write(chunk);
        }

        console.log("Stream Result:", result);
      } catch (error) {
        console.error("Error reading stream:", error);
      } finally {
        reader.releaseLock();
      }
    }

    const textStream = res.toReadableStream().pipeThrough(transformStream);

    spinner.stop();
    const filePath = "landing.tsx";
    handleReadableStream(textStream, filePath);
    execa("zed", [filePath]);
  } catch (err) {
    console.log(err);
  }
}

function getSystemPrompt(shadcn: boolean, nextui: boolean) {
  let systemPrompt = `
    You are an expert frontend React engineer and UI/UX designer. Follow these guidelines carefully to create beautiful and modern landing pages:

        - Design the React component with a clean, minimal aesthetic.
        - Use Tailwind CSS for styling, ensuring to utilize utility classes for margins, padding, and responsive design.
        - Implement custom gradients, shadows, and transitions for a cinematic effect.
        - Allow for customizable color themes or gradients based on user input.
        - Ensure the components are responsive, employing Tailwind's responsive utilities.
        - Return only the full React code with imports; do not include any explanations or additional text.
      `;

  // Removed because it causes too many errors
  // - The lucide-react@0.263.1 library is also available to be imported. If you need an icon, use one from lucide-react. Here's an example of importing and using one: import { Camera } from "lucide-react"\` & \`<Camera color="red" size={48} />\`

  if (shadcn) {
    systemPrompt += `
     There are some prestyled components available for use. Please use your best judgement to use any of these components if the app calls for one.

     Here are the components that are available, along with how to import them, and how to use them:

     ${shadcnDocs
       .map(
         (component) => `
           <component>
           <name>
           ${component.name}
           </name>
           <import-instructions>
           ${component.importDocs}
           </import-instructions>
           <usage-instructions>
           ${component.usageDocs}
           </usage-instructions>
           </component>
         `
       )
       .join("\n")}
     `;
  }

  systemPrompt += `
     NO OTHER LIBRARIES (e.g. zod, hookform) ARE INSTALLED OR ABLE TO BE IMPORTED.
   `;

  systemPrompt += `
       Your design should prioritize aesthetics, using modern UI principles. Ensure that the layout is clean, with ample whitespace, rounded corners, and shadows where appropriate.
       Use a cohesive color palette and ensure that all elements are visually appealing and user-friendly.
   `;
  return dedent(systemPrompt);
}
