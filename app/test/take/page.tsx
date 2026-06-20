"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TakeRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/test");
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-[50vh] bg-[#F6EBD4] text-[#4A4333]">
      <div className="flex flex-col items-center gap-4">
        <span className="h-7 w-7 bg-[#DCA543]/20 text-[#DCA543] rounded-full animate-ping" />
        <p className="font-serif italic text-xs">Redirecting to new Unified Assessment Portal...</p>
      </div>
    </main>
  );
}
