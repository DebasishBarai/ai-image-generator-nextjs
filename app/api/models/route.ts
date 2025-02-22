import { models } from "@/lib/models";

export async function GET() {

  return new Response(JSON.stringify(models), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
