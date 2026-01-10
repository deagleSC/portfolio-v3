import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Supratik Chakraborty - Full-Stack Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        backgroundImage:
          "radial-gradient(circle at 25% 25%, rgba(100, 255, 218, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(100, 255, 218, 0.1) 0%, transparent 50%)",
      }}
    >
      {/* Profile Image Circle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 150,
          height: 150,
          borderRadius: "50%",
          border: "4px solid #64ffda",
          overflow: "hidden",
          marginBottom: 30,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://supratikch.com/profile.png"
          alt="Profile"
          width={150}
          height={150}
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      {/* Name */}
      <div
        style={{
          display: "flex",
          fontSize: 60,
          fontWeight: 700,
          color: "#ccd6f6",
          marginBottom: 10,
          letterSpacing: "-0.02em",
        }}
      >
        Supratik Chakraborty
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "#64ffda",
          marginBottom: 20,
        }}
      >
        Full-Stack Software Engineer
      </div>

      {/* Description */}
      <div
        style={{
          display: "flex",
          fontSize: 20,
          color: "#8892b0",
          textAlign: "center",
          maxWidth: 800,
          lineHeight: 1.4,
        }}
      >
        Enterprise SaaS • AI Solutions • FastAPI • React • Next.js
      </div>

      {/* Website URL */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: 40,
          fontSize: 18,
          color: "#64ffda",
        }}
      >
        supratikch.com
      </div>
    </div>,
    {
      ...size,
    },
  );
}
