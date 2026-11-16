# Deployment Guide

## Static hosting

This project is designed for static hosting. It can be deployed to any standard static host, including:

- GitHub Pages
- Netlify
- Vercel static hosting
- Cloudinary or CDN-backed static hosting
- Traditional web hosting with direct file upload

## HTTPS

Use HTTPS for all production deployments. Ensure your hosting provider enables SSL or an automatic certificate service.

## Form handling

The current quote form is a demonstration-only form and intentionally does not submit data. To set up real lead capture, connect it to a verified form endpoint or a third-party form service and update the front-end logic in `js/main.js`.

## SEO basics

- Review title and description metadata
- Confirm headings and service keywords match the actual business
- Replace placeholder service areas with verified coverage
- Add final production images and alt text

## Client ownership

Document who owns domain, hosting, email, and analytics setup. Confirm the client has access to the final static site files and credentials before handoff.

## Maintenance

- Update contact details as needed
- Refresh project imagery and testimonials
- Review the chatbot knowledge base for accuracy
- Keep service coverage claims truthful and current
