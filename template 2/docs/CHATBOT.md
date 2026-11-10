# Chatbot Documentation

## Overview

This site includes a floating browser-based customer assistant for Apex Professional Services. It is intentionally rule-based, transparent, and easy to customize for other businesses.

## Files

- `js/chatbot-knowledge.js` — content such as service categories, contact info, and FAQ responses
- `js/chatbot.js` — UI behavior and response matching logic
- `css/chatbot.css` — chat panel, launcher, and message styling

## How it works

The chatbot answers common questions by matching user input against simple keyword groups and intent rules. It also supports quick replies and navigation shortcuts to sections like services, quote form, contact information, and FAQ.

## To update knowledge

Edit `js/chatbot-knowledge.js` to change:

- greeting text
- service names and keywords
- contact details
- navigation targets
- FAQ responses
- suggested quick replies

## To add a new answer

1. Add a new service or response block in `chatbot-knowledge.js`
2. Include relevant keywords for matching
3. Keep the response honest, practical, and relevant to the business

## To disable the chatbot

- Remove the chatbot markup from `index.html`
- Remove the chat stylesheet from the document head
- Remove the script tags for `chatbot-knowledge.js` and `chatbot.js`

## Limitations

- No external API or backend is required
- Matching is keyword-based and intentionally simple
- It does not claim to be a live AI employee or person

## Future upgrade path

A future AI version should use a secure backend endpoint instead of frontend-only API keys. The interface and knowledge logic are kept separate so a more advanced service can replace the rules engine later without redesigning the front end.
