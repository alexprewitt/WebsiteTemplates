# Section Management Guide

This project is built as a modular single-page website. Each major section is intentionally self-contained so it can be removed, copied, or reordered without damaging the flow of the rest of the page.

## Recommended structure

- Header
- Navigation
- Hero
- About
- Services
- Why Us
- Gallery
- Reviews
- Contact
- Footer

## Add a new section

1. Copy the structure of an existing section block.
2. Give the new section a unique `id`.
3. Add a matching anchor link in the navigation.
4. Keep the spacing and layout consistent with the existing sections.

## Remove a section

1. Delete the block between the section start and end comments.
2. Remove the navigation link that points to that section.
3. Check that the layout still reads clearly on mobile and desktop.

## Reorder sections

Move the HTML section block to a new position in the `main` element and update the navigation links if needed.

## Keep it maintainable

- Do not generate the page with JavaScript.
- Keep content readable in the HTML source.
- Use clear comments around section boundaries.
- Use Bootstrap grid classes for layout consistency.

A developer should be able to adapt the page quickly for a new client without rewriting the entire site.
