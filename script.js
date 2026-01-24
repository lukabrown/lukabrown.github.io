function addEventListenersToProjects() {
  const projects = document.querySelectorAll(".project");

  projects.forEach(project => {
    const projectImages = project.querySelector(".project-images");
    if (!projectImages) return; // skip if missing

    project.addEventListener("mouseover", () => {
      projectImages.classList.add("project-images-visible");
    });

    project.addEventListener("mouseout", () => {
      projectImages.classList.remove("project-images-visible");
    });
  });
}

function checkWindowSizeAndExecute() {
  if (window.innerWidth >= 768) {
    addEventListenersToProjects();
  }
}

function setTheme(theme) {
  const themeIcon = document.getElementById("themeIcon");
  const root = document.documentElement;
  root.dataset.theme = theme;
  if (theme === "dark") {
    themeIcon.src = "./pics/Light_Moon_Icon.png";
    themeIcon.alt = "Switch to light theme";
  } else {
    themeIcon.src = "./pics/Moon_Icon.png";
    themeIcon.alt = "Switch to dark theme";
  }
}

(function () {
  function getInitialTheme() {
    const saved = localStorage.getItem("theme");
    if (saved) return saved;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  const themeIcon = document.getElementById("themeIcon");
  const theme = getInitialTheme();

  if (theme === "dark") {
    themeIcon.src = "./pics/Light_Moon_Icon.png";
    themeIcon.alt = "Switch to light theme";
  } else {
    themeIcon.src = "./pics/Moon_Icon.png";
    themeIcon.alt = "Switch to dark theme";
  }
})();

(function () {
  if (location.pathname !== "/contact") return;
  const form = document.forms["EmailForm"];
  const sendButton = form.querySelector("button.themeButton");
  const responseEl = document.querySelector(".form-response");

  function setResponse(message, isError = false) {
    responseEl.textContent = message;
    responseEl.style.marginTop = "1rem";
    responseEl.style.color = isError ? "#b00020" : "#006400";
  }

  sendButton.addEventListener("click", async () => {
    setResponse(""); // clear previous response

    if (form.favoriteColor.value.trim() !== "") {
      return;
    }

    var name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    /* Basic client-side validation */
    if (email === "") {
      setResponse("Email is required.", true);
      return;
    }

    const parts = email.split("@");

    // Must be exactly one @
    if (parts.length !== 2) {
      setResponse("Valid email is required.", true);
      return;
    }

    const domain = parts[1];

    // Domain must contain exactly one period
    if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) {
      setResponse("Valid email is required.", true);
      return;
    }

    if (message === "") {
      setResponse("Message is required.", true);
      return;
    }

    /* Get Turnstile token */
    const turnstileToken =
    form.querySelector('input[name="cf-turnstile-response"]')?.value;

    if (!turnstileToken) {
      setResponse("Verification failed. Please try again.", true);
      return;
    }

    if (name === "") {
      name = email;
    }

    /* Build payload */
    const payload = {
      subject: name + " sent a message via your website",
      body: "Email: " + email + " Message: " + message
    };

    form.style.display = "none";
    sendButton.disabled = true;
    setResponse("Sending…");

    try {
      const res = await fetch("https://api.luka-brown.com/email", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "I5MJxbjsQzaF7kUoY2hdO7OK2q2JyXa4qUQpZVZd",
          "x-turnstile-token": turnstileToken
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      setResponse(data.message || "Message sent successfully.");
    } catch (err) {
      setResponse(err.message || "An unexpected error occurred.", true);
    } finally {
      sendButton.disabled = false;
    }
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.querySelector(".splash");
  const playButton = document.querySelector(".playButton");
  const projectPage = document.querySelector(".projects");
  const toggle = document.querySelector(".themeButton");
  const root = document.documentElement;

  /*Toggle the theme based on button click*/
  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      root.setAttribute("data-theme", isDark ? "light" : "dark");
      setTheme(isDark ? "light" : "dark");
      localStorage.setItem("theme", isDark ? "light" : "dark");
    });
  }

  if (projectPage) {
    checkWindowSizeAndExecute();
    window.addEventListener('resize', checkWindowSizeAndExecute);
  }

  if (splash && playButton) {
    document.querySelector(".playButton").addEventListener("click", () => {
    document.querySelector(".splash").style.display = "none";
    });
  }
});
