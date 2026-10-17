# Blog

Posts and pages in Markdown, rendered as a static site with [Astro](https://astro.build/), then published to GitHub Pages.

The planned address is [https://axelbattigelli.github.io/Blog/](https://axelbattigelli.github.io/Blog/). The address and path are set in `src/config.ts` (`url` and `base`).

## Locally

```sh
npm install
npm run dev
```

The dev server is at `http://localhost:4321/Blog/`.

```sh
npm run build
npm run preview
```

## Add a post

Create a file in `src/content/posts/`:

```md
---
title: My post
description: One sentence for lists and search.
date: 2026-10-08
category: Notes
pinned: false
draft: false
---

The text, in Markdown.
```

`pinned: true` puts the post in the Pinned section on the home page. Recent posts shows three others, and the Posts page stays sorted by date. `draft: true` keeps the post off the site.

An image sits next to the file, or in a subfolder, and is inserted like this:

```md
![Image description](./images/photo.jpg)
```

Internal links are written from the site root, for example `[a page](/about/)`. The `/Blog` prefix is added at build time.

## Add a page

Create a file in `src/content/pages/`:

```md
---
title: Legal notice
description: Legal information.
order: 3
---

Page text.
```

The page is added to the menu, in `order`. `nav: false` leaves it reachable without showing it in the menu. `navTitle` overrides the menu label when it should differ from `title`.

File names `posts` and `categories` are reserved.

## Categories

The category is the post's `category` field. The page `/categories/notes/` groups everything filed under `Notes`. Accents and capitals are ignored in the address.

### Which categories exist ?

- Notes (Post-its for myself or the world)
- Life (A fact in my life)
- Reflections (Comments on an event, tech, or product)
- Anecdotes (Something that happened to me)
- Aether (Organization developing a browser)
- Freelance (My experience as a freelancer)
- Projects (Ongoing or completed projects)

## Publishing

The workflow `.github/workflows/pages.yml` builds the site on every push to `main` and deploys it to GitHub Pages.

Once, in the GitHub repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
