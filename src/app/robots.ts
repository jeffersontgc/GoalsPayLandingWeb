import type { MetadataRoute } from "next";
import { getAbsoluteUrl } from "@/utils/seo";

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: "*", allow: "/", disallow: "/api/" },
  sitemap: getAbsoluteUrl("/sitemap.xml"),
});

export default robots;
