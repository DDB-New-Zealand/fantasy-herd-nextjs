import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

// const geo = geolocation(req);

// console.log(geo);

export const config = {
  matcher: ["/", "/geolocation"],
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url } = req;
  const geo = geolocation(req);

  const country = geo.country || "NZ";
  const city = geo.city || "Auckland";
  const region = geo.countryRegion || "AUK";

  const newUrl = new URL(url);

  newUrl.searchParams.set("country", country);
  newUrl.searchParams.set("city", city);
  newUrl.searchParams.set("region", region);

  return NextResponse.rewrite(newUrl);
}
