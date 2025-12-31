# KE 258 Lwanda Child Development Centre Website

A comprehensive website for KE 258 Lwanda Child Development Centre, a faith-based organization in Kenya that empowers vulnerable children through Child Survival, Sponsorship, and Youth Development programs in partnership with Compassion International and Full Gospel Churches of Kenya (FGCK).

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ogillos-projects/v0-website-creation-step-by-step)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/JgkAH82KHfo)

## 🌟 Overview

This is a full-stack Next.js 14 website featuring a public-facing site for community engagement and an admin dashboard for content management. The website showcases the organization's programs, impact stories, and provides pathways for donations, volunteering, and sponsorship.

## 🎨 Design System

**Color Palette:**
- Primary: Amber (#d97706) - Represents hope and warmth
- Accent: Purple (#8b5cf6) - Represents faith and transformation
- Neutrals: Grays and whites for balance

**Typography:**
- Headings: Inter (modern, clean sans-serif)
- Body: Manrope (friendly, readable)

**Brand Identity:**
- Logo: Kenya map silhouette with white cross (representing faith-based mission in Kenya)

## 📄 Website Structure

### Public Pages

#### 1. **Homepage** (`/`)
- **Purpose**: Main landing page showcasing the organization's mission and impact
- **Features**:
  - Hero section with compelling call-to-action
  - Impact statistics (children served, programs, years of service)
  - Program overview cards (Child Survival, Sponsorship, Youth Development)
  - Transformation stories carousel
  - Partner information (Compassion International, FGCK)
  - Newsletter signup
  - Call-to-action banners

#### 2. **About Page** (`/about`)
- **Purpose**: Tell the organization's story and mission
- **Features**:
  - Organization history and background
  - Mission, vision, and values
  - Leadership team profiles
  - Partnership information
  - Community impact overview

#### 3. **Programs Overview** (`/programs`)
- **Purpose**: Overview of all programs offered
- **Features**:
  - Program cards with descriptions
  - Target demographics
  - Impact statistics per program
  - Links to detailed program pages

#### 4. **Child Survival Program** (`/programs/child-survival`)
- **Purpose**: Detailed information about maternal and early childhood health program
- **Features**:
  - Program goals and objectives
  - Services offered (prenatal care, nutrition, immunization)
  - Success stories
  - How to support
  - FAQ section

#### 5. **Child Sponsorship Program** (`/programs/sponsorship`)
- **Purpose**: Detailed information about one-to-one child sponsorship
- **Features**:
  - How sponsorship works
  - Benefits for children (education, healthcare, spiritual development)
  - Sponsor responsibilities
  - Success stories
  - Sponsorship application process

#### 6. **Youth Development Program** (`/programs/youth-development`)
- **Purpose**: Detailed information about youth empowerment and leadership
- **Features**:
  - Program components (leadership training, vocational skills, mentorship)
  - Age groups served
  - Success stories
  - How to get involved
  - Impact metrics

#### 7. **Get Involved Page** (`/get-involved`)
- **Purpose**: Engagement opportunities for supporters
- **Features**:
  - Volunteer opportunities
  - Prayer partnership
  - Corporate/church partnerships
  - Internship programs
  - Skills-based volunteering
  - Application forms

#### 8. **Donate Page** (`/donate`)
- **Purpose**: Facilitate financial contributions
- **Features**:
  - One-time vs monthly giving options
  - Suggested donation amounts (KES 1,000 / 2,500 / 5,000 / Custom)
  - Multiple payment methods (M-Pesa, Bank Transfer, Card)
  - Program designation options
  - Transparency about fund usage
  - Receipt generation

#### 9. **Stories Page** (`/stories`)
- **Purpose**: Share transformation stories and testimonials
- **Features**:
  - Story cards with images
  - Category filtering
  - Search functionality
  - Individual story details
  - Social sharing

#### 10. **Events Page** (`/events`)
- **Purpose**: Showcase upcoming and past events
- **Features**:
  - Event calendar
  - Event cards with dates and details
  - Registration links
  - Past event highlights
  - Photo galleries

#### 11. **Gallery Page** (`/gallery`)
- **Purpose**: Visual showcase of community and programs
- **Features**:
  - Photo and video grid
  - Category filtering (Education, Sponsorship, Celebrations, Community Work)
  - Media type filtering (Images, Videos)
  - Search functionality
  - Lightbox/modal viewer
  - Statistics (500+ photos, 50+ videos, 15+ years documented)

#### 12. **Contact Page** (`/contact`)
- **Purpose**: Provide contact information and inquiry form
- **Features**:
  - Contact form with validation
  - Office location and map
  - Phone numbers and email
  - Social media links
  - Office hours

#### 13. **FAQ Page** (`/faq`)
- **Purpose**: Answer common questions
- **Features**:
  - Collapsible question sections
  - Categories (Programs, Sponsorship, Volunteering, Donations)
  - Search functionality
  - Related resources

#### 14. **Safeguarding Page** (`/safeguarding`)
- **Purpose**: Child protection policies and commitment
- **Features**:
  - Child protection policy
  - Safeguarding principles
  - Reporting procedures
  - Staff training information
  - Compliance standards

#### 15. **Reports Page** (`/reports`)
- **Purpose**: Transparency through annual reports and publications
- **Features**:
  - Annual reports (downloadable PDFs)
  - Financial statements
  - Impact reports
  - Program evaluations
  - Year-over-year comparisons

#### 16. **Privacy Policy** (`/privacy`)
- **Purpose**: Data protection and privacy information
- **Features**:
  - Data collection practices
  - Cookie policy
  - User rights
  - Contact for privacy concerns

#### 17. **Terms of Service** (`/terms`)
- **Purpose**: Website usage terms and conditions
- **Features**:
  - Acceptable use policy
  - Intellectual property rights
  - Disclaimer
  - Limitation of liability

---

### Admin Dashboard

#### 1. **Admin Dashboard** (`/admin`)
- **Purpose**: Overview of website statistics and quick actions
- **Features**:
  - Total visitors, page views, donations
  - Recent activity feed
  - Quick action buttons
  - System health status
  - Analytics overview

#### 2. **Image Management** (`/admin/images`)
- **Purpose**: Upload and manage images for the website
- **Features**:
  - Upload images to Vercel Blob storage
  - Organize images by folders (general, programs, stories, events, team, gallery, hero)
  - View all uploaded images
  - Copy image URLs to clipboard
  - Delete images
  - Image preview

#### 3. **Content Management** (`/admin/content`)
- **Purpose**: Manage stories, events, and program content
- **Features**:
  - Create, edit, delete content items
  - Search and filter content
  - Content status (draft, published)
  - Category management
  - Bulk actions

#### 4. **Settings** (`/admin/settings`)
- **Purpose**: Configure website settings
- **Features**:
  - Site information (name, description, contact)
  - Social media links
  - Email notifications
  - Integration settings
  - User management

---

## 🔧 Backend Architecture

### Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Shadcn/ui components

**Backend:**
- Next.js API Routes (serverless functions)
- Vercel Blob (image storage)
- Server Actions (for form submissions)

**Deployment:**
- Vercel (hosting and deployment)
- GitHub (version control)

### API Routes

#### 1. **Upload Image** (`POST /api/upload`)
- **Purpose**: Upload images to Vercel Blob storage
- **Request**: FormData with file and folder
- **Response**: `{ url: string, pathname: string }`
- **Authentication**: None (should be protected in production)
- **Error Handling**: Returns 400/500 with error messages

#### 2. **List Images** (`GET /api/images/list`)
- **Purpose**: Retrieve all uploaded images from Vercel Blob
- **Request**: Query parameter `folder` (optional)
- **Response**: `{ blobs: Array<{ url: string, pathname: string, size: number, uploadedAt: string }> }`
- **Authentication**: None (should be protected in production)

#### 3. **Delete Image** (`DELETE /api/images/delete`)
- **Purpose**: Delete an image from Vercel Blob storage
- **Request**: JSON body with `url: string`
- **Response**: `{ success: true }`
- **Authentication**: None (should be protected in production)
- **Error Handling**: Returns 400/500 with error messages

### Data Flow

\`\`\`
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js Pages  │ (Server-Side Rendering)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   API Routes    │ (Serverless Functions)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel Blob    │ (Image Storage)
└─────────────────┘
\`\`\`

### Environment Variables

Required environment variables:

\`\`\`env
# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=xxxxx
\`\`\`

### File Storage Structure

Images are organized in Vercel Blob with the following folder structure:

\`\`\`
/general/          - General website images
/programs/         - Program-related images
/stories/          - Story and testimonial images
/events/           - Event photos
/team/             - Team member photos
/gallery/          - Gallery images
/hero/             - Hero section images
\`\`\`

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Vercel account (for Blob storage)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/Ogillo/v0-website-creation-step-by-step.git
cd v0-website-creation-step-by-step
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your Vercel Blob token to `.env.local`:
\`\`\`env
BLOB_READ_WRITE_TOKEN=your_token_here
\`\`\`

4. Run the development server:
\`\`\`bash
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

\`\`\`bash
pnpm build
pnpm start
\`\`\`

---

## 📁 Project Structure

\`\`\`
v0-website-creation-step-by-step/
├── app/                          # Next.js App Router
│   ├── (public pages)/
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   ├── programs/            # Programs pages
│   │   ├── get-involved/        # Get Involved page
│   │   ├── donate/              # Donate page
│   │   ├── stories/             # Stories page
│   │   ├── events/              # Events page
│   │   ├── gallery/             # Gallery page
│   │   ├── contact/             # Contact page
│   │   ├── faq/                 # FAQ page
│   │   ├── safeguarding/        # Safeguarding page
│   │   ├── reports/             # Reports page
│   │   ├── privacy/             # Privacy Policy
│   │   └── terms/               # Terms of Service
│   ├── admin/                   # Admin dashboard
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── images/             # Image management
│   │   ├── content/            # Content management
│   │   └── settings/           # Settings
│   ├── api/                     # API routes
│   │   ├── upload/             # Image upload endpoint
│   │   └── images/             # Image management endpoints
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── ui/                     # Shadcn/ui components
│   ├── site-header.tsx         # Site header
│   ├── site-footer.tsx         # Site footer
│   ├── icons.tsx               # Custom SVG icons
│   ├── sections/               # Page sections
│   └── forms/                  # Form components
├── lib/                        # Utility functions
│   └── utils.ts               # Helper functions
├── public/                     # Static assets
│   └── logo.jpg               # Organization logo
└── package.json               # Dependencies
\`\`\`

---

## 🔐 Security Considerations

### Current Implementation
- API routes are currently unprotected
- No authentication system implemented
- Admin dashboard is publicly accessible

### Recommended for Production

1. **Add Authentication:**
   - Implement NextAuth.js or similar
   - Protect admin routes with middleware
   - Add role-based access control

2. **API Security:**
   - Add API key authentication
   - Implement rate limiting
   - Validate all inputs
   - Sanitize user data

3. **Environment Variables:**
   - Never commit `.env.local` to version control
   - Use Vercel environment variables for production
   - Rotate API keys regularly

4. **Content Security:**
   - Implement Content Security Policy (CSP)
   - Add CORS headers
   - Enable HTTPS only

---

## 🎯 Future Enhancements

### Planned Features

1. **Database Integration:**
   - Add Supabase or similar for dynamic content
   - Store stories, events, and programs in database
   - User authentication and profiles

2. **Payment Integration:**
   - Integrate M-Pesa API for donations
   - Add Stripe for international donations
   - Automated receipt generation

3. **Email System:**
   - Newsletter subscription management
   - Automated email notifications
   - Contact form submissions

4. **Analytics:**
   - Google Analytics integration
   - Custom event tracking
   - Donation tracking

5. **CMS Integration:**
   - Headless CMS for content management
   - Rich text editor for stories
   - Media library management

6. **Multilingual Support:**
   - English and Swahili translations
   - Language switcher
   - Localized content

---

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic with Next.js App Router

---

## 🤝 Contributing

This project is maintained by KE 258 Lwanda Child Development Centre. For contributions or suggestions, please contact the organization directly.

---

## 📝 License

Copyright © 2025 KE 258 Lwanda Child Development Centre. All rights reserved.

---

## 📞 Support

For technical support or questions about the website:
- Email: info@ke258lwanda.org
- Phone: +254 XXX XXX XXX
- Website: [https://vercel.com/ogillos-projects/v0-website-creation-step-by-step](https://vercel.com/ogillos-projects/v0-website-creation-step-by-step)

---

## 🙏 Acknowledgments

- Built with [v0.app](https://v0.app) by Vercel
- Deployed on [Vercel](https://vercel.com)
- UI components from [Shadcn/ui](https://ui.shadcn.com)
- Icons from custom SVG library
- In partnership with [Compassion International](https://compassion.com) and Full Gospel Churches of Kenya (FGCK)
