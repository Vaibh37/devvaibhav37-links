import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#0a0b0e",
          color: "#f2efe8",
          fontSize: 19,
          fontWeight: 800,
          border: "2px solid #f47a37",
        }}
      >
        V
      </div>
    ),
    size,
  );
}
