"use client";

import { Suspense } from "react";
import { JokesPageContent } from "./jokes-page-content";

export default function JokesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JokesPageContent />
    </Suspense>
  );
}