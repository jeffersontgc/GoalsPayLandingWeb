import { NextResponse } from "next/server";
import { publicEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

export function GET() {
  const url = publicEnv.NEXT_PUBLIC_APK_URL;

  if (!url) {
    return NextResponse.json(
      {
        error: "APK_URL_NOT_CONFIGURED",
        message:
          "Set NEXT_PUBLIC_APK_URL in your environment to enable APK downloads.",
      },
      { status: 503 }
    );
  }

  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      "Cache-Control": "public, max-age=60",
    },
  });
}
