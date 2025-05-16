document.addEventListener("DOMContentLoaded", function () {
    const optionButtons = document.querySelectorAll(".option-btn");

    optionButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (this.innerText === "Get Pass") {
                window.location.href = "gate-pass.html";
            } else if (this.innerText === "Apply Now") {
                window.location.href = "semester-pass.html";
            } else {
                alert("Functionality coming soon!");
            }
        });
    });
});
