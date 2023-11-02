function addEventListenersToProjects() {
    const projects = document.querySelectorAll(".project");

    projects.forEach(project => {
        project.addEventListener("mouseover", () => {
            const projectImages = project.querySelector(".project-images");
            projectImages.classList.add("project-images-visible");
        });

        project.addEventListener("mouseout", () => {
            const projectImages = project.querySelector(".project-images");
            projectImages.classList.remove("project-images-visible");
        });
    });
}

function checkWindowSizeAndExecute() {
    if (window.innerWidth >= 768) {
        addEventListenersToProjects();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    checkWindowSizeAndExecute();
    window.addEventListener('resize', checkWindowSizeAndExecute);
});