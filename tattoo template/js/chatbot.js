function initializeChatbot() {
  const root = document.getElementById("chatbot-root");
  const windowEl = document.getElementById("chatbot-window");
  const launcher = document.getElementById("chatbot-launcher");
  const closeButton = document.getElementById("chatbot-close");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");
  const suggestions = document.getElementById("chatbot-suggestions");

  if (!root || !windowEl || !launcher || !form || !input || !messages || !suggestions) {
    return;
  }

  const knowledge = window.chatbotKnowledge || {};

  function safeText(value) {
    return String(value ?? "");
  }

  function addChatMessage(message, sender) {
    const row = document.createElement("div");
    row.className = `chat-row ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.textContent = message;

    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function renderSuggestions(options) {
    suggestions.innerHTML = "";
    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chatbot-suggestion";
      button.textContent = option;
      button.addEventListener("click", () => {
        input.value = option;
        form.dispatchEvent(new Event("submit", { cancelable: true }));
      });
      suggestions.appendChild(button);
    });
  }

  function openChatbot() {
    windowEl.classList.add("open");
    windowEl.setAttribute("aria-hidden", "false");
    setTimeout(() => input.focus(), 50);
  }

  function closeChatbot() {
    windowEl.classList.remove("open");
    windowEl.setAttribute("aria-hidden", "true");
  }

  function handleNavigation(action) {
    const sectionMap = {
      styles: "#styles",
      artists: "#artists",
      portfolio: "#portfolio",
      booking: "#booking",
      aftercare: "#aftercare",
      contact: "#contact"
    };

    const target = sectionMap[action] || action;
    if (target && target.startsWith("#")) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    closeChatbot();
  }

  function getStyleResponse(message) {
    const lower = message.toLowerCase();
    const styleKeys = Object.keys(knowledge.styles || {});
    for (const key of styleKeys) {
      if (lower.includes(key)) {
        return `${knowledge.styles[key]} Would you like to explore examples or connect with an artist who specializes in this style?`;
      }
    }
    return "Blackthorn Tattoo Co. is a customizable studio template. Try asking about blackwork, fine line, traditional, realism, or illustrative tattoos.";
  }

  function getArtistResponse(message) {
    const lower = message.toLowerCase();
    const artistEntries = Object.entries(knowledge.artists || {});
    const match = artistEntries.find(([key, value]) => lower.includes(key) || lower.includes(value.name.toLowerCase()));
    if (match) {
      const [, artist] = match;
      return `${artist.name} specializes in ${artist.specialty}. ${artist.bio}`;
    }
    return "We can help connect you with an artist based on style, concept, and desired aesthetic. Tell us what kind of tattoo you want to explore.";
  }

  function getFallbackResponse() {
    return "I'm not sure I have the right information for that question. You can contact the studio directly or submit a consultation request.";
  }

  function findChatbotResponse(message) {
    const lower = message.toLowerCase();
    const text = safeText(message).trim();

    if (!text) {
      return "Please ask a question so I can help.";
    }

    if (lower.includes("blackwork") || lower.includes("fine line") || lower.includes("traditional") || lower.includes("neo") || lower.includes("realism") || lower.includes("illustrative")) {
      return getStyleResponse(text);
    }

    if (lower.includes("who specializes") || lower.includes("artist") || lower.includes("portfolio") || lower.includes("mara") || lower.includes("julian") || lower.includes("sierra")) {
      return getArtistResponse(text);
    }

    if (lower.includes("how much") || lower.includes("price") || lower.includes("minimum") || lower.includes("cost")) {
      return knowledge.pricing || "Tattoo pricing depends on the design, size, complexity, placement, and artist's schedule.";
    }

    if (lower.includes("book") || lower.includes("consult") || lower.includes("how do i book") || lower.includes("deposit") || lower.includes("reference image")) {
      return knowledge.consultation || "Use the consultation form or contact the studio directly to begin the design process.";
    }

    if (lower.includes("aftercare") || lower.includes("care") || lower.includes("heal")) {
      return knowledge.aftercare || "Follow your artist's written aftercare instructions and seek qualified medical advice if you notice concerning changes.";
    }

    if (lower.includes("walk") || lower.includes("walk-in") || lower.includes("walk in")) {
      return knowledge.policies?.walkIns || "Walk-ins depend on current studio availability.";
    }

    if (lower.includes("deposit") || lower.includes("pay")) {
      return knowledge.policies?.deposit || "Deposit needs vary by project and artist.";
    }

    if (lower.includes("location") || lower.includes("where are you") || lower.includes("address") || lower.includes("contact")) {
      return `${knowledge.contact || "You can contact the studio directly."} ${knowledge.location || ""}`;
    }

    if (lower.includes("style") || lower.includes("explore") || lower.includes("tattoo styles")) {
      return "The studio can support a range of styles including blackwork, fine line, traditional, neo-traditional, realism, and illustrative artwork.";
    }

    if (lower.includes("view portfolio") || lower.includes("portfolio")) {
      handleNavigation("portfolio");
      return "I opened the portfolio section for you. Browse the gallery and filter by artist or style.";
    }

    if (lower.includes("meet the artists") || lower.includes("artists")) {
      handleNavigation("artists");
      return "I opened the artist section for you so you can explore the studio's profiles.";
    }

    if (lower.includes("book a consultation") || lower.includes("book consultation") || lower.includes("consultation")) {
      handleNavigation("booking");
      return "I opened the consultation request form so you can submit your idea.";
    }

    if (lower.includes("aftercare")) {
      handleNavigation("aftercare");
      return "I opened the aftercare section for you. It includes prep and healing guidance.";
    }

    return getFallbackResponse();
  }

  const suggestionsList = knowledge.suggestions || ["Explore Tattoo Styles", "Meet the Artists", "Book a Consultation"];
  renderSuggestions(suggestionsList);

  launcher.addEventListener("click", openChatbot);
  closeButton.addEventListener("click", closeChatbot);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && windowEl.classList.contains("open")) {
      closeChatbot();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addChatMessage(text, "user");
    input.value = "";

    const response = findChatbotResponse(text);
    addChatMessage(response, "assistant");
  });

  addChatMessage(knowledge.welcomeMessage || "Welcome to the studio. How can I help?", "assistant");
  renderSuggestions(suggestionsList);
}

document.addEventListener("DOMContentLoaded", initializeChatbot);
