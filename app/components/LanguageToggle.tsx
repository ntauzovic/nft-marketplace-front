"use client";

import { useLanguage } from "../hooks/useLanguage";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  console.log("📌 [LanguageToggle] Current lang:", lang);

  const languages = [
    { code: "en", label: "EN" },
    { code: "cg", label: "CG" },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => {
            console.log("🔘 [LanguageToggle] Click:", l.code);
            alert("Changing language to: " + l.code);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setLang(l.code as any);
          }}
          className={`
            px-3 py-1 rounded-md text-sm font-medium
            transition
            ${
              lang === l.code
                ? "bg-white text-black"
                : "bg-black text-white border border-white/20 hover:bg-white hover:text-black"
            }
          `}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
