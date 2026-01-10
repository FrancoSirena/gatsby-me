# Gatsby to Astro Migration Guide

This document outlines the changes made during the migration from Gatsby to Astro.

## Overview

This project was successfully migrated from Gatsby 4 to Astro 4, resulting in:
- Simplified architecture
- Better performance
- Reduced bundle sizes
- Improved developer experience
- Faster build times

## Major Changes

### 1. Static Site Generator
- **Before**: Gatsby 4 with GraphQL data layer
- **After**: Astro 4 with Content Collections API

### 2. Content Management
- **Before**: Markdown files in `src/tech-posts/` queried via GraphQL
- **After**: Markdown files in `src/content/tech-posts/` using Astro Content Collections

### 3. Routing
- **Before**: `gatsby-node.js` creating pages programmatically
- **After**: File-based routing with `[...slug].astro` for dynamic blog posts

### 4. Components
- **Before**: React components with Gatsby-specific hooks (`useStaticQuery`, `graphql`)
- **After**: Astro components (`.astro` files) with minimal JavaScript

### 5. Images
- **Before**: `gatsby-image` and `gatsby-plugin-sharp` for optimized images
- **After**: Standard `<img>` tags with images in the `public/` folder

### 6. SEO
- **Before**: `react-helmet` for meta tags
- **After**: Meta tags directly in `Layout.astro` `<head>` section

### 7. Theme Switching
- **Before**: React Context API with `ThemeProvider`
- **After**: Inline scripts in `Layout.astro` for theme management

### 8. Syntax Highlighting
- **Before**: PrismJS via `gatsby-remark-prismjs`
- **After**: Shiki (built into Astro) with GitHub Dark theme

## File Structure Changes

### Removed Files
```
gatsby-config.js
gatsby-node.js
gatsby-browser.js
gatsby-ssr.js
jest-preprocess.js
loadershim.js
local-storage.js
src/pages/*.tsx (replaced with .astro)
src/components/*.tsx (replaced with .astro)
src/templates/post.tsx (replaced with [...slug].astro)
```

### New Files
```
astro.config.mjs
src/content/config.ts
src/pages/index.astro
src/pages/404.astro
src/pages/[...slug].astro
src/components/*.astro
src/layouts/Layout.astro
```

### Migrated Files
```
src/tech-posts/*.md → src/content/tech-posts/*.md
src/images/* → public/*
```

## Configuration Changes

### package.json Scripts
```json
// Before
"dev": "gatsby develop",
"build": "gatsby build",
"serve": "gatsby serve",

// After
"dev": "astro dev",
"build": "astro check && astro build",
"preview": "astro preview",
```

### Development Server
- **Before**: `http://localhost:8000`
- **After**: `http://localhost:4321`

### Build Output
- **Before**: `public/` directory
- **After**: `dist/` directory

## Dependencies

### Removed
- `gatsby` and all `gatsby-*` plugins
- `gatsby-image`
- `react-helmet`
- `axios` (was unused)
- `prismjs` (replaced by Shiki)

### Added
- `astro`
- `@astrojs/react` (for any React components if needed)
- `@astrojs/check` (for type checking)
- `prettier-plugin-astro`

### Kept
- `react` and `react-dom` (updated to v18)
- `typescript`
- `cypress` (e2e testing)
- Testing libraries

## Migration Steps

1. ✅ Created Astro configuration (`astro.config.mjs`)
2. ✅ Set up Content Collections (`src/content/config.ts`)
3. ✅ Migrated markdown posts to `src/content/tech-posts/`
4. ✅ Converted React pages to Astro pages
5. ✅ Converted React components to Astro components
6. ✅ Updated Layout with built-in SEO and theme handling
7. ✅ Created dynamic routing for blog posts (`[...slug].astro`)
8. ✅ Moved images to `public/` folder
9. ✅ Updated `package.json` dependencies and scripts
10. ✅ Updated Cypress configuration for new port
11. ✅ Removed Gatsby-specific files
12. ✅ Updated `.gitignore` for Astro
13. ✅ Updated README with new instructions

## Testing Considerations

### E2E Tests (Cypress)
- Updated `baseUrl` from `localhost:8000` to `localhost:4321`
- Tests may need adjustments based on changes in:
  - CSS classes
  - Data attributes
  - Component structure

### Unit Tests
- Old React component tests were removed
- Consider adding Astro component tests if needed

## Next Steps

1. **Install dependencies**: Run `npm install` or `yarn install`
2. **Start dev server**: Run `npm run dev`
3. **Review site locally**: Visit `http://localhost:4321`
4. **Run e2e tests**: Update test selectors if needed and run `npm run test:e2e`
5. **Build for production**: Run `npm run build`
6. **Preview production build**: Run `npm run preview`
7. **Update deployment**: Configure Netlify/Vercel to:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18+

## Benefits of Migration

1. **Performance**: Astro ships zero JavaScript by default, only hydrating interactive components
2. **Simplicity**: No GraphQL layer needed, simpler data fetching
3. **Flexibility**: Can still use React, Vue, Svelte, or other frameworks when needed
4. **Better DX**: Faster dev server, better error messages, cleaner code
5. **Modern**: Built with modern web standards and best practices

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Content Collections Guide](https://docs.astro.build/en/guides/content-collections/)
- [Astro vs Gatsby](https://docs.astro.build/en/guides/migrate-to-astro/from-gatsby/)
