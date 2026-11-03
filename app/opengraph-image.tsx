import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DOCVY: plain-language patient guides for India.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 56,
          color: "#173A37",
          background: "linear-gradient(135deg, #FBFCF8 0%, #EAF5F1 58%, #E0EFE5 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: "64%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16, background: "#245A46", color: "white", fontSize: 26, fontWeight: 800 }}>D</div>
            <div style={{ marginLeft: 14, color: "#123B38", fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>DOCVY</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
            <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>Care starts with a question.</div>
            <div style={{ marginTop: 22, color: "#526D66", fontSize: 23, lineHeight: 1.35 }}>Understand medical specialties and prepare for a visit.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "#245A46", fontSize: 15, fontWeight: 700, letterSpacing: 1.1 }}>CARE, CONNECTED <span style={{ marginLeft: 14, color: "#789089", fontWeight: 500, letterSpacing: 0 }}>· Patient guides for India</span></div>
        </div>
        <div style={{ width: "36%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div style={{ width: 340, height: 340, borderRadius: 170, background: "#D3ECE3", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 258, height: 230, borderRadius: 28, background: "white", boxShadow: "0 20px 60px rgba(23, 58, 55, 0.12)", padding: 24, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", color: "#245A46", fontSize: 13, fontWeight: 800, letterSpacing: 1.2 }}>PATIENT GUIDE</div>
              <div style={{ marginTop: 19, padding: "14px 15px", border: "2px solid #DCEAE5", borderRadius: 14, display: "flex", alignItems: "center", color: "#789089", fontSize: 15 }}>Search a concern or specialty</div>
              <div style={{ marginTop: 18, display: "flex", alignItems: "center" }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, background: "#245A46" }} />
                <div style={{ marginLeft: 9, color: "#36564F", fontSize: 14, fontWeight: 700 }}>Joint pain</div>
                <div style={{ marginLeft: 10, width: 14, height: 14, borderRadius: 7, background: "#86AA91" }} />
                <div style={{ marginLeft: 9, color: "#36564F", fontSize: 14, fontWeight: 700 }}>Diabetes</div>
              </div>
              <div style={{ marginTop: 15, display: "flex", alignItems: "center" }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, background: "#CDD88F" }} />
                <div style={{ marginLeft: 9, color: "#36564F", fontSize: 14, fontWeight: 700 }}>Asthma</div>
                <div style={{ marginLeft: 10, color: "#789089", fontSize: 12 }}>Explore a guide</div>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: 76, right: 5, width: 58, height: 58, borderRadius: 20, background: "#CDD88F", opacity: 0.9 }} />
          <div style={{ position: "absolute", bottom: 70, left: 4, width: 34, height: 34, borderRadius: 17, background: "#245A46" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
