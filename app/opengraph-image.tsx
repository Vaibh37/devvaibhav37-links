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
          background: "#0a0b0e",
          color: "#f4f1ea",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <span>VAIBHAV</span>
          <span style={{ color: "#8e9199" }}>SOFTWARE DEVELOPER</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -6 }}>
            Rust + C++
          </div>
          <div
            style={{
              width: 520,
              height: 12,
              borderRadius: 999,
              background:
                "linear-gradient(90deg, #f47a37 0%, #e85b48 38%, #6f7cff 100%)",
            }}
          />
          <div style={{ fontSize: 34, color: "#a5a7ad" }}>MERN for the web.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
          <span style={{ color: "#8e9199" }}>github.com/Vaibh37</span>
          <span>2026</span>
        </div>
      </div>
    ),
    size,
  );
}
