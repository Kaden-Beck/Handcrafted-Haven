"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastLogin() {
  const searchParams = useSearchParams();
  const logged = searchParams.get("logged");

  useEffect(() => {
    if (logged === "true") {
      toast.success("Logged in successfully!");
    }
  }, [logged]);

  return null;
}