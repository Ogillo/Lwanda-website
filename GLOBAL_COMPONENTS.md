# KE 258 Lwanda CYDC - Global Components Library

## Step 4 - Global Components & Design System

### Component Library Overview

This design system provides a comprehensive set of reusable components that maintain consistency across the KE 258 website while supporting the organization's mission and brand values.

### Navigation Components

#### SiteHeader
- **Purpose:** Primary navigation with sticky positioning
- **Features:** 
  - Responsive design with mobile hamburger menu
  - Programs dropdown for desktop
  - Prominent donate button
  - Logo with organization branding
- **Props:** None (uses internal state for menu toggles)

#### SiteFooter
- **Purpose:** Site-wide footer with comprehensive links and information
- **Features:**
  - Partnership badges for Compassion International and FGCK
  - Social media links
  - Contact information with placeholders
  - Quick navigation links
  - Legal/policy links

### Content Cards

#### ProgramCard
- **Purpose:** Showcase individual programs with consistent formatting
- **Props:**
  - `title`: Program name
  - `description`: Brief program description
  - `href`: Link to program detail page
  - `icon`: Optional icon component
  - `stats`: Optional statistics display

#### StoryCard
- **Purpose:** Display impact stories and news articles
- **Props:**
  - `title`: Story headline
  - `excerpt`: Brief story summary
  - `href`: Link to full story
  - `date`: Publication date
  - `author`: Optional author name
  - `imageUrl`: Optional featured image
  - `category`: Optional category tag

#### StatCard
- **Purpose:** Highlight key statistics and impact metrics
- **Props:**
  - `value`: Numeric value or key metric
  - `label`: Descriptive label
  - `description`: Optional additional context
  - `icon`: Optional icon component

### Section Components

#### HeroSection
- **Purpose:** Primary page headers with call-to-action
- **Props:**
  - `title`: Main headline
  - `subtitle`: Supporting text
  - `description`: Optional detailed description
  - `primaryCta`: Primary call-to-action button
  - `secondaryCta`: Optional secondary button
  - `backgroundImage`: Optional background image

#### CtaBanner
- **Purpose:** Conversion-focused sections throughout the site
- **Props:**
  - `title`: Banner headline
  - `description`: Supporting text
  - `primaryCta`: Primary action button
  - `secondaryCta`: Optional secondary button
  - `variant`: Styling variant (default, primary, secondary)

### Form Components

#### NewsletterSignup
- **Purpose:** Email collection for ongoing engagement
- **Features:**
  - Email validation
  - Success state handling
  - Privacy notice
  - Responsive design

### Design System Tokens

#### Spacing Scale
- xs: 4px (space-1)
- sm: 8px (space-2)
- md: 16px (space-4)
- lg: 24px (space-6)
- xl: 32px (space-8)
- 2xl: 48px (space-12)

#### Typography Scale
- H1: 2.5rem (40px) - font-sans, font-bold
- H2: 2rem (32px) - font-sans, font-bold
- H3: 1.5rem (24px) - font-sans, font-semibold
- H4: 1.25rem (20px) - font-sans, font-semibold
- Body Large: 1.125rem (18px) - font-serif
- Body: 1rem (16px) - font-serif
- Small: 0.875rem (14px) - font-serif

#### Color Usage Guidelines
- **Primary (Amber):** Main CTAs, focus states, key highlights
- **Secondary (Purple):** Secondary actions, creative elements, accents
- **Card Background:** Light beige for warmth and approachability
- **Text:** Dark gray for readability and professionalism
- **Muted:** Light gray for secondary information

### Accessibility Features
- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance (AA standard)
- Focus indicators
- Screen reader friendly alt text patterns

### Usage Guidelines
- Use semantic design tokens instead of hardcoded values
- Maintain consistent spacing using the defined scale
- Follow the established typography hierarchy
- Ensure all interactive elements have proper focus states
- Test components in both light and dark modes
- Provide meaningful alt text for all images
- Use loading states for form submissions

This component library ensures consistency while supporting the organization's mission of dignified, hope-filled communication about their work with vulnerable children in Kenya.
