import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const temp = await mkdtemp(join(tmpdir(), "disin-package-"));

try {
  const output = execFileSync("npm", ["pack", "--json", "--ignore-scripts", "--pack-destination", temp], {
    cwd: root,
    encoding: "utf8",
  });
  const [{ filename, files, unpackedSize }] = JSON.parse(output);
  const paths = new Set(files.map((file) => file.path));
  const required = [
    "package-dist/disin.css",
    "package-dist/disin.js",
    "package-dist/tokens.css",
    "package-dist/components/button.css",
    "package-dist/components/otp.css",
    "package-dist/components.json",
    "package-dist/ai.json",
    "skills/disin/SKILL.md",
    "llms.txt",
  ];

  for (const path of required) {
    if (!paths.has(path)) throw new Error(`Package is missing ${path}`);
  }

  const splitComponents = files.filter((file) => /^package-dist\/components\/[^/]+\.css$/.test(file.path));
  if (splitComponents.length !== 68) {
    throw new Error(`Expected 68 split component styles, found ${splitComponents.length}.`);
  }

  const manifest = JSON.parse(await readFile(resolve(root, "package-dist/components.json"), "utf8"));
  if (manifest.count !== 68) throw new Error(`Manifest contains ${manifest.count} components.`);
  const tabsCss = await readFile(resolve(root, "package-dist/components/tabs.css"), "utf8");
  const statCss = await readFile(resolve(root, "package-dist/components/stat.css"), "utf8");
  if (/\.table(?=[^a-zA-Z0-9_]|$)/.test(tabsCss)) throw new Error("Tabs stylesheet leaked table rules.");
  if (/\.status(?=[^a-zA-Z0-9_]|$)/.test(statCss)) throw new Error("Stat stylesheet leaked status rules.");
  if (unpackedSize > 1_500_000) throw new Error(`Package is unexpectedly large: ${unpackedSize} bytes.`);

  console.log(JSON.stringify({ filename, componentCount: manifest.count, splitStyles: splitComponents.length, unpackedSize, files: files.length }, null, 2));
} finally {
  await rm(temp, { force: true, recursive: true });
}
