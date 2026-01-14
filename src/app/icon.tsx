import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 } as const;
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e8e88",
          color: "#ffffff",
          fontSize: 20,
          fontWeight: 700,
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, sans-serif",
        }}
      >
        M
      </div>
    ),
    size
  );
}


