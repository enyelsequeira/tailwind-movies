"use client";

import { useRouter } from "next/navigation";
import Button from "../ui/button";

const GoBack = () => {
  const router = useRouter();
  return (
    <Button variant="secondary" onClick={router.back}>
      &larr; Back
    </Button>
  );
};
export default GoBack;
