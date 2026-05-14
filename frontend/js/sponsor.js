// step elemnts

const steps = document.querySelectorAll(".step");
const indicators = document.querySelectorAll(".step-indicator");
const lines = document.querySelectorAll(".line");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let currentStep = 0;

showStep(currentStep); // initialize

function showStep(stepIndex) {
    // hide all steps
    steps.forEach((step) => {
        step.classList.remove("active");
    });

    // show current step
    steps[stepIndex].classList.add("active");

    // update circles + lines
    updateStepper();

    // update buttons
    updateButtons();
}


function updateStepper() {
    indicators.forEach((indicator, index) => {
        indicator.classList.remove(
            "active",
            "completed"
        );

        // completed steps
        if (index < currentStep) {
            indicator.classList.add(
                "completed"
            );
        } else if (index === currentStep) { // current step
            indicator.classList.add(
                "active"
            );
        }

    });

    // update lines
    lines.forEach((line, index) => {
        if (index < currentStep) {
            line.classList.add("active");
        } else {
            line.classList.remove("active");
        }
    });

}

function updateButtons() {
    // first step
    if (currentStep === 0) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "inline-block";
    }

    // last step
    if (currentStep === steps.length - 1) {
        nextBtn.textContent = "Submit";
    } else {
        nextBtn.textContent = "Continue";
    }

}

// next button listener
nextBtn.addEventListener("click", () => {

    // last step = submit
    if (currentStep === steps.length - 1) {
        document
            .getElementById("sponsorForm")
            .submit();
        return;
    }

    if (!validateStep()) {
        return;
    }

    currentStep++;
    showStep(currentStep);
});

// next button listener
prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
});


// validation
function validateStep() {

    const currentStepElement =
        steps[currentStep];

    const requiredInputs =
        currentStepElement.querySelectorAll(
            "input[required], select[required]"
        );

    let valid = true;


    requiredInputs.forEach((input) => {

        // remove old error style
        input.classList.remove("input-error");


        // empty field
        if (!input.value.trim()) {
            valid = false;
            input.classList.add("input-error");
        }

    });


    return valid;
}

// sponsor type selection
const sponsorOptions =
    document.querySelectorAll(".sponsor-option");


sponsorOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // remove previous active
        sponsorOptions.forEach((btn) => {
            btn.classList.remove("selected");
        });

        // add active
        option.classList.add("selected");

        // save value
        const sponsorType = option.dataset.type;
        document.getElementById("sponsorTypeInput").value = sponsorType;
    });

});


// ======================
// OPTIONAL:
// PREVENT ENTER SUBMIT
// ======================

document
    .getElementById("sponsorForm")
    .addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
        }

    });