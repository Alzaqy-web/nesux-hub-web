import { PropsWithChildren, Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const NuqsProvider = ({ children }: PropsWithChildren) => {
  return (
    <NuqsAdapter>
      <Suspense>{children}</Suspense>
    </NuqsAdapter>
  );
};

export default NuqsProvider;
