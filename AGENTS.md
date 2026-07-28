# Disin contributor guide

## Workflow

- Create work branches with the `feature/` prefix.
- Keep `main` deployable and use pull requests for changes.
- Run `npm run typecheck` and `npm run build` before pushing.
- Delete feature branches after merging.

## Design archive

- Add every style beneath `src/designs/<style>/`.
- Keep tokens scoped to the style root; do not leak style-specific globals.
- A style entry should include reusable components, one composed example, and a
  short decision record in `designs/<style>/`.
- Preserve source artifacts under `public/references/`; do not make the gallery
  runtime depend on them.
- Prefer CSS and inline SVG for design primitives so examples remain portable.

## Publishing

- Production is deployed on Vercel at `disin.vercel.app`.
- Use `pre-disin.vercel.app` for the latest preview deployment.
- Do not star, watch, or follow GitHub accounts on behalf of the user.
