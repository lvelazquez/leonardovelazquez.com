# leonardovelazquez.com

Professional portfolio site: a selection of projects, an about section and a contact form.
Live at [leonardovelazquez.com](https://leonardovelazquez.com).

![Portfolio work section](docs/screenshot.jpg)

## Stack

- Vue 3 (`<script setup>`, TypeScript strict) built with Vite
- Sass for component styles, CSS custom properties for design tokens (`src/styles/tokens.css`)
- Vitest + Vue Test Utils for tests, ESLint (flat config) + Prettier for linting
- A small Express server (`server/`) that serves the built site and delivers contact-form mail

Project images and the background video are hosted on Cloudinary (see `src/config.ts`).

## Requirements

Node 20.19 or newer (`.nvmrc` pins 22) and npm.

## Getting started

```sh
npm install
npm run dev          # Vite dev server on http://localhost:3000, proxies /api to :3001
npm run dev:server   # optional: contact-form API on http://localhost:3001
```

## Scripts

| Script                                | What it does                                       |
| ------------------------------------- | -------------------------------------------------- |
| `npm run dev`                         | Vite dev server with hot reload                    |
| `npm run build`                       | Type-check (`vue-tsc`) then production build to `dist/` |
| `npm run preview`                     | Serve the production build locally                 |
| `npm test` / `npm run test:watch`     | Run the Vitest suite once / in watch mode          |
| `npm run lint` / `npm run lint:fix`   | ESLint                                             |
| `npm run typecheck`                   | `vue-tsc --noEmit` over the app, server and tests  |
| `npm run format` / `format:check`     | Prettier                                           |
| `npm start`                           | Run the Express server (serves `dist/` + API)      |
| `npm run deploy`                      | Publish `dist/` to the `gh-pages` branch           |

CI is provided as a template, `docs/workflows/ci.yml` (lint, format check, typecheck, tests, build on Node 22 and 24). It lives in `docs/` only because the token used to prepare this branch could not create files under `.github/workflows/`; to enable it run `mkdir -p .github/workflows && git mv docs/workflows/*.yml .github/workflows/`.

## The `server/` directory

`server/index.ts` is an Express 5 app that:

- serves the built site from `dist/` (with gzip) and falls back to `index.html` so deep links such as `/work/wgl` load;
- exposes `POST /api/contact`, which validates the form (`server/contact.ts`, shared rules in `src/lib/validate.ts`) and sends the message to the site owner through Gmail SMTP using `nodemailer`.

Configure it with environment variables (copy `.env.example` to `.env`; `.env` is git-ignored):

| Variable     | Meaning                                                       |
| ------------ | ------------------------------------------------------------- |
| `GMAIL_USER` | Gmail address that sends and receives the messages             |
| `GMAIL_PASS` | A Google app password (not the account password)               |
| `PORT`       | Port to listen on, default `3001`                             |

Without credentials the endpoint answers `503` and the form shows the mailto fallback.

## Deploying

```sh
npm run build
npm start            # Express serves dist/ and the contact API; put it behind your host of choice
```

Static hosting also works, but without the Express server the contact form falls back to the
mailto link. `docs/workflows/deploy.yml` is a manual GitHub Pages deploy (set Pages source to
"GitHub Actions"); pass the public base path, `/` for a custom domain or `/leonardovelazquez.com/`
for the default project URL. The router is base-path aware (`BASE_PATH` at build time).

## Accessibility and motion

Skip link, landmarks, a single `h1`, labelled form fields, visible focus rings, keyboard-operable
carousel and menu, and AA color contrast in both light and dark (`prefers-color-scheme`) themes.
All animation reads duration and easing from named motion tokens and is disabled under
`prefers-reduced-motion` (the background video stays on its poster frame).
