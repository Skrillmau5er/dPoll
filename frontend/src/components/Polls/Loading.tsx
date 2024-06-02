import { Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton height="60px" borderRadius={10} />
      <Skeleton height="60px" borderRadius={10} />
      <Skeleton height="60px" borderRadius={10} />
      <Skeleton height="60px" borderRadius={10} />
    </div>
  );
}
