document.addEventListener("DOMContentLoaded", function () {
  const knowledge = window.chatbotKnowledge || {};
  const CHATBOT_TITLE = knowledge.companyName || "Business Assistant";
  const startMessage = knowledge.greeting || "Welcome! How can I help?";

  const launcher = document.getElementById("chatbot-launcher");
  const panel = document.getElementById("chatbot-panel");
  const closeButton = document.getElementById("chatbot-close");
  const messageList = document.getElementById("chatbot-messages");
  const form = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");
  const quickReplyArea = document.getElementById("chatbot-quick-replies");

  if (!launcher || !panel || !messageList || !form || !input || !quickReplyArea) {
    return;
  }

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[.,!?;:()\[\]{}"']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function createMessageBubble(text, sender) {
    const item = document.createElement("div");
    item.className = `chat-bubble chat-bubble-${sender}`;
    item.setAttribute("role", sender === "assistant" ? "log" : "note");

    const textNode = document.createElement("p");
    textNode.className = "mb-0";
    textNode.textContent = text;
    item.appendChild(textNode);
    return item;
  }

  function addChatMessage(text, sender) {
    const bubble = createMessageBubble(text, sender);
    messageList.appendChild(bubble);
    messageList.scrollTop = messageList.scrollHeight;
  }

  function renderQuickReplies(options) {
    quickReplyArea.innerHTML = "";
    options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chat-quick-reply";
      button.textContent = option;
      button.addEventListener("click", function () {
        addChatMessage(option, "user");
        const response = findResponse(option);
        addChatMessage(response, "assistant");
        renderQuickReplies(getSuggestedReplies());
      });
      quickReplyArea.appendChild(button);
    });
  }

  function getSuggestedReplies() {
    return knowledge.suggestedQuestions || [
      "What services do you offer?",
      "How do I request a quote?",
      "What areas do you serve?"
    ];
  }

  function openChatbot() {
    panel.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    launcher.classList.add("is-active");
    input.focus();
  }

  function closeChatbot() {
    panel.classList.remove("is-open");
    launcher.setAttribute("aria-expanded", "false");
    launcher.classList.remove("is-active");
    launcher.focus();
  }

  function navigateFromChatbot(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    closeChatbot();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function findNavigationResponse(message) {
    const normalized = normalizeText(message);
    const entries = Object.entries(knowledge.navigation || {});

    for (const [key, navConfig] of entries) {
      const labels = navConfig.labels || [];
      const isMatch = labels.some((label) => normalized.includes(normalizeText(label)));
      if (isMatch) {
        return {
          type: "navigate",
          target: navConfig.target,
          text: `Absolutely. I can help you go there now.`
        };
      }
    }

    return null;
  }

  function findServiceResponse(message) {
    const normalized = normalizeText(message);
    for (const service of knowledge.serviceCategories || []) {
      const serviceMatch = (service.keywords || []).some((keyword) => normalized.includes(normalizeText(keyword)));
      if (serviceMatch) {
        return service.response;
      }
    }
    return null;
  }

  function findFaqResponse(message) {
    const normalized = normalizeText(message);
    const answerKeys = Object.keys(knowledge.faqAnswers || {});
    for (const key of answerKeys) {
      if (normalized.includes(normalizeText(key))) {
        return knowledge.faqAnswers[key];
      }
    }
    return null;
  }

  function findResponse(message) {
    const normalized = normalizeText(message);
    const navResponse = findNavigationResponse(message);
    if (navResponse) {
      setTimeout(() => {
        navigateFromChatbot(navResponse.target);
      }, 180);
      return navResponse.text;
    }

    if (!normalized) {
      return "Please type a question or choose one of the quick replies.";
    }

    if (normalized.includes("hello") || normalized.includes("hi") || normalized.includes("hey")) {
      return knowledge.defaultResponses.greeting;
    }

    if (normalized.includes("price") || normalized.includes("cost") || normalized.includes("estimate") || normalized.includes("quote")) {
      return knowledge.defaultResponses.price;
    }

    if (normalized.includes("area") || normalized.includes("location") || normalized.includes("serve")) {
      return knowledge.defaultResponses.serviceArea;
    }

    if (normalized.includes("call") || normalized.includes("phone") || normalized.includes("email") || normalized.includes("contact")) {
      return knowledge.defaultResponses.contact;
    }

    const serviceResponse = findServiceResponse(message);
    if (serviceResponse) {
      return serviceResponse;
    }

    const faqAnswer = findFaqResponse(message);
    if (faqAnswer) {
      return faqAnswer;
    }

    if (normalized.includes("service") || normalized.includes("offer") || normalized.includes("work")) {
      return "We offer a range of services for residential and commercial clients, including general contracting, maintenance, property improvements, renovation, and consultation. You can review the services section for more details.";
    }

    if (normalized.includes("project") || normalized.includes("portfolio") || normalized.includes("work")) {
      return "Absolutely. You can view our featured projects and examples of completed work in the project gallery. Do you want to open that section?";
    }

    if (normalized.includes("start") || normalized.includes("begin") || normalized.includes("request")) {
      return knowledge.defaultResponses.quote;
    }

    return knowledge.defaultResponses.unknown;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) {
      input.focus();
      return;
    }

    addChatMessage(userMessage, "user");
    input.value = "";

    const response = findResponse(userMessage);
    addChatMessage(response, "assistant");
    renderQuickReplies(getSuggestedReplies());
  }

  launcher.addEventListener("click", function () {
    const isOpen = panel.classList.contains("is-open");
    if (isOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
  });

  closeButton.addEventListener("click", closeChatbot);
  form.addEventListener("submit", handleSubmit);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel.classList.contains("is-open")) {
      closeChatbot();
    }
  });

  const startReply = knowledge.welcomeQuickReplies || ["Explore Services", "Request a Quote", "Service Areas", "Contact Information"];
  renderQuickReplies(startReply);

  document.querySelectorAll(".chatbot-open-cta").forEach((button) => {
    button.addEventListener("click", function () {
      openChatbot();
      if (!messageList.children.length) {
        addChatMessage(startMessage, "assistant");
      }
    });
  });

  document.querySelectorAll(".chatbot-service").forEach((button) => {
    button.addEventListener("click", function () {
      const selectedService = button.dataset.service || "our services";
      openChatbot();
      addChatMessage(`Tell me about ${selectedService}`, "user");
      addChatMessage(findResponse(selectedService), "assistant");
      renderQuickReplies(getSuggestedReplies());
    });
  });

  addChatMessage(startMessage, "assistant");
  panel.classList.remove("is-open");
  launcher.setAttribute("aria-expanded", "false");
  document.getElementById("chatbot-title").textContent = CHATBOT_TITLE;
  document.getElementById("chatbot-subtitle").textContent = knowledge.assistantLabel || "Virtual Assistant";
});
