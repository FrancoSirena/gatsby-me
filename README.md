
[![Netlify Status](https://api.netlify.com/api/v1/badges/cb4401b8-51f4-4a93-87cb-64616d9cacb5/deploy-status)](https://app.netlify.com/sites/upbeat-bohr-4a3681/deploys)

# My Personal Blog

[francosirena.DEV](https://francosirena.dev)

This is my personal blog in which I write tech posts or just tech notes from time to time. The main purpose here is to keep my findings public and to serve as a "reference" for times when I find myself troubling to remember about something.

I am a Staff Software Engineer, mostly focused on Frontend development but not limited to it.

## Tech Stack

This project was built using:
- `Astro` for the static site generation
- `React` for interactive components
- `TypeScript` for type safety
- `Cypress` for e2e testing
- Automation is taken care of by `GitHub Actions`

### Astro

This blog is built with Astro, a modern static site generator that delivers exceptional performance. Key features include:
- **Content Collections**: Blog posts are managed using Astro's content collections API
- **Markdown Support**: Posts are written in Markdown with frontmatter
- **Syntax Highlighting**: Code snippets are styled using Shiki with GitHub Dark theme
- **SEO Optimized**: Built-in meta tags and sitemap generation
- **React Integration**: Interactive components when needed via `@astrojs/react`

### TypeScript

The project uses TypeScript throughout for type safety and better developer experience. Check the `tsconfig.json` file for the configuration details.

### Development

#### Commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro`        | Run CLI commands like `astro add`, `astro check` |
| `npm run format`       | Format code with Prettier                        |
| `npm run type-check`   | Run TypeScript type checking                     |
| `npm run test:e2e`     | Run Cypress e2e tests                           |

#### Project Structure

```
/
├── public/
│   ├── icon.png
│   └── me.png
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Posts.astro
│   │   └── ...
│   ├── content/
│   │   ├── config.ts
│   │   └── tech-posts/
│   │       └── *.md
│   ├── css/
│   │   └── *.css
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   └── [...slug].astro
│   └── types/
│       └── *.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

- `src/content/tech-posts/`: Blog posts in Markdown format
- `src/pages/`: File-based routing (index.astro = homepage, [...slug].astro = dynamic blog post pages)
- `src/components/`: Reusable Astro and React components
- `src/layouts/`: Page layouts
- `public/`: Static assets

## 💫 Deployment

This site is deployed on [Netlify](https://app.netlify.com/).

## Migration Notes

This project was originally built with Gatsby and has been migrated to Astro for better performance, simpler architecture, and improved developer experience.

Powered by [Astro](https://astro.build)
