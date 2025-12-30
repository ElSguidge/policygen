import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SafeDocGen - Free Legal Document Generator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          backgroundImage:
            "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f0fdf4 100%)",
        }}
      >
        {/* Shield Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            backgroundColor: "#111827",
            borderRadius: 24,
            marginBottom: 32,
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#111827",
            marginBottom: 16,
            letterSpacing: "-0.02em",
          }}
        >
          SafeDocGen
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#4b5563",
            marginBottom: 40,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Free Legal Document Generator
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 24,
          }}
        >
          {["Privacy Policy", "Terms of Service", "Cookie Policy", "EULA"].map(
            (item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 24px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: 999,
                  fontSize: 20,
                  color: "#374151",
                }}
              >
                {item}
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            fontSize: 20,
            color: "#9ca3af",
          }}
        >
          GDPR & CCPA Compliant | No Signup Required | 100% Free
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
