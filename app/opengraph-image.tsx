import { ImageResponse } from "next/og";

export const alt = "Vaibhav — Rust, C++ & Software Engineering";
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
          background: "#f7f9fc",
          color: "#10213b",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
          }}
        >
          <span style={{ fontWeight: 700 }}>VAIBHAV</span>
          <span style={{ color: "#75839a" }}>SOFTWARE DEVELOPER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: -5,
            }}
          >
            Rust & C++
          </div>

          <div
            style={{
              fontSize: 42,
              color: "#42526c",
              letterSpacing: -2,
            }}
          >
            MERN for full-stack products.
          </div>

          <div
            style={{
              width: 520,
              height: 12,
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #4f7cff 0%, #2ac7e8 52%, #3bd0a0 100%)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#75839a",
          }}
        >
          <span>github.com/Vaibh37</span>
          <span>2026</span>
        </div>
      </div>
    ),
    size,
  );
}
