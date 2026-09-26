import { ImageResponse } from "next/og";

export const alt = "Vaibhav — Rust & C++ Developer";
export const size = {
  width: 1200,
  height: 630,
};
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
          background: "#08090b",
          color: "#f4f1eb",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 28,
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#c41e3a",
            }}
          />
          VAIBHAV
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -4 }}>
            Rust & C++
          </div>
          <div style={{ fontSize: 34, color: "#9d9a94" }}>
            MERN when it needs a browser.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#74716c",
          }}
        >
          <span>github.com/Vaibh37</span>
          <span>Software Developer</span>
        </div>
      </div>
    ),
    size,
  );
}
