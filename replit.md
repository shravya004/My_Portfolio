# Portfolio Application - System Architecture

## Overview

This is a full-stack portfolio application built with React and Express.js. It provides a professional portfolio website with an admin panel for content management. The application features a clean, modern design using Tailwind CSS and shadcn/ui components, with a robust backend API for managing portfolio data.

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
The application uses five main entities:
- **Users**: Personal information, bio, and profile images
- **Skills**: Technical skills with proficiency levels and icons
- **Projects**: Portfolio projects with images, descriptions, and technology stacks
- **Experiences**: Work experience with company details and technologies used
- **Contacts**: Contact form submissions from visitors

### API Endpoints
RESTful API structure:
- `GET/PUT /api/user` - User profile management
- `GET/POST/PUT/DELETE /api/skills` - Skills CRUD operations
- `GET/POST/PUT/DELETE /api/projects` - Projects CRUD operations
- `GET/POST/PUT/DELETE /api/experiences` - Experience CRUD operations
- `POST /api/contacts` - Contact form submission

### Frontend Pages
- **Home Page**: Complete portfolio showcase with all sections
- **Admin Page**: Content management interface
- **404 Page**: Error handling for invalid routes

### UI Sections
- **Hero Section**: Introduction with profile image and CTA
- **About Section**: Personal bio and additional image
- **Skills Section**: Technical skills with icons and proficiency
- **Projects Section**: Featured projects with links and technologies
- **Experience Section**: Work history timeline
- **Contact Section**: Contact form with validation
- **Footer**: Social links and copyright

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

### Admin Content Management
1. Admin panel provides CRUD operations for all content types
2. Modal dialogs for creating/editing content
3. Optimistic updates for better user experience
4. Form validation prevents invalid data submission

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

The architecture prioritizes developer experience with hot reloading, type safety, and modern tooling while maintaining a simple deployment model suitable for platforms like Replit.