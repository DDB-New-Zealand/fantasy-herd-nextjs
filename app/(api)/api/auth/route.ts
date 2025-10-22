import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(_: NextApiRequest, res: NextApiResponse) {
  return new Response("Authentication Required!", {
    status: 401,
    headers: {
      "WWW-Authenticate": "Basic realm='private_pages'",
    },
  });
}
