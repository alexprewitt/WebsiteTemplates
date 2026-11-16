# Blackthorn Tattoo Co. Website Template

A premium static tattoo studio website built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript. It includes a dark editorial design, portfolio filtering, artist profiles, service cards, consultation form, FAQ, and a rule-based studio chatbot.

## Files

- `index.html` – homepage structure and content
- `css/variables.css` – central color and theme variables
- `css/styles.css` – custom theme and responsive styling
- `css/chatbot.css` – floating chatbot interface styling
- `js/config.js` – site configuration values
- `js/main.js` – navigation, reveal-on-scroll, filtering, and form behavior
- `js/chatbot-knowledge.js` – editable chatbot content and studio responses
- `js/chatbot.js` – chatbot interaction logic

## Local preview

Open `index.html` directly in a browser, or serve the folder locally:

```bash
cd "C:\Users\Alex\Desktop\AJWebsites\WebsiteTemplates\tattoo template"
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Customize before launch

- Update branding, contact information, and studio details in `index.html`
- Replace placeholder artist bios and portfolio work content with real business information
- Edit the chatbot knowledge in `js/chatbot-knowledge.js`
- Replace the demonstration form behavior with a secure live form provider if needed

## Important notes

This is a static demonstration website template. It does not include a live backend or booking system and should be connected to a secure submission service before production use.
