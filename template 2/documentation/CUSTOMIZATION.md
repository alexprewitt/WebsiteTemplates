# Customization Guide

## Change business information

Update the main content in `index.html`:

- Business name and tagline in the header
- Announcement bar message
- Hero headline and description
- Contact email, phone, address, and hours
- Footer brand text and legal placeholders

## Update branding

Edit the CSS variables in `css/variables.css`:

- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-sage`
- `--color-background`
- `--color-surface`

These values drive the site-wide look and are easy to swap for a new brand palette.

## Replace images

All default imagery lives in `assets/images/` and `assets/logos/`.

To swap a placeholder image:

1. Add the new asset to the correct folder.
2. Update the `src` attribute in the relevant HTML block.
3. Keep consistent aspect ratios for smoother layout behavior.

## Update services

The hair and pet service sections are separate and easy to edit:

- Change the heading text.
- Update service names, descriptions, and prices.
- Add or remove cards while preserving the surrounding grid structure.
- Keep the `href="#booking"` so each card leads to the appointment section.

## Modify gallery content

The gallery is powered by a simple set of `div.gallery-item` blocks with `data-category` values.

Add a new gallery card by copying an existing item and updating:

- image file path
- `data-category` value
- alt text
- caption text

## Remove or add sections

Each major section in the HTML is clearly separated and can be removed without affecting unrelated sections.

To remove a section:

1. Delete the block between the section start and end comments, if present.
2. Remove the link in the navigation.
3. Ensure the page still reads cleanly without the content.

## Configure booking

The booking form is intentionally a non-live demo. It does not reserve appointments or send any messages.

Before using a real booking workflow, choose one of the following approaches:

- Connect the form to a form service such as Formspree or a custom backend endpoint.
- Replace it with a direct call-to-action booking flow.
- Keep it as a placeholder until a real booking system is ready.

## Launch checklist

Before publishing:

- Placeholder content removed or verified
- Services and prices checked
- Team profiles updated or removed
- Gallery assets replaced with real work
- Testimonials verified or removed
- Contact details tested
- Booking solution configured or clearly labeled as demo-only
- Mobile responsiveness checked
- Accessibility review completed
- SEO metadata customized
- HTTPS enabled by host
