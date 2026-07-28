export type DesignStatus = "active" | "planned";

export interface DesignStyle {
  slug: string;
  index: string;
  name: string;
  chineseName: string;
  description: string;
  status: DesignStatus;
  accent: string;
}

export const designStyles: DesignStyle[] = [
  {
    slug: "skeuomorphic",
    index: "01",
    name: "Skeuomorphic",
    chineseName: "拟物化",
    description: "Physical cues, honest depth, and controls that explain themselves.",
    status: "active",
    accent: "#dc714e",
  },
  {
    slug: "next-style",
    index: "02",
    name: "Open slot",
    chineseName: "待定义",
    description: "The archive is structured for the next visual language.",
    status: "planned",
    accent: "#a6aa9c",
  },
];
