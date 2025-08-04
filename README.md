# Museum Portal - Interactive Cultural Experience Platform

![Museum Portal](https://imgix.cosmicjs.com/71729400-7142-11f0-a051-23c10f41277a-photo-1598300042247-d088f8ab3a91-1754319063229.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive digital museum platform built with Next.js and powered by Cosmic. This modern website showcases exhibits, events, staff profiles, and informational pages to create an immersive cultural experience for museum visitors.

## ✨ Features

- **Interactive Exhibit Galleries** - Browse current, upcoming, and past exhibitions with detailed descriptions and image galleries
- **Event Management** - Comprehensive event listings with filtering by type (lectures, workshops, tours, special events)
- **Staff Directory** - Professional team profiles organized by department with contact information
- **Dynamic Content Pages** - Rich content management for museum information and visitor resources
- **Responsive Design** - Optimized experience across all devices
- **Search & Filter** - Advanced filtering capabilities for exhibits and events
- **Professional UI** - Museum-quality design with elegant typography and sophisticated layouts

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6890c7c79f3266af745d3a94&clone_repository=6890ca3c9f3266af745d3ab5)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website for a museum with exhibits, events, and more"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Content Management**: Cosmic Headless CMS
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Runtime**: Bun
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the museum content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables in `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Exhibits with Gallery Images
```typescript
const response = await cosmic.objects
  .find({ type: 'exhibits' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const exhibits = response.objects
```

### Filtering Events by Type
```typescript
const response = await cosmic.objects
  .find({ 
    type: 'events',
    'metadata.event_type': 'workshop' 
  })
  .depth(1)
```

### Getting Staff by Department
```typescript
const response = await cosmic.objects
  .find({ 
    type: 'staff',
    'metadata.department': 'education' 
  })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application integrates with four main content types in your Cosmic bucket:

- **Exhibits** (`exhibits`) - Art exhibitions with status, dates, locations, and image galleries
- **Events** (`events`) - Museum events with types, schedules, and registration details
- **Staff** (`staff`) - Team member profiles with departments, bios, and contact information
- **Pages** (`pages`) - Static content pages with navigation integration

The app uses the Cosmic SDK to fetch content server-side for optimal performance and SEO.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `out` (if using static export)
4. Add environment variables

### Other Platforms
This Next.js application can be deployed to any platform that supports Node.js applications.

<!-- README_END -->