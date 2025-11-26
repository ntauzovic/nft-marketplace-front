"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { languages, Lang } from "../i18n";

const LANG_KEY = "lang";

export function useLanguage() {
  const queryClient = useQueryClient();

  console.log("🚀 [useLanguage] Hook mounted");

  const { data: lang } = useQuery<Lang>({
    queryKey: [LANG_KEY],
    queryFn: () => {
      console.log("🔍 [useLanguage.queryFn] Running...");
      if (typeof window === "undefined") {
        console.log("❌ [SSR] window undefined → returning 'en'");
        return "en";
      }
      const stored = localStorage.getItem(LANG_KEY);
      console.log("📦 [localStorage] stored lang =", stored);
      return (stored as Lang) || "en";
    },
    initialData: "en",
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  console.log("📌 [useLanguage] lang =", lang);

  // sync <html lang="">
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("🌐 [useEffect] Setting <html lang> to:", lang);
      document.documentElement.setAttribute("lang", lang || "en");
    }
  }, [lang]);

  const setLang = (newLang: Lang) => {
    console.log("📝 [setLang] called with:", newLang);

    if (typeof window !== "undefined") {
      console.log("💾 [localStorage] saving", newLang);
      localStorage.setItem(LANG_KEY, newLang);
    }

    console.log("🔄 [ReactQuery] updating cache");
    queryClient.setQueryData([LANG_KEY], newLang);
  };

  const t = (key: string): string => {
    console.log("🔤 [translate] lang:", lang, "key:", key);
    const dictionary = languages[lang || "en"] as Record<string, string>;
    return dictionary[key] ?? key;
  };

  return { lang: lang || "en", setLang, t };
}
