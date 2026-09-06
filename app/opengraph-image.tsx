import { ImageResponse } from "next/og";
import { siteName } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteName} — Building a Digital Space`;

/** OG 分享图：与首页同语言——深空底、光晕、细/粗字重对比、渐变主标题 */
export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 110px",
          position: "relative",
          background: "#05060f",
        }}
      >
        {/* 环境光晕：蓝 / 紫 / 青，呼应 WebGL 背景层 */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(91, 140, 255, 0.20), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(160, 107, 255, 0.16), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: "40%",
            width: 440,
            height: 440,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(56, 232, 208, 0.10), transparent 65%)",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 12,
            color: "#9aa3c0",
            marginBottom: 34,
          }}
        >
          {siteName.toUpperCase()} — PERSONAL UNIVERSE
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 118,
            fontWeight: 300,
            color: "#e6e9f5",
            lineHeight: 1.05,
          }}
        >
          Building a
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 118,
            fontWeight: 700,
            lineHeight: 1.05,
            paddingBottom: 10,
            background: "linear-gradient(90deg, #5b8cff, #a06bff, #38e8d0)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Digital Space
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 40,
            fontSize: 24,
            color: "#9aa3c0",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#38e8d0",
            }}
          />
          <div style={{ letterSpacing: 6 }}>WELCOME IN · EXPLORE FREELY</div>
          <div style={{ flexGrow: 1 }} />
          <div style={{ letterSpacing: 4 }}>freedom.space</div>
        </div>
      </div>
    ),
    size
  );
}
