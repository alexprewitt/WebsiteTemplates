document.addEventListener("DOMContentLoaded", function () {
  const yearNode = document.getElementById("current-year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const nav = document.querySelector(".navbar");
  if (nav && window.siteConfig && window.siteConfig.stickyNavbar) {
    const updateNavState = function () {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    };

    updateNavState();
    window.addEventListener("scroll", updateNavState, { passive: true });
  }

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if (navLinks.length && window.siteConfig && window.siteConfig.highlightActiveNav) {
    const highlightActiveLink = function () {
      let currentId = "home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          currentId = section.id;
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        const isActive = href === `#${currentId}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    highlightActiveLink();
    window.addEventListener("scroll", highlightActiveLink, { passive: true });
  }

  const navCollapse = document.querySelector(".navbar-collapse");
  if (navCollapse) {
    navCollapse.addEventListener("click", function (event) {
      const clickedLink = event.target.closest(".nav-link");
      if (!clickedLink) return;
      if (window.innerWidth < 992 && navCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  }

  if (window.siteConfig && window.siteConfig.revealOnScroll) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
  }

  const selectedArtistFilter = { artist: "all", style: "all" };

  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  const applyPortfolioFilters = function () {
    portfolioItems.forEach((item) => {
      const matchesArtist = selectedArtistFilter.artist === "all" || item.dataset.artist === selectedArtistFilter.artist;
      const matchesStyle = selectedArtistFilter.style === "all" || item.dataset.style === selectedArtistFilter.style;
      item.classList.toggle("hidden", !(matchesArtist && matchesStyle));
    });
  };

  const updateFilterButtons = function (group, activeButton) {
    document.querySelectorAll(`.filter-btn[data-${group}]`).forEach((btn) => {
      btn.classList.toggle("active", btn === activeButton);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const group = button.dataset.filterGroup || button.parentElement.dataset.filterGroup;
      const value = button.dataset.artist || button.dataset.style || "all";

      if (group === "artist") {
        selectedArtistFilter.artist = value;
      }

      if (group === "style") {
        selectedArtistFilter.style = value;
      }

      updateFilterButtons(group, button);
      applyPortfolioFilters();
    });
  });

  document.querySelectorAll(".artist-card [data-artist]").forEach((button) => {
    button.addEventListener("click", function () {
      const artist = this.dataset.artist;
      const style = this.dataset.style || "all";
      selectedArtistFilter.artist = artist;
      selectedArtistFilter.style = style;

      document.querySelectorAll(".filter-btn[data-artist]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.artist === artist);
      });
      document.querySelectorAll(".filter-btn[data-style]").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.style === style || (style === "all" && btn.dataset.style === "all"));
      });

      applyPortfolioFilters();
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const projectModal = document.getElementById("portfolioModal");
  if (projectModal) {
    projectModal.addEventListener("show.bs.modal", function (event) {
      const trigger = event.relatedTarget;
      if (!trigger) return;

      const title = trigger.dataset.title || "Portfolio Piece";
      const artist = trigger.dataset.artist || "Artist";
      const style = trigger.dataset.style || "Style";
      const caption = trigger.dataset.caption || "";
      const image = trigger.dataset.image || trigger.querySelector("img")?.src || "";

      const modalTitle = projectModal.querySelector(".project-modal-title");
      const modalImage = projectModal.querySelector(".project-modal-image");
      const modalMeta = projectModal.querySelector(".project-modal-meta");
      const modalCaption = projectModal.querySelector(".project-modal-caption");

      modalTitle.textContent = title;
      modalMeta.textContent = `${artist} • ${style}`;
      modalImage.src = image;
      modalImage.alt = title;
      modalCaption.textContent = caption;
    });
  }

  const consultationWizard = document.getElementById("consultation-wizard");
  if (consultationWizard) {
    const stepCount = document.getElementById("consultation-step-count");
    const questionLabel = document.getElementById("consultation-question-label");
    const answerWrap = document.getElementById("consultation-answer-wrap");
    const errorMessage = document.getElementById("consultation-error");
    const progressList = document.getElementById("consultation-progress");
    const backButton = document.getElementById("consultation-back");
    const nextButton = document.getElementById("consultation-next");
    const completionMessage = document.getElementById("consultation-complete");
    const questions = [
      { id: "full-name", label: "What is your full name?", type: "text", required: true, placeholder: "Your full name" },
      { id: "email", label: "What is your email address?", type: "email", required: true, placeholder: "you@example.com" },
      { id: "phone", label: "What is the best phone number to reach you?", type: "tel", required: true, placeholder: "(555) 555-5555" },
      { id: "artist", label: "Do you have a preferred artist?", type: "select", options: ["Mara Quinn", "Julian Hale", "Sierra Vale", "No preference"] },
      { id: "style", label: "What tattoo style are you interested in?", type: "select", options: ["Blackwork", "Fine Line", "Traditional", "Neo-Traditional", "Black & Gray Realism", "Illustrative", "Japanese", "Lettering"] },
      { id: "size", label: "About how large would you like the tattoo?", type: "text", placeholder: "Small, medium, sleeve, etc." },
      { id: "description", label: "Tell us about your design idea.", type: "textarea", required: true, placeholder: "Describe the design and any references you have." },
      { id: "placement", label: "Where on your body would you like the tattoo?", type: "text", placeholder: "Forearm, shoulder, ribs, etc." },
      { id: "contact-method", label: "How do you prefer to be contacted?", type: "select", options: ["Email", "Phone", "Text"] },
      { id: "notes", label: "Anything else the artist should know?", type: "textarea", placeholder: "Timelines, references, or additional notes." }
    ];
    const answers = {};
    let currentQuestion = 0;
    let redirectTimer;

    questions.forEach((question, index) => {
      const progressItem = document.createElement("li");
      const dot = document.createElement("span");
      const description = document.createElement("span");
      const status = `Question ${index + 1}: unanswered`;
      dot.className = "consultation-progress-dot";
      dot.setAttribute("aria-hidden", "true");
      description.className = "sr-only";
      description.textContent = status;
      progressItem.setAttribute("aria-label", status);
      progressItem.append(dot, description);
      progressList.appendChild(progressItem);
    });

    const updateProgress = function () {
      Array.from(progressList.children).forEach((item, index) => {
        const answered = Boolean((answers[questions[index].id] || "").trim());
        const status = `Question ${index + 1}: ${answered ? "answered" : "unanswered"}`;
        item.classList.toggle("is-answered", answered);
        item.classList.toggle("is-current", index === currentQuestion);
        item.setAttribute("aria-label", status);
        item.querySelector(".sr-only").textContent = status;
      });
    };

    const renderQuestion = function () {
      const question = questions[currentQuestion];
      stepCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
      questionLabel.textContent = question.label;
      errorMessage.textContent = "";
      answerWrap.replaceChildren();

      let field;
      if (question.type === "select") {
        field = document.createElement("select");
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.textContent = "Choose an option";
        field.appendChild(placeholderOption);
        question.options.forEach((optionText) => {
          const option = document.createElement("option");
          option.value = optionText;
          option.textContent = optionText;
          field.appendChild(option);
        });
      } else {
        field = document.createElement(question.type === "textarea" ? "textarea" : "input");
        if (question.type === "textarea") {
          field.rows = 4;
        } else {
          field.type = question.type;
        }
        field.placeholder = question.placeholder;
      }

      field.id = "consultation-answer";
      field.name = question.id;
      field.required = Boolean(question.required);
      field.setAttribute("aria-describedby", "consultation-error");
      const autocompleteValues = { "full-name": "name", email: "email", phone: "tel" };
      if (autocompleteValues[question.id]) {
        field.autocomplete = autocompleteValues[question.id];
      }
      field.value = answers[question.id] || "";
      answerWrap.appendChild(field);
      backButton.disabled = currentQuestion === 0;
      nextButton.textContent = currentQuestion === questions.length - 1
        ? (question.required || field.value ? "View contact details" : "Skip and view contact details")
        : (!question.required && !field.value ? "Skip" : "Next");
      updateProgress();
      field.focus();

      const updateAnswer = function () {
        answers[question.id] = field.value;
        errorMessage.textContent = "";
        nextButton.textContent = currentQuestion === questions.length - 1
          ? (question.required || field.value ? "View contact details" : "Skip and view contact details")
          : (!question.required && !field.value ? "Skip" : "Next");
        updateProgress();
      };
      field.addEventListener("input", updateAnswer);
      field.addEventListener("change", updateAnswer);
    };

    const validateCurrentAnswer = function () {
      const question = questions[currentQuestion];
      const field = document.getElementById("consultation-answer");
      const value = field.value.trim();

      if (question.required && !value) {
        errorMessage.textContent = "Please answer this question to continue.";
        field.focus();
        return false;
      }

      if (question.type === "email" && value && !field.validity.valid) {
        errorMessage.textContent = "Enter a valid email address to continue.";
        field.focus();
        return false;
      }

      answers[question.id] = field.value;
      updateProgress();
      return true;
    };

    backButton.addEventListener("click", function () {
      if (currentQuestion === 0) return;
      currentQuestion -= 1;
      renderQuestion();
    });

    consultationWizard.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!validateCurrentAnswer()) return;

      if (currentQuestion < questions.length - 1) {
        currentQuestion += 1;
        renderQuestion();
        return;
      }

      clearTimeout(redirectTimer);
      completionMessage.hidden = false;
      questionLabel.hidden = true;
      stepCount.hidden = true;
      answerWrap.hidden = true;
      errorMessage.hidden = true;
      backButton.hidden = true;
      nextButton.hidden = true;
      redirectTimer = window.setTimeout(function () {
        window.location.hash = "contact";
      }, 2000);
    });

    renderQuestion();
  }

});
