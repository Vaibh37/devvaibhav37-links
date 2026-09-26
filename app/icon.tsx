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
          borderRadius: 8,
          background:
            "linear-gradient(135deg, #4f7cff 0%, #2ac7e8 55%, #3bd0a0 100%)",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        V
      </div>
    ),
    size,
  );
}
