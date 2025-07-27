# Portfolio Application - System Architecture

## Overview

This is a minimalistic portfolio application built with React and Express.js, featuring a clean design with muted colors inspired by modern portfolio examples. It provides a professional portfolio website showcasing Shravya Atreya's Computer Science background. The application features smooth scrolling navigation, floating animations, and social links in the top navigation. All content is permanently populated from Shravya's resume data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between client and server
- **Development**: Hot module replacement via Vite integration

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definitions in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations
- **Storage Interface**: Abstracted storage layer with in-memory fallback

## Key Components

### Database Schema
The application uses six main entities:
- **Users**: Personal information, bio, and social media links (LinkedIn, GitHub, Twitter)
- **Skills**: Technical skills with proficiency levels and icons (updated to specific technologies)
- **Projects**: Portfolio projects with images, descriptions, and technology stacks
- **Experiences**: Work experience with company details and technologies used
- **Certifications**: Professional certifications with issuer, date, and credential URLs
- **Contacts**: Contact form submissions from visitors

### API Endpoints
RESTful API structure:
- `GET/PUT /api/user` - User profile management
- `GET/POST/PUT/DELETE /api/skills` - Skills CRUD operations
- `GET/POST/PUT/DELETE /api/projects` - Projects CRUD operations
- `GET/POST/PUT/DELETE /api/experiences` - Experience CRUD operations
- `GET/POST/PUT/DELETE /api/certifications` - Certifications CRUD operations
- `POST /api/contacts` - Contact form submission

### Frontend Pages
- **Home Page**: Complete portfolio showcase with all sections
- **404 Page**: Error handling for invalid routes

### UI Sections
- **Hero Section**: Clean introduction with name, title, and floating tech icons
- **About Section**: Centered personal bio without images
- **Skills Section**: Interactive tech skills display (Python, C, C++, Java, JavaScript, HTML/CSS, ReactJS, Flask, TensorFlow)
- **Projects Section**: Featured projects with links and technologies
- **Experience Section**: Work history timeline (renamed from "Work Experience")
- **Certifications Section**: Professional certifications with issuer details and credential links
- **Contact Section**: Contact form with validation
- **Footer**: Simple copyright footer (updated to 2025)
- **Navigation**: Top navigation with social media icons (LinkedIn, GitHub, Twitter)

## Data Flow

### Client-Server Communication
1. React components use TanStack Query hooks for data fetching
2. Custom `apiRequest` function handles HTTP requests with error handling
3. Shared Zod schemas ensure type safety between client and server
4. Real-time updates via query invalidation after mutations

### Form Handling
1. React Hook Form manages form state and validation
2. Zod resolvers provide runtime validation
3. Form submissions trigger API mutations
4. Success/error feedback via toast notifications

### Static Content Management
1. All content is permanently populated from Shravya Atreya's resume
2. Real project data: PhishGuard (phishing detection tool) and PitchPerfectAI (cover letter generator)
3. Authentic experience data: Research intern at VIT Chennai, Infosys intern, leadership roles
4. Verified certifications: Google Cloud, Postman API, Infosys AI certifications

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Icons**: Additional icons (Simple Icons)
- **Class Variance Authority**: Component variant management

### Data and Validation
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Runtime type validation
- **TanStack Query**: Server state management
- **React Hook Form**: Form library

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Build Process
1. Frontend builds to `dist/public` directory
2. Backend bundles to `dist/index.js` with external packages
3. Single deployment artifact with embedded static files

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Development/production mode switching
- Automatic database provisioning check

### Development Workflow
1. `npm run dev` starts development server with HMR
2. `npm run build` creates production build
3. `npm run start` runs production server
4. `npm run db:push` applies schema changes

## Recent Changes (January 2025)

✓ Removed profile images from hero and about sections for cleaner design
✓ Renamed "Work Experience" to "Experience" throughout the application
✓ Moved social media icons (LinkedIn, GitHub, Twitter) to top navigation
✓ Added editable social media links in admin panel profile section
✓ Updated schema to include social media URLs (linkedinUrl, githubUrl, twitterUrl)
✓ Simplified footer to only show copyright information (updated to 2025)
✓ Centered about section content without side image
✓ Added Certifications section with full CRUD functionality
✓ Updated Skills section to show specific technologies interactively
✓ Updated About section with personalized Computer Science student bio
✓ Removed proficiency percentage bars from skills display
✓ Added interactive hover effects for skill icons
✓ Removed admin panel entirely and populated with real resume data
✓ Added authentic projects: PhishGuard and PitchPerfectAI from resume
✓ Added real experiences: VIT Chennai research intern, Infosys intern, club leadership
✓ Added verified certifications: Google Cloud, Postman API, Infosys AI certifications
✓ Updated personal information: Shravya Atreya, B.Tech CSE Student at VIT Chennai

The architecture prioritizes developer experience with hot reloading, type safety, and modern tooling while maintaining a simple deployment model suitable for platforms like Replit.