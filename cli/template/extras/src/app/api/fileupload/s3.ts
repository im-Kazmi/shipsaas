import { getPresignedPostUrl } from "~/lib/s3";

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();
  try {
    const { url, fields } = await getPresignedPostUrl(filename, contentType);

    return Response.json({ url, fields });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
