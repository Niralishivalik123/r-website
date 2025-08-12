# R Website

A modern real estate platform built with Next.js, featuring a unified ID system and comprehensive real estate universe.

## Features

- **Modern Design**: Built with Material 3 design principles
- **Typography**: Uses Bricolage Grotesque font family
- **Color Scheme**: Black, white, and gray color palette with green accents
- **Responsive**: Fully responsive design for all devices
- **TypeScript**: Built with TypeScript for type safety

## Design System

### Colors
- **Primary**: Black (#000000)
- **Secondary**: Gray (#666666)
- **Accent**: Light Gray (#999999)
- **Surface**: Light Gray (#f5f5f5)
- **Success**: Green (#4CAF50)

### Typography
- **Font Family**: Bricolage Grotesque
- **Weights**: Regular, Medium, Semibold, Bold

### Components

#### Header Component
- Clean, minimalist header with R logo
- Login button with Material 3 styling
- Responsive design

#### Home Banner Section
- "One ID. One system. One real estate universe." messaging
- Abstract city skyline graphic with green dots
- Material 3 card design with elevation shadows

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   └── home/
│   │       └── HomeBannerSection.tsx
│   ├── types/
│   │   └── homeTypes/
│   │       └── homeBannerSectionsTypes.ts
│   ├── utils/
│   │   └── constant/
│   │       └── homeConstant/
│   │           └── homeBannerSectionsConstant.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
└── public/
    └── r-logo.png
```

## Technologies Used

- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Material 3**: Design system principles

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
