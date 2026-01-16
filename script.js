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

/*Respect system preferences*/
(function() {
    if (!localStorage.getItem("theme")) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute(
            "data-theme",
            prefersDark ? "dark" : "light"
        );
        localStorage.setItem("theme", prefersDark ? "light" : "dark");
    }
})();

/*Persist the user’s preference*/
(function() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    }
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