export type SeedStatus = "active" | "planned";

export interface DesignSeed {
  slug: string;
  index: string;
  name: string;
  chineseName: string;
  description: string;
  status: SeedStatus;
  accent: string;
  materials: readonly string[];
}

export const designSeeds = [
  {
    slug: "skeuomorphic",
    index: "01",
    name: "Skeuomorphic",
    chineseName: "拟物化",
    description:
      "Physical cues, honest depth, and controls whose surfaces explain how they move.",
    status: "active",
    accent: "#c86846",
    materials: ["brushed metal", "stitched leather", "warm signal light"],
  },
  {
    slug: "open-seed",
    index: "02",
    name: "Open seed",
    chineseName: "待定义",
    description:
      "A reserved slot for the next visual language in the Disin archive.",
    status: "planned",
    accent: "#9da091",
    materials: ["unassigned"],
  },
] as const satisfies readonly DesignSeed[];

export const activeSeed = designSeeds.find((seed) => seed.status === "active")!;

export function getSeed(slug: string) {
  return designSeeds.find((seed) => seed.slug === slug);
}
