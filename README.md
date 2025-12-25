# SuchGrime - Milwaukee Web Design & SEO Agency

Professional website refreshes and SEO services for Milwaukee small businesses. Built with Rust Belt hustle for results that matter.

## 🚀 Overview

SuchGrime is a Milwaukee-based web design and SEO agency focused on dragging outdated sites into the modern era. We specialize in refreshes that look sharp, convert better, and crush Google rankings for small service businesses.

**Key Features:**
- AI-assisted rapid development with Cursor
- Transparent pricing from $2k-$15k
- Professional industrial aesthetic with subtle grunge
- Optimized for conversions and local SEO
- Mobile-responsive, fast, accessible

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Space Grotesk (display), Inter (body)
- **Typography:** Clean, bold sans-serif with industrial edge
- **Deployment:** Vercel

## 📁 Project Structure

```
suchgrime/
├── app/
│   ├── layout.tsx              # Root layout with SEO metadata & schema
│   ├── page.tsx                # Main landing page
│   ├── globals.css             # Global styles with industrial effects
│   ├── privacy-policy/
│   │   └── page.tsx            # GDPR/CCPA compliant privacy policy
│   └── terms-of-service/
│       └── page.tsx            # Service terms & agreements
├── components/
│   ├── About.tsx               # Manifesto section with founder photo
│   ├── BlogTeaser.tsx          # Coming soon blog section
│   ├── Contact.tsx             # Contact form & info
│   ├── Footer.tsx              # Footer with legal links
│   ├── Hero.tsx                # Landing hero section
│   ├── Navigation.tsx          # Sticky navigation
│   ├── Portfolio.tsx           # Real project showcase
│   ├── Pricing.tsx             # Transparent pricing tiers
│   ├── Services.tsx            # Service offerings
│   └── Testimonials.tsx        # Client results & testimonials
├── public/
│   └── me.PNG                  # Founder photo
└── README.md                   # This file
```

## 🎨 Design Philosophy

**Professional + Gritty Milwaukee Edge**

- **Base:** Clean, minimalist black/white/neutral palette
- **Typography:** Bold Space Grotesk headlines, readable Inter body text
- **Industrial Grit:** Subtle warehouse textures, grain overlays, distressed borders
- **Copy Tone:** Direct, confident, results-focused. "Dominate search rankings," "measurable results"
- **No Fluff:** Transparent pricing, real projects, honest communication

**Visual Effects:**
- Faint concrete/warehouse texture backgrounds
- Subtle grain overlays (opacity 1-3%)
- Distressed paper edges on cards
- Minimal hover animations
- Industrial-strength borders

## 📄 Page Sections

### Main Landing Page (in order):

1. **Hero** - Bold headline, value prop, dual CTAs
2. **About/Manifesto** - Milwaukee-Built. Results-Driven. (with founder photo)
3. **Services** - Detailed service breakdown
4. **Portfolio** - Real projects only:
   - Guerrilla Social Club (AI autonomous build)
   - SuchGrime.com (self-build showcase)
   - Incoming client project placeholder
5. **Testimonials** - Client results & quotes
6. **Pricing** - Transparent tiers ($2k-$15k)
7. **Blog Teaser** - Coming soon articles + newsletter signup
8. **Contact** - Form + contact info
9. **Footer** - Legal links, contact, copyright

### Legal Pages:

- **/privacy-policy** - GDPR/CCPA compliant privacy statement
- **/terms-of-service** - Project terms, payment structure, SEO disclaimers

## 🔍 SEO Features

**Meta Tags:**
- Title: "Milwaukee Web Design & SEO Agency | SuchGrime – Dominate Local Search"
- Description: "Professional website refreshes and SEO for Milwaukee small businesses. Transparent pricing from $2k. Get a free audit."
- Keywords: Local SEO focused
- Open Graph tags for social sharing

**Structured Data (JSON-LD):**
- LocalBusiness schema with:
  - Full contact info
  - Geographic coordinates (Milwaukee)
  - Service area (50km radius)
  - Price range ($2k-$15k)
  - Service types
  - Aggregate rating
  - Opening hours

## 📞 Contact Information

- **Email:** suchgrime@guerrillasocialclub.com
- **Phone:** (414) 439-6211
- **Location:** Milwaukee, Wisconsin
- **Website:** https://suchgrime.com

## 🎯 Key Pages & Features

### Portfolio Projects

1. **Guerrilla Social Club**
   - Link: https://guerrillasocialclub.com
   - Highlight: 100% AI-built experimental platform
   - Tags: Next.js, Cursor AI, Experimental

2. **SuchGrime.com (Self-Build)**
   - Built in < 48 hours
   - AI-assisted development
   - Showcase of modern web workflows

3. **Client Project (Incoming)**
   - Placeholder for real Milwaukee service business
   - Local SEO domination strategy

### Pricing Tiers

- **Basic:** $2k-$4k - Simple refresh, essential SEO
- **Standard:** $4k-$7k - Full redesign, comprehensive SEO
- **Premium:** $7k-$15k - E-commerce, advanced features
- **Monthly SEO:** $500-$2k - Ongoing optimization

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/joetabora/suchgrime.git

# Navigate to directory
cd suchgrime

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

### Build for Production

```bash
npm run build
npm start
```

### Deploy

Optimized for Vercel deployment:

```bash
vercel deploy
```

## 📝 Content Guidelines

**Tone:**
- Direct, confident, no-nonsense
- Milwaukee pride & Rust Belt hustle
- Results-focused, not feature-focused
- Transparent about process, tools, and pricing

**Copy Principles:**
- Short sentences
- Bold statements
- Real metrics (when available)
- No agency fluff or jargon
- Emphasis on value delivered

## 🔧 Customization

### Adding Blog Posts

Edit `/components/BlogTeaser.tsx` to add new post previews. Full blog functionality coming soon.

### Updating Contact Info

Update in:
- `/components/Contact.tsx`
- `/components/Footer.tsx`
- `/app/layout.tsx` (LocalBusiness schema)
- Legal pages (privacy-policy, terms-of-service)

### Modifying Pricing

Edit `/components/Pricing.tsx` to update tiers and pricing.

### Portfolio Projects

Add/edit projects in `/components/Portfolio.tsx` - maintain focus on real work only.

## 🎨 Visual Grunge Effects

All implemented via CSS/SVG in `globals.css`:

- `.grain-overlay` - Animated grain texture
- `.concrete-bg` - Industrial texture pattern
- `.distressed-border` - Rough edge effects
- `.paper-edge` - Torn paper appearance
- `.glitch-hover` - Subtle glitch on hover

Keep opacity low (1-3%) to maintain readability.

## 📊 Performance

- Lighthouse Score: 95+ target
- Core Web Vitals optimized
- Image optimization via Next.js Image
- Minimal JavaScript bundle
- Fast initial page load

## 🔒 Privacy & Legal

- GDPR compliant
- CCPA compliant
- No personal data selling
- Cookie disclosure
- Clear terms of service
- No SEO ranking guarantees (honest!)

## 📄 License

© 2025 SuchGrime. All rights reserved.

## 🤝 Contributing

This is a live agency site. For inquiries about collaboration or services:

**Email:** suchgrime@guerrillasocialclub.com  
**Phone:** (414) 439-6211

---

**Built with Cursor AI** - Rapid, high-quality development for modern web agencies.

**Milwaukee-Built. Results-Driven.**
