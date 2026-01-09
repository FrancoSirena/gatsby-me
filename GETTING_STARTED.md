# Getting Started with Your Astro Blog

Your Gatsby blog has been successfully migrated to Astro! 🚀

## Quick Start

### 1. Install Dependencies

First, you'll need to install the new dependencies:

```bash
# Remove old node_modules and lock files (optional but recommended)
rm -rf node_modules yarn.lock

# Install new dependencies
yarn install
# or
npm install
```

### 2. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Your site will be available at: **http://localhost:4321**

### 3. Verify the Migration

Check the following:

- ✅ Homepage displays correctly with your intro and post list
- ✅ Blog posts are accessible via their URLs
- ✅ Theme toggle works (dark/light mode)
- ✅ Navigation between posts works (previous/next)
- ✅ Footer with social links displays correctly
- ✅ All CSS styles are applied

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at localhost:4321 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run test:e2e` | Run Cypress e2e tests |

## Project Structure

```
/
├── public/              # Static assets (images, favicon)
├── src/
│   ├── components/      # Astro components
│   ├── content/         # Blog posts and content collections
│   │   └── tech-posts/  # Your blog posts (markdown)
│   ├── css/            # Stylesheets
│   ├── layouts/        # Page layouts
│   ├── pages/          # Routes (file-based routing)
│   └── types/          # TypeScript type definitions
├── astro.config.mjs    # Astro configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Adding New Blog Posts

1. Create a new `.md` file in `src/content/tech-posts/`
2. Add frontmatter at the top:

```markdown
---
permalink: "/tech-notes/your-post-slug"
date: "2026-01-08"
title: "Your Post Title"
summary: "A brief summary of your post"
---

Your content here...
```

3. The post will automatically appear on the homepage and be accessible at the slug URL

## Deployment

### Netlify

If you're deploying to Netlify, update your build settings:

1. **Build command**: `npm run build`
2. **Publish directory**: `dist`
3. **Node version**: 18 or higher

You can set the Node version in `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### Vercel

For Vercel:

1. **Framework Preset**: Astro
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`

## Troubleshooting

### Port Already in Use

If port 4321 is already in use, you can specify a different port:

```bash
npm run dev -- --port 3000
```

### TypeScript Errors

Run type checking to see any issues:

```bash
npm run type-check
```

### Build Errors

If you encounter build errors:

1. Clear the Astro cache: `rm -rf .astro`
2. Remove node_modules: `rm -rf node_modules`
3. Reinstall: `npm install`
4. Try building again: `npm run build`

### Styles Not Loading

Make sure all CSS files are imported in your components or layout files. The main styles are imported in `Layout.astro`.

## Key Differences from Gatsby

1. **No GraphQL**: Content is accessed directly via the Content Collections API
2. **File-based routing**: Pages in `src/pages/` automatically become routes
3. **Zero JS by default**: Astro ships no JavaScript unless needed
4. **Simpler data fetching**: No need for complex queries
5. **Faster dev server**: Astro's dev server is significantly faster

## Next Steps

1. ✅ Test all pages and functionality locally
2. ✅ Update Cypress tests if needed (some selectors might have changed)
3. ✅ Review and update any custom styles
4. ✅ Test the production build (`npm run build` then `npm run preview`)
5. ✅ Deploy to your hosting platform
6. ✅ Update any CI/CD pipelines for the new build process

## Need Help?

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- Check `MIGRATION.md` for detailed migration notes

---

Happy blogging with Astro! 🎉
