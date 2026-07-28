import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import postcss from "postcss";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "package-dist");
const entry = resolve(output, "disin.js");
const library = await import(`${pathToFileURL(entry).href}?build=${Date.now()}`);

if (library.componentCount !== 68 || library.disinComponents.length !== 68) {
  throw new Error(`Expected 68 components, found ${library.componentCount}.`);
}

const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const styleDirectory = resolve(root, "src/library/styles");
const componentStyleFiles = [
  "actions.css",
  "data-display.css",
  "navigation.css",
  "feedback.css",
  "data-input.css",
  "layout.css",
  "mockup.css",
];
const tokenSource = await readFile(resolve(styleDirectory, "tokens.css"), "utf8");
const componentSource = (
  await Promise.all(componentStyleFiles.map((file) => readFile(resolve(styleDirectory, file), "utf8")))
).join("\n");
const componentRoot = postcss.parse(componentSource);
const splitOutput = resolve(output, "components");

await mkdir(splitOutput, { recursive: true });
await writeFile(resolve(output, "tokens.css"), tokenSource);

for (const component of library.disinComponents) {
  const selected = componentRoot.clone();
  const classMatchers = component.classes.map((className) => {
    const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\.${escaped}(?=[^a-zA-Z0-9_]|$)`);
  });

  selected.walkRules((rule) => {
    if (rule.parent?.type === "atrule" && rule.parent.name.includes("keyframes")) return;
    const matches = classMatchers.some((matcher) => matcher.test(rule.selector));
    if (!matches) rule.remove();
  });

  selected.walkAtRules((atRule) => {
    if (atRule.name.includes("keyframes")) return;
    if (atRule.nodes && atRule.nodes.length === 0) atRule.remove();
  });

  await writeFile(resolve(splitOutput, `${component.id}.css`), `${selected.toString().trim()}\n`);
}

const components = {
  $schema: "https://disin.vercel.app/schemas/components.schema.json",
  name: packageJson.name,
  version: packageJson.version,
  compatibility: {
    classContract: "daisyUI",
    referenceVersion: "5.7.4",
    tailwindRequired: false,
    runtimeDependencies: 0,
  },
  count: library.componentCount,
  categories: library.componentCategories,
  components: library.disinComponents.map((component) => ({
    ...component,
    css: `disin/components/${component.id}.css`,
  })),
};

const ai = {
  $schema: "https://disin.vercel.app/schemas/ai-install.schema.json",
  name: packageJson.name,
  version: packageJson.version,
  intent: "Install and compose the Disin skeuomorphic CSS component library.",
  install: {
    npm: "npm install disin",
    pnpm: "pnpm add disin",
    yarn: "yarn add disin",
    bun: "bun add disin",
    github: "npm install github:ishuowang/disin",
    skill: "npx skills add ishuowang/disin --skill disin -y",
  },
  cssImport: "@import \"disin/styles.css\";",
  selectiveCssImports: [
    "@import \"disin/tokens.css\";",
    "@import \"disin/components/button.css\";",
  ],
  rootAttribute: "data-theme=\"disin\"",
  manifest: "disin/components.json",
  instructions: "https://github.com/ishuowang/disin/blob/main/skills/disin/SKILL.md",
};

const componentsJson = `${JSON.stringify(components, null, 2)}\n`;
const aiJson = `${JSON.stringify(ai, null, 2)}\n`;

await writeFile(resolve(output, "components.json"), componentsJson);
await writeFile(resolve(output, "ai.json"), aiJson);
await copyFile(resolve(root, "llms.txt"), resolve(output, "llms.txt"));
await writeFile(resolve(root, "public/components.json"), componentsJson);
await writeFile(resolve(root, "public/ai.json"), aiJson);
await copyFile(resolve(root, "llms.txt"), resolve(root, "public/llms.txt"));

console.log(`Built ${packageJson.name}@${packageJson.version}: ${library.componentCount} components.`);
