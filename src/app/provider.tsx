"use client";

import React, { useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { analytics, firebase } from "@/utils/firebase";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  // Initialize Firebase
  const InitializeFirebase = () => {
    try {
      firebase
      analytics
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    InitializeFirebase();
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
