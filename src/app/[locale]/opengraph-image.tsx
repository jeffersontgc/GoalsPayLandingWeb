import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GoalsPay — Ahorra. Progresa. Logra.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { locale: string };
}) {
  const isEs = params.locale === "es";
  const title = isEs
    ? "Alcanza tus metas 3x más rápido"
    : "Reach your goals 3x faster";
  const subtitle = isEs
    ? "Sin entregar tu banco a nadie."
    : "Without handing your bank to anyone.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(800px 500px at 20% 0%, rgba(99,102,241,0.5), transparent 60%), radial-gradient(800px 500px at 80% 100%, rgba(34,211,166,0.4), transparent 60%), #07091a",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 56 }}>
            <div
              style={{
                width: 14,
                height: 22,
                borderRadius: 3,
                background: "linear-gradient(180deg, #42a5f5, #0d47a1)",
              }}
            />
            <div
              style={{
                width: 14,
                height: 38,
                borderRadius: 3,
                background: "linear-gradient(180deg, #42a5f5, #0d47a1)",
              }}
            />
            <div
              style={{
                width: 14,
                height: 52,
                borderRadius: 3,
                background: "linear-gradient(180deg, #42a5f5, #0d47a1)",
              }}
            />
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
            GoalsPay
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
              background: "linear-gradient(135deg, #a5b4fc, #22d3a6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 36, color: "#cbd5e1", maxWidth: 900 }}>
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
