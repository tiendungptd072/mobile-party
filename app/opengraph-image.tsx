import { ImageResponse } from "next/og";

export const alt = "Mobile Party — transferable mobile framework knowledge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0b1020",
        color: "#edf2f7",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding: "72px",
        width: "100%",
      }}
    >
      <div style={{ color: "#8aafff", display: "flex", fontSize: 32 }}>
        MOBILE FRAMEWORK TRANSITION GUIDE
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 84,
          fontWeight: 700,
          marginTop: 24,
          textAlign: "center",
        }}
      >
        Mobile Party
      </div>
      <div
        style={{
          color: "#a7b1c2",
          display: "flex",
          fontSize: 36,
          marginTop: 28,
          textAlign: "center",
        }}
      >
        Learn a new mobile framework using the one you already know.
      </div>
    </div>,
    size,
  );
}
