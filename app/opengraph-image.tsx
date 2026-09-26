import { ImageResponse } from "next/og";

export const alt = "Vaibhav — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 78px",
          background: "#f6f7f3",
          color: "#171a1f",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#6f7785",
          }}
        >
          <span>VAIBHAV</span>
          <span>SOFTWARE DEVELOPER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              maxWidth: 900,
              fontSize: 74,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: -4,
            }}
          >
            Rust & C++ at the core.
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#5b6471",
              letterSpacing: -1.2,
            }}
          >
            MERN for full-stack web applications.
          </div>
        </div>

        <div
          style={{
            width: 220,
            height: 8,
            borderRadius: 999,
            background: "#3657ff",
          }}
        />
      </div>
    ),
    size,
  );
}
