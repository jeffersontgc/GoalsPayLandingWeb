import { ImageResponse } from "next/og";
import { OgPulse } from "@/components/seo/OgPulse";
import { BRAND_COLORS } from "@/config/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Proporción del ícono de iOS del documento: pulso de 104 en un cuadro de 180. */
const PULSE_SIZE = 104;

/** Ícono de Apple: fondo marino y el pulso (iOS redondea las esquinas solo). */
const AppleIcon = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_COLORS.navy,
        }}
      >
        <OgPulse size={PULSE_SIZE} />
      </div>
    ),
    size,
  );

export default AppleIcon;
