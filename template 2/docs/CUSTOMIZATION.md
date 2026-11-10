# Customization Guide

## Brand settings

Update the primary brand palette in `css/variables.css`:

- `--color-primary`
- `--color-accent`
- `--color-secondary`
- `--color-text`
- `--color-text-muted`

## Business information

Many business details appear across the homepage and chatbot. Update these values in:

- `index.html` for visible content
- `js/config.js` for the business settings object
- `js/chatbot-knowledge.js` for the chatbot knowledge base

## Service cards

Each service card in `index.html` can be edited directly. Keep the wording consistent with your business offerings and update the matching chatbot keywords in `js/chatbot-knowledge.js`.

## Project gallery

Replace image URLs and text in the project cards under the `#projects` section. The JS filter logic is already set up for `Residential`, `Commercial`, and `Specialty` projects.

## Quote form

The current form is a demonstration-only form and intentionally does not submit data to a live service. To connect it to a real form handler, replace the submit behavior in `js/main.js` and update the form action or endpoint.

## Contact details

Update the phone number, email address, office hours, and service area language directly in the HTML or in the shared config object.

## Notes

- Keep business claims honest and verified.
- Use placeholders when exact credentials or service coverage need confirmation.
