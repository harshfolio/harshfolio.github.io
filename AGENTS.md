# Repository Guidelines

## Project Structure & Module Organization
- `content/`: Markdown pages and posts (e.g., `content/posts/...`).
- `layouts/`: Hugo template overrides and partials.
- `assets/`: Pipeline-managed assets (CSS under `assets/css/extended/`).
- `static/`: Static files served as-is (e.g., `static/images/...`).
- `themes/PaperMod/`: Theme (managed via git submodule). Do not modify directly.
- `public/`: Generated site output. Never edit by hand.
- Root config: `hugo.toml` and `hugo_stats.json`.

## Build, Test, and Development Commands
- `git submodule update --init --recursive` — fetch theme submodule.
- `hugo server -D --disableFastRender` — run local dev server with drafts at http://localhost:1313.
- `hugo --minify` — build production site into `public/`.
- `hugo version` — verify Hugo install. Use the latest extended release.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; no tabs. Max line width ~100 chars.
- Content: use front matter (`title`, `date`, `tags`, `description`). Filenames in kebab-case, e.g., `content/posts/building-elt-pipeline-clinikally.md`.
- CSS: extend in `assets/css/extended/*.css`; prefer small, composable classes; avoid editing theme CSS.
- Templates: add/override in `layouts/` (e.g., `layouts/partials/...`). Do not change files under `themes/`.

## Testing Guidelines
- Manual QA: run `hugo server -D`, navigate key pages, verify links, images, and mobile layout.
- Optional: run Lighthouse in the browser for performance and accessibility checks.
- No unit tests in this repo; prioritize visual and content verification.

## Commit & Pull Request Guidelines
- Commits: imperative, concise, scoped. Examples:
  - `content: add post on data pipelines`
  - `styles: refine code block spacing`
  - `layouts: fix related-posts partial`
- PRs: include summary, before/after screenshots for visual changes, steps to reproduce/verify, and note any `hugo.toml` updates.
- Exclude generated changes: do not commit edits to `public/` or theme internals.

## Security & Configuration Tips
- Configuration lives in `hugo.toml`. Keep secrets out of the repo; use environment vars if needed.
- When updating the theme, use the submodule: `git submodule update --remote --merge` and test locally.
