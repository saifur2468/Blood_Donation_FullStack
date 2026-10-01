"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

type Lang = "en" | "bn";

const setTranslateCookie = (lang: Lang) => {
  const host = window.location.hostname;
  const expire = "Thu, 01 Jan 1970 00:00:00 GMT";

  // Age purono cookie clear
  document.cookie = `googtrans=; expires=${expire}; path=/`;
  document.cookie = `googtrans=; expires=${expire}; path=/; domain=${host}`;

  if (lang === "bn") {
    document.cookie = `googtrans=/en/bn; path=/`;
    document.cookie = `googtrans=/en/bn; path=/; domain=${host}`;
  }
};

export default function GoogleTranslate() {
  const [lang, setLang] = useState<Lang>("en");

  // Current language cookie theke pora
  useEffect(() => {
    if (document.cookie.includes("googtrans=/en/bn")) setLang("bn");
  }, []);

  // Google Translate hidden load
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      const container = document.getElementById("google_translate_element");
      if (!container || container.childElementCount > 0) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "bn,en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  const handleChange = (next: Lang) => {
    if (next === lang) return;
    setTranslateCookie(next);
    setLang(next);
    window.location.reload();
  };

  const base =
    "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 focus:outline-none";

  return (
    <div className="flex items-center">
      {/* Google er original widget - shudhu hidden thakbe */}
      <div
        id="google_translate_element"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      />

      {/* Custom toggle */}
      <div
        role="group"
        aria-label="Language switcher"
        className="notranslate flex items-center gap-1 rounded-full border border-gray-300 bg-gray-100 p-1 shadow-inner"
      >
        <button
          type="button"
          onClick={() => handleChange("en")}
          aria-pressed={lang === "en"}
          className={`${base} ${
            lang === "en"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => handleChange("bn")}
          aria-pressed={lang === "bn"}
          className={`${base} ${
            lang === "bn"
              ? "bg-red-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          বাং
        </button>
      </div>
    </div>
  );
}