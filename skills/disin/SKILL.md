---
name: disin
description: Install and use the Disin skeuomorphic CSS component library when building or restyling an interface with tactile, DaisyUI-compatible component classes.
---

# Disin component library

Use Disin when the user asks for a tactile, skeuomorphic, physical, material,
retro-hardware, or dimensional interface. Disin is a standalone CSS package. It
does not require Tailwind CSS, DaisyUI, React, or a JavaScript runtime.

## Install

1. Inspect the project and identify its package manager and global CSS entry.
2. Install the package with the matching command:

   ```bash
   npm install disin
   # pnpm add disin
   # yarn add disin
   # bun add disin
   ```

3. Import the stylesheet once in the global CSS entry:

   ```css
   @import "disin/styles.css";
   ```

   For a minimal bundle, import the tokens once and only the components used:

   ```css
   @import "disin/tokens.css";
   @import "disin/components/button.css";
   @import "disin/components/card.css";
   @import "disin/components/input.css";
   ```

4. Put the Disin theme and chosen seed on the application root:

   ```html
   <html data-theme="disin" data-seed="skeuomorphic">
   ```

5. If the npm registry is unavailable, use the GitHub package source:

   ```bash
   npm install github:ishuowang/disin
   ```

Do not import both the full DaisyUI stylesheet and Disin without an explicit
cascade decision. They implement many of the same class names. If an existing
project must keep DaisyUI, import Disin after DaisyUI and scope the intended
surface with `data-theme="disin"`.

## Choose components

Read `disin/components.json` before composing a large interface. It
contains all 68 supported components, their categories, descriptions, exact
class names, and individual CSS import paths.

Prefer the established class contract:

- Actions: `btn`, `dropdown`, `fab`, `modal`, `swap`
- Display: `card`, `badge`, `alert`, `avatar`, `stats`, `table`, `timeline`
- Navigation: `navbar`, `menu`, `breadcrumbs`, `dock`, `steps`, `tabs`
- Forms: `input`, `select`, `textarea`, `checkbox`, `radio`, `range`, `toggle`
- Layout: `hero`, `drawer`, `footer`, `join`, `stack`, `indicator`
- Mockups: `mockup-browser`, `mockup-code`, `mockup-phone`, `mockup-window`

Do not recreate a supported component with one-off gradients and shadows.
Compose the semantic class names first, then add product-specific layout classes.

## Markup rules

- Keep native elements: use `button`, `input`, `select`, `textarea`, `dialog`,
  `details`, `progress`, and `table` where appropriate.
- Keep visible focus states and accessible names.
- Use native checked, open, disabled, required, and validation states.
- Use semantic color modifiers only when meaning is present:
  `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`.
- Use size modifiers consistently: `xs`, `sm`, `md`, `lg`, `xl`.
- Respect reduced-motion preferences. Do not add decorative continuous motion.
- Keep page layout responsive; a component preview that fits only desktop is not
  complete.

## Minimal example

```html
<div data-theme="disin" data-seed="skeuomorphic">
  <article class="card">
    <div class="card-body">
      <span class="badge badge-primary">Ready</span>
      <h2 class="card-title">Tactile console</h2>
      <label class="input input-primary">
        <input placeholder="Station name" />
      </label>
      <div class="card-actions">
        <button class="btn">Cancel</button>
        <button class="btn btn-primary">Save</button>
      </div>
    </div>
  </article>
</div>
```

## Verify

After implementation:

1. Run the project's existing typecheck and production build.
2. Exercise buttons, disclosures, dialogs, and native form controls.
3. Check the page at desktop and 390px mobile width.
4. Confirm there is no horizontal overflow.
5. Confirm focus, disabled, checked, open, and validation states remain legible.

Component docs: https://disin.vercel.app/components/
Seed reference: https://disin.vercel.app/seeds/skeuomorphic/
Compact context: https://disin.vercel.app/llms.txt
Live manifest: https://disin.vercel.app/components.json
Component manifest: https://unpkg.com/disin/package-dist/components.json
