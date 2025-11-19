# Vedaa Infratech - Local Development Setup

## Prerequisites

- Node.js 16+ (recommended: Node.js 18 or higher)
- npm or yarn package manager

## Step-by-Step Installation

### 1. Extract the ZIP file
\`\`\`bash
unzip vedaa-infratech.zip
cd vedaa-infratech
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

If you encounter any issues, try cleaning the cache first:
\`\`\`bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
\`\`\`

### 3. Start development server
\`\`\`bash
npm run dev
\`\`\`

The website will open at `http://localhost:5173` (Vite default port)

### 4. Build for production
\`\`\`bash
npm run build
\`\`\`

This creates an optimized build in the `dist/` folder.

## Project Structure

\`\`\`
vedaa-infratech/
├── src/
│   ├── components/          # All React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Properties.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppCTA.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities and helpers
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles (Tailwind)
├── public/                 # Static assets
│   └── vedaa-realestate-logo.png
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
└── vite.config.ts          # Vite config
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Check TypeScript types

## Technology Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool and dev server
- **Lucide React** - Icons

## Troubleshooting

### Port 5173 already in use
\`\`\`bash
npm run dev -- --port 3000
\`\`\`

### CSS not loading
1. Clear browser cache: `Ctrl+Shift+Delete` (Ctrl+Cmd+Delete on Mac)
2. Hard refresh: `Ctrl+Shift+R` (Cmd+Shift+R on Mac)

### Components not showing
1. Check browser console for errors
2. Verify all image paths point to `/vedaa-realestate-logo.png`
3. Ensure `node_modules` is installed: `npm install`

### Build errors
\`\`\`bash
rm -rf node_modules dist
npm install
npm run build
\`\`\`

## Features

- Responsive design (mobile, tablet, desktop)
- Smooth scroll navigation
- Image carousel/slider
- Contact form
- Property listings with filtering
- Mobile-friendly hamburger menu
- WhatsApp integration
- Modern UI with animations

## Customization

### Change Colors
Edit `tailwind.config.ts` to modify the color theme.

### Update Content
All text content is in the component files in `src/components/`.

### Add New Sections
Create new component file in `src/components/` and import it in `src/App.tsx`.

## Performance Tips

- Images are optimized for web
- Lazy loading for images
- CSS is minified in production build
- JavaScript is tree-shaken for smaller bundle size

## Need Help?

1. Check browser console for error messages
2. Verify Node.js version: `node --version`
3. Clear npm cache: `npm cache clean --force`
4. Reinstall dependencies: `rm -rf node_modules && npm install`

## Deployment

The `dist/` folder (created after `npm run build`) can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Simply upload the contents of the `dist/` folder to your hosting service.

Happy coding!
