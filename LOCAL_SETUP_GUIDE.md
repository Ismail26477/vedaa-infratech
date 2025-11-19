# Vedaa Infratech - Local Setup Guide

## 🚀 Quick Start

This is a complete, production-ready real estate website built with React, TypeScript, and Tailwind CSS. You can run it locally without any issues.

### Prerequisites
- **Node.js** 18.x or higher (Download from https://nodejs.org/)
- **npm** or **pnpm** (comes with Node.js)
- A code editor like VS Code

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

\`\`\`bash
npm install
# OR if you prefer pnpm
pnpm install
\`\`\`

This will install all required packages listed in `package.json`.

### Step 2: Run Development Server

\`\`\`bash
npm run dev
# OR
pnpm dev
\`\`\`

The website will be available at: **http://localhost:5173**

### Step 3: View in Browser

Open your browser and navigate to `http://localhost:5173`

---

## 📁 Project Structure

\`\`\`
vedaa-infratech/
├── public/                          # Static assets (images, logos)
│   ├── vedaa-realestate-logo.png   # Main logo (gold luxury house)
│   ├── placeholder.svg             # Placeholder images
│   └── ...other icons
├── src/                             # React source code
│   ├── components/                 # React components
│   │   ├── Header.tsx              # Top navigation
│   │   ├── Footer.tsx              # Bottom section with contact
│   │   ├── Hero.tsx                # Landing banner
│   │   ├── About.tsx               # About section
│   │   ├── Services.tsx            # Services section
│   │   ├── Properties.tsx          # Properties listing
│   │   ├── Contact.tsx             # Contact form
│   │   ├── WhyChooseUs.tsx         # Why choose section
│   │   ├── WhatsAppCTA.tsx         # WhatsApp button
│   │   └── AuthModal.tsx           # Authentication modal
│   ├── lib/                        # Utilities
│   │   ├── supabase/              # Database configuration (optional)
│   │   └── userStore.ts           # User state management
│   ├── hooks/                      # Custom React hooks
│   │   └── useInView.ts           # Intersection observer hook
│   ├── index.css                   # Global styles
│   └── main.tsx                    # React entry point
├── app/                            # Next.js (if running as Next.js)
├── components/ui/                  # shadcn/ui components (optional)
├── package.json                    # Project dependencies & scripts
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite build configuration
└── README.md                       # This file
\`\`\`

---

## 🛠 Available Commands

\`\`\`bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Type checking
npm run typecheck
\`\`\`

---

## 🎨 Logo & Branding

Your beautiful gold luxury real estate logo is included:
- **Location**: `public/vedaa-realestate-logo.png`
- **Used in**: Header and Footer (prominently displayed)
- **Style**: Two house silhouettes with "LOCAL.RELIABLE.REAL" tagline

The logo is already integrated into:
- ✅ Header (top left, navigation)
- ✅ Footer (bottom left, company info)

---

## 📱 Features

- ✨ Responsive design (mobile, tablet, desktop)
- 🎯 Smooth scrolling navigation
- 🏠 Property listings with filtering
- 📧 Contact form
- 🔐 User authentication (Supabase - optional)
- 💬 WhatsApp CTA button
- 🎨 Beautiful UI with Tailwind CSS
- 📊 Multi-location support (India, Dubai, Australia)

---

## 🚀 Building for Production

To create an optimized production build:

\`\`\`bash
npm run build
npm run preview
\`\`\`

The built files will be in the `dist/` folder.

---

## 📝 Customization

### Change Tagline
Edit in `src/components/Header.tsx` and `src/components/Footer.tsx`:
\`\`\`tsx
<p className="text-xs text-amber-400">Local, Reliable, Real</p>
\`\`\`

### Change Colors
Edit `tailwind.config.ts` or `src/index.css` to modify the color scheme.

### Add/Remove Sections
- Add new components in `src/components/`
- Import them in `src/App.tsx` or `app/page.tsx`
- Update navigation links as needed

### Update Contact Information
Edit `src/components/Footer.tsx`:
- Phone numbers
- Email address
- Physical address

---

## 🔧 Troubleshooting

**Port 5173 already in use?**
\`\`\`bash
npm run dev -- --port 3000
\`\`\`

**Dependencies not installing?**
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

**Tailwind styles not showing?**
The styles are already configured. Just run `npm run dev` and refresh the browser.

**Images not loading?**
Make sure the image files are in the `public/` folder. The logo should be at `public/vedaa-realestate-logo.png`.

---

## 📞 Support

If you have issues:
1. Check that Node.js is installed: `node --version`
2. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
3. Make sure you're in the correct project directory
4. Check the vite.config.ts and tailwind.config.ts are present

---

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Run `npm run dev`
3. ✅ Open browser to http://localhost:5173
4. ✅ Edit files in `src/components/` to customize
5. ✅ Build for production with `npm run build`

Enjoy your real estate website! 🏡

---

*Generated for Vedaa Infratech - Local, Reliable, Real*
