# Customization Guide

## Step 1: Change Business Information

Edit the main page content directly in `index.html`:

- Business name: update the header and footer text
- Tagline: change the text in the brand section
- Business description: update the About and Hero paragraphs
- Phone number: change the `tel:` link and the contact card text
- Email address: update links and contact details
- Address: replace placeholder address text in the contact section
- Business hours: update the schedule stated in the contact list

## Step 2: Change Branding

Update theme colors in `css/variables.css`:

- `--brand-primary`
- `--brand-secondary`
- `--brand-accent`
- `--text-primary`
- `--text-secondary`

You can also swap the logo file in `assets/logos/logo-placeholder.svg` with a new SVG or replace the `img` source within the HTML.

## Step 3: Replace Images

Add new image files to `assets/images` and update each `src` in the HTML. For consistency, try to keep the same aspect ratios for hero, about, service, and gallery images.

Recommended dimensions:

- Hero: around 1200 x 900
- About: around 900 x 700
- Gallery: around 800 x 600
- Logo: 200 x 200 SVG or PNG

## Step 4: Modify Navigation

Edit the list inside the `nav` element in `index.html`:

- Rename a link text
- Remove an item
- Add a new anchor link
- Point it to an existing section ID or create a new section with a matching `id`

Keep navigation explicitly written in HTML rather than generating it via JavaScript.

## Step 5: Customize Services

The services cards are easy to duplicate and reorder. Each card sits inside a Bootstrap column and can be copied, removed, or changed.

To add another service:

1. Copy one service card block.
2. Change the heading and paragraph text.
3. Update the icon if needed.
4. Keep the card within the same bootstrap column structure.

## Step 6: Add or Remove Website Sections

Every major section is wrapped with clear start/end comments in `index.html`.

To remove a section:

1. Delete the entire block between the section start and section end comments.
2. Remove the matching navigation link.

To add a section:

1. Copy an existing section structure.
2. Give it a new `id`.
3. Add a matching navigation item.
4. Confirm spacing, grid, and styling continue to look balanced.

## Step 7: Configure Contact Forms

The form in this template is intentionally not connected to a working backend or email service. This prevents the site from claiming to submit emails when no actual integration exists.

Before launch, choose one of these options:

- Connect to a service such as Formspree, Netlify Forms, or a custom backend endpoint.
- Remove the form and replace it with a simple contact callout.
- Keep the demo layout but clearly label it as non-live until configured.

## Step 8: Prepare for Deployment

Use this checklist before publishing:

- Business info verified
- Placeholder text removed
- Placeholder images replaced
- Testimonials verified or removed
- Contact links tested
- Form integration configured or form removed
- Legal placeholders updated
- Mobile responsiveness checked
- Accessibility review completed
- SEO metadata customized
- HTTPS enabled by host
- No unnecessary tracking scripts

## Step 9: Publish Website

This site is a static website, so it can be published to any static hosting platform.

Typical options include:

- GitHub Pages
- Netlify
- Vercel
- Any standard static web host

Upload the final static files and verify the site on mobile and desktop after deployment.
