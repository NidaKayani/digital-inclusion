# Digital Inclusion - Next.js Frontend

A modular Next.js application for the Digital Inclusion platform, designed to provide accessible education through an agentic system.

## Features

- **Modular Component Architecture**: Easy to debug and maintain
- **Progressive Web App (PWA)**: Offline capabilities and app-like experience
- **Responsive Design**: Works seamlessly on all devices
- **Agentic System**: Simulated AI agent for personalized learning
- **Modern UI**: Built with Tailwind CSS and Inter font

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with Inter font
│   └── page.tsx             # Main homepage
├── components/
│   ├── icons/
│   │   └── index.tsx        # Custom SVG icons
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Hero section
│   ├── FeatureSection.tsx   # Reusable feature sections
│   ├── MissionSection.tsx   # Mission and values section
│   ├── TeamSection.tsx      # Team members section
│   ├── Footer.tsx           # Footer component
│   ├── AgentStatus.tsx      # AI agent status indicator
│   └── index.ts             # Component exports
├── hooks/
│   └── usePWA.ts            # PWA registration hook
└── types/
    └── index.ts             # TypeScript type definitions
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Components

### Header

- Responsive navigation with hover effects
- Clean, modern design with Inter font
- Mobile-friendly menu structure

### Hero Section

- Gradient background with fade-in animation
- Compelling headline and description
- Responsive typography

### Feature Sections

- Modular design with reusable components
- Three main features: Low-bandwidth learning, Device-agnostic experience, Personalized learning
- Hover animations and responsive layouts

### Mission Section

- Company mission and values
- Icon-based feature highlights
- Clean, centered layout

### Team Section

- Team member cards with hover effects
- Responsive grid layout
- Placeholder images with color-coded borders

### Agent Status

- Simulated AI agent with learning plan
- Real-time status updates
- PWA integration

## PWA Features

- **Service Worker**: Offline caching and functionality
- **Manifest**: App-like installation experience
- **Responsive**: Works on all screen sizes
- **Fast Loading**: Optimized for low-connectivity environments

## Customization

### Adding New Components

1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Import and use in pages

### Styling

- Global styles in `src/app/globals.css`
- Component-specific styles using Tailwind CSS
- Custom animations and hover effects

### Types

- Add new interfaces in `src/types/index.ts`
- Import types where needed

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Custom SVG Icons**: Lightweight, dependency-free icons
- **Inter Font**: Modern, readable typography

## Development

The project is structured for easy debugging and maintenance:

- **Modular Components**: Each section is a separate, reusable component
- **Type Safety**: Full TypeScript support with proper interfaces
- **Clean Architecture**: Separation of concerns with hooks and types
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Deployment

The app is ready for deployment on platforms like Vercel, Netlify, or any static hosting service. The PWA features will work in production environments.
