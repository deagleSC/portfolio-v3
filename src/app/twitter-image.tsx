import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Supratik Chakraborty - Full-Stack Software Engineer";
export const size = {
  width: 1200,
  height: 1200,
};
export const contentType = "image/png";

export default async function Image() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://supratikch.com";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f172a",
        position: "relative",
      }}
    >
      {/* Profile Image - Large and Centered */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: "8px solid #64ffda",
          overflow: "hidden",
          boxShadow: "0 0 100px rgba(100, 255, 218, 0.3)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${siteUrl}/profile.png`}
          alt="Supratik Chakraborty"
          width={800}
          height={800}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  );
}
