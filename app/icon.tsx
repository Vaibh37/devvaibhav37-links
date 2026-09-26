import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

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
          background: "#08090b",
          color: "#f4f1eb",
          fontSize: 20,
          fontWeight: 800,
          border: "2px solid #c41e3a",
        }}
      >
        V
      </div>
    ),
    size,
  );
}
