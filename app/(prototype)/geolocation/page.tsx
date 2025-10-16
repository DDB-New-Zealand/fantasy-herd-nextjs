import { Suspense } from "react";
import GeolocationPage from "./page.client";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    country: string | undefined;
    city: string | undefined;
    region: string | undefined;
  }>;
}) => {
  const params = await searchParams;

  return (
    <Suspense>
      <GeolocationPage
        country={params.country || "NZ"}
        city={params.city || "Auckland"}
        region={params.region || "AUK"}
      />
    </Suspense>
  );
};

export default Page;
