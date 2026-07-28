# Disin contributor guide

## Workflow

- Create work branches with the `feature/` prefix.
- Keep `main` deployable and use pull requests for changes.
- Run `npm run typecheck` and `npm run build` before pushing.
- Delete feature branches after merging.

## Design seed archive

- Register every visual language in `src/seeds/registry.ts` and implement it
  beneath `src/seeds/<seed>/`.
- The installable CSS library lives under `src/library/`; keep component families
  split by category and preserve DaisyUI-compatible class names.
- Keep `src/library/components.ts`, the gallery, `llms.txt`, and the Agent Skill
  aligned whenever component coverage changes.
- Keep tokens scoped to the seed root; do not leak seed-specific globals.
- A seed entry should include reusable components, one composed example, and a
  short decision record in `designs/<seed>/`.
- Preserve source artifacts under `public/references/`; do not make the gallery
  runtime depend on them.
- Prefer CSS and inline SVG for design primitives so examples remain portable.

## Publishing

- Production is deployed on Vercel at `disin.vercel.app`.
- Use `pre-disin.vercel.app` for the latest preview deployment.
- `npm run build` must produce both the Vercel site and the package in
  `package-dist/`.
- Run `npm run test:package` before changing the package version or publishing.
- Public releases use the npm package `disin`.
- Do not star, watch, or follow GitHub accounts on behalf of the user.
