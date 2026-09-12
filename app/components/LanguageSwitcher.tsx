"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {useLocale} from "next-intl";
import {usePathname} from "next/navigation";
import {Check, ChevronDown, Globe2} from "lucide-react";

import styles from "./LanguageSwitcher.module.css";

type LocaleCode =
  | "fr"
  | "ar"
  | "de"
  | "it"
  | "en"
  | "es"
  | "zh";

type Language = {
  code: LocaleCode;
  label: string;
  shortLabel: string;
  flag: string;
  direction: "ltr" | "rtl";
};

const languages: Language[] = [
  {
    code: "fr",
    label: "Français",
    shortLabel: "FR",
    flag: "🇫🇷",
    direction: "ltr",
  },
  {
    code: "ar",
    label: "العربية",
    shortLabel: "AR",
    flag: "🇸🇦",
    direction: "rtl",
  },
  {
    code: "de",
    label: "Deutsch",
    shortLabel: "DE",
    flag: "🇩🇪",
    direction: "ltr",
  },
  {
    code: "it",
    label: "Italiano",
    shortLabel: "IT",
    flag: "🇮🇹",
    direction: "ltr",
  },
  {
    code: "en",
    label: "English",
    shortLabel: "EN",
    flag: "🇬🇧",
    direction: "ltr",
  },
  {
    code: "es",
    label: "Español",
    shortLabel: "ES",
    flag: "🇪🇸",
    direction: "ltr",
  },
  {
    code: "zh",
    label: "中文",
    shortLabel: "中文",
    flag: "🇨🇳",
    direction: "ltr",
  },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    languages.find((language) => language.code === locale) ??
    languages[0];

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        closeOnOutsideClick,
      );
      document.removeEventListener(
        "keydown",
        closeOnEscape,
      );
    };
  }, []);

  function changeLanguage(language: Language) {
    if (language.code === locale) {
      setIsOpen(false);
      return;
    }

    document.cookie = [
      `SBI_LOCALE=${language.code}`,
      "path=/",
      "max-age=31536000",
      "samesite=lax",
    ].join("; ");

    document.documentElement.lang = language.code;
    document.documentElement.dir = language.direction;

    setIsOpen(false);

    const segments = pathname
      .split("/")
      .filter(Boolean);

    const hasLocalePrefix =
      languages.some(
        (item) => item.code === segments[0],
      );

    const rest = hasLocalePrefix
      ? segments.slice(1)
      : segments;

    const nextPath =
      `/${language.code}${
        rest.length
          ? `/${rest.join("/")}`
          : ""
      }`;

    startTransition(() => {
      window.location.assign(
        nextPath + window.location.search,
      );
    });
  }

  return (
    <div
      className={styles.wrapper}
      ref={wrapperRef}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Choisir la langue"
        disabled={isPending}
      >
        <Globe2
          size={18}
          strokeWidth={1.7}
          aria-hidden="true"
        />

        <span className={styles.currentFlag}>
          {currentLanguage.flag}
        </span>

        <span className={styles.currentLabel}>
          {currentLanguage.label}
        </span>

        <span className={styles.currentShort}>
          {currentLanguage.shortLabel}
        </span>

        <ChevronDown
          size={15}
          strokeWidth={1.8}
          aria-hidden="true"
          className={isOpen ? styles.chevronOpen : ""}
        />
      </button>

      {isOpen && (
        <div
          className={styles.dropdown}
          role="listbox"
          aria-label="Langues disponibles"
        >
          <div className={styles.dropdownHeader}>
            <span>Choisir la langue</span>
            <small>LANGUE</small>
          </div>

          <div className={styles.languageList}>
            {languages.map((language) => {
              const selected = language.code === locale;

              return (
                <button
                  key={language.code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`${styles.languageButton} ${
                    selected ? styles.selected : ""
                  }`}
                  onClick={() => changeLanguage(language)}
                >
                  <span className={styles.flag}>
                    {language.flag}
                  </span>

                  <span className={styles.languageName}>
                    {language.label}
                  </span>

                  <span className={styles.languageCode}>
                    {language.shortLabel}
                  </span>

                  {selected && (
                    <Check
                      size={17}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
