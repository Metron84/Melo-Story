import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 } as const;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fcfcfb",
          color: "#121212",
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: 64,
            border: "8px solid #e9e3d8",
            borderRadius: 24,
            gap: 16,
          }}
        >
          <div style={{ fontSize: 88, fontWeight: 700 }}>Mr.Melo</div>
          <div style={{ fontSize: 36 }}>Media, Code, and Story</div>
        </div>
      </div>
    ),
    size
  );
}


