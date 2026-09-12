"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  Dumbbell,
  Luggage,
  PackageSearch,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

type AssistantAction = {
  label: string;
  href: string;
};

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
  actions?: AssistantAction[];
};

type ApiResponse = {
  reply?: string;
  actions?: AssistantAction[];
};

export default function SbiAssistant() {
  const t = useTranslations("assistant");
  const locale = useLocale();

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: t("welcome"),
    },
  ]);

  const actions = [
    { key: "product", icon: Search },
    { key: "tracking", icon: ShoppingBag },
    { key: "delivery", icon: Truck },
    { key: "sport", icon: Dumbbell },
    { key: "perfumes", icon: Sparkles },
    { key: "mobility", icon: Luggage },
  ] as const;

  useEffect(() => {
    const node = scrollRef.current;

    if (!node) return;

    node.scrollTo({
      top: node.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const clean = text.trim();

    if (!clean || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      text: clean,
    };

    const history = [...messages, userMessage]
      .slice(-10)
      .map((message) => ({
        role: message.role,
        text: message.text,
      }));

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/sbi-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: clean,
          locale,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error("assistant_request_failed");
      }

      const data = (await response.json()) as ApiResponse;

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: data.reply || t("demoReply"),
          actions: Array.isArray(data.actions)
            ? data.actions
            : [],
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: t("demoReply"),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {isOpen && (
        <section
          aria-label={t("header.title")}
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "225px",
            width: "370px",
            maxWidth: "calc(100vw - 30px)",
            height: "500px",
            maxHeight: "calc(100vh - 245px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            background: "#ffffff",
            borderRadius: "22px",
            border: "1px solid rgba(15,70,130,.14)",
            boxShadow:
              "0 20px 60px rgba(0,35,80,.28)",
            zIndex: 9998,
          }}
        >
          <header
            style={{
              minHeight: "76px",
              padding: "0 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#fff",
              background:
                "linear-gradient(135deg,#071b38 0%,#0d4fa3 100%)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "48px",
                height: "48px",
                flexShrink: 0,
                overflow: "hidden",
                borderRadius: "50%",
                border: "2px solid #fff",
              }}
            >
              <Image
                src="/assistant/sbi-assistant-avatar.png"
                alt=""
                fill
                sizes="48px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div
              style={{
                flex: 1,
                minWidth: 0,
              }}
            >
              <strong
                style={{
                  fontSize: "16px",
                }}
              >
                {t("header.title")}
              </strong>

              <div
                style={{
                  marginTop: "3px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#23d160",
                  }}
                />

                {t("header.online")}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="SBI PARIS"
              style={{
                width: "38px",
                height: "38px",
                display: "grid",
                placeItems: "center",
                border: 0,
                borderRadius: "50%",
                background:
                  "rgba(255,255,255,.10)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <X size={21} />
            </button>
          </header>

          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              background: "#f8fbff",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: "flex",
                  justifyContent:
                    message.role === "user"
                      ? "flex-end"
                      : "flex-start",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                {message.role === "assistant" && (
                  <div
                    style={{
                      position: "relative",
                      width: "32px",
                      height: "32px",
                      flexShrink: 0,
                      overflow: "hidden",
                      borderRadius: "50%",
                    }}
                  >
                    <Image
                      src="/assistant/sbi-assistant-avatar.png"
                      alt=""
                      fill
                      sizes="32px"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <div
                  style={{
                    maxWidth: "78%",
                  }}
                >
                  <div
                    style={{
                      padding: "11px 13px",
                      whiteSpace: "pre-line",
                      borderRadius:
                        message.role === "user"
                          ? "16px 4px 16px 16px"
                          : "4px 16px 16px 16px",
                      background:
                        message.role === "user"
                          ? "#0d4fa3"
                          : "#ffffff",
                      color:
                        message.role === "user"
                          ? "#ffffff"
                          : "#071b38",
                      fontSize: "13px",
                      lineHeight: 1.45,
                      boxShadow:
                        message.role === "assistant"
                          ? "0 4px 14px rgba(0,40,90,.08)"
                          : "none",
                    }}
                  >
                    {message.text}
                  </div>

                  {message.actions &&
                    message.actions.length > 0 && (
                      <div
                        style={{
                          marginTop: "7px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "6px",
                        }}
                      >
                        {message.actions.map(
                          (action) => (
                            <a
                              key={`${message.id}-${action.href}`}
                              href={action.href}
                              style={{
                                padding:
                                  "7px 10px",
                                border:
                                  "1px solid #b9d0eb",
                                borderRadius:
                                  "10px",
                                background:
                                  "#ffffff",
                                color: "#0d4fa3",
                                textDecoration:
                                  "none",
                                fontSize: "11px",
                                fontWeight: 800,
                              }}
                            >
                              {action.label}
                            </a>
                          )
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "32px",
                    height: "32px",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  <Image
                    src="/assistant/sbi-assistant-avatar.png"
                    alt=""
                    fill
                    sizes="32px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "8px 14px",
                    borderRadius:
                      "4px 16px 16px 16px",
                    background: "#ffffff",
                    color: "#0d4fa3",
                    fontWeight: 900,
                  }}
                >
                  ...
                </div>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "8px",
                marginTop: "14px",
              }}
            >
              {actions.map(
                ({ key, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    disabled={isLoading}
                    onClick={() =>
                      void sendMessage(
                        t(
                          `actions.${key}.prompt`
                        )
                      )
                    }
                    style={{
                      minHeight: "47px",
                      padding: "8px 9px",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      textAlign: "start",
                      color: "#0b4590",
                      background: "#ffffff",
                      border:
                        "1px solid #d5e2f2",
                      borderRadius: "11px",
                      cursor: isLoading
                        ? "default"
                        : "pointer",
                      opacity: isLoading
                        ? 0.6
                        : 1,
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    <Icon size={17} />

                    {t(
                      `actions.${key}.label`
                    )}
                  </button>
                )
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              padding: "11px",
              display: "flex",
              gap: "8px",
              background: "#ffffff",
              borderTop:
                "1px solid #e3ebf5",
            }}
          >
            <div
              style={{
                position: "relative",
                flex: 1,
                minWidth: 0,
              }}
            >
              <PackageSearch
                size={17}
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform:
                    "translateY(-50%)",
                  color: "#7890aa",
                }}
              />

              <input
                value={input}
                disabled={isLoading}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder={t(
                  "composer.placeholder"
                )}
                style={{
                  width: "100%",
                  height: "44px",
                  padding:
                    "0 12px 0 38px",
                  outline: "none",
                  border:
                    "1px solid #ccd9e8",
                  borderRadius: "22px",
                  color: "#071b38",
                  background: "#ffffff",
                  fontSize: "13px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={
                isLoading || !input.trim()
              }
              aria-label={t("send")}
              style={{
                width: "44px",
                height: "44px",
                flexShrink: 0,
                display: "grid",
                placeItems: "center",
                border: 0,
                borderRadius: "50%",
                background: "#0d4fa3",
                color: "#ffffff",
                cursor:
                  isLoading || !input.trim()
                    ? "default"
                    : "pointer",
                opacity:
                  isLoading || !input.trim()
                    ? 0.6
                    : 1,
              }}
            >
              <Send size={19} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="sbiAssistantFloat"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        aria-label="SBI PARIS Assistant"
        style={{
          position: "fixed",
          right: "20px",
          bottom: "156px",
          width: "58px",
          height: "58px",
          padding: 0,
          overflow: "hidden",
          borderRadius: "50%",
          border: "3px solid white",
          background: "#071b38",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow:
            "0 0 28px rgba(20,110,255,.65)",
        }}
      >
        <Image
          src="/assistant/sbi-assistant-avatar.png"
          alt="SBI PARIS Assistant"
          fill
          sizes="58px"
          style={{
            objectFit: "cover",
          }}
        />
      </button>
    </>
  );
}
