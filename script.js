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

(function () {
  if (location.pathname !== "/contact") return;
  const form = document.forms["EmailForm"];
  const sendButton = form.querySelector("button.themeButton");
  const responseEl = document.getElementById("form-response");

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

    /* Get Turnstile token */
    const turnstileToken =
    form.querySelector('input[name="cf-turnstile-response"]')?.value;

    if (!turnstileToken) {
      setResponse("Verification failed. Please try again.", true);
      return;
    }

    /* Build payload */
    const payload = {
      subject: form.name.value.trim() + " sent a message via your website",
      body: "Email: " + form.email.value.trim() + " Message: " + form.message.value.trim()
    };

    /* Basic client-side validation */
    if (!payload.body) {
    setResponse("Message is required.", true);
      return;
    }

    sendButton.disabled = true;
    setResponse("Sending…");

    try {
      const res = await fetch("https://api.luka-brown.com/email", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "I5MJxbjsQzaF7kUoY2hdO7OK2q2JyXa4qUQpZVZd",
          "x-turnstile-token": turnstileToken,
          "access-control-allow-headers": "Content-Type,X-Api-Key,X-Turnstile-Token",
          "access-control-allow-methods": "OPTIONS,POST",
          "access-control-allow-origin": "https://www.luka-brown.com",
          "access-control-max-age": "300"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      setResponse(data.message || "Message sent successfully.");
      form.reset();
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
      localStorage.setItem("theme", isDark ? "light" : "dark");
    });
  }

  if (projectPage) {
    checkWindowSizeAndExecute();
    window.addEventListener('resize', checkWindowSizeAndExecute);
  };

  if (splash && playButton) {
    document.querySelector(".playButton").addEventListener("click", () => {
    document.querySelector(".splash").style.display = "none";
    });
  };
});
