document.addEventListener("DOMContentLoaded", function () {
    const nextPageButton = document.querySelector(".next-page-btn");
    const scStToggle = document.getElementById("sc-st-toggle");
    const familyIncomeSection = document.querySelector(".family-income-certificate");
    const scStSection = document.querySelector(".sc-st-certificate");

    // Initialize fields based on checkbox status
    toggleFields(scStToggle, scStSection);

    // Handle Next Page button click
    nextPageButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Validate all required sections
        const validationResults = validateSections();

        if (validationResults.valid) {
            // Redirect to next page if all validations pass
            window.location.href = "sdstud1.html";
        } else {
            // Scroll to the first missing section and alert the user
            scrollToSection(validationResults.firstMissingSection);
            alert(`Please fill out all required fields in the ${validationResults.sectionName} section.`);
        }
    });

    function validateSections() {
        // Define sections and their fields
        const sections = [
            { selector: ".marks10th", fields: ["#Uniqueid", "#Institution10th", "#Board", "#English", "#Socialscience", "#Hindi", "#Math", "#Science", "#Subject6"], name: "10th Marks Card" },
            { selector: ".marks12th", fields: ["#Registereno", "#Institution12th", "#Course", "#English12th", "#Hindi12th", "#Biology12th", "#Math12th", "#Physics12th", "#Chemistry12th"], name: "12th Marks Card" },
            { selector: ".family-income-certificate", fields: ["#cert-no", "#working-family", "#relation", "#total-income"], name: "Family Income Certificate" }
        ];

        // Add SC/ST Certificate section if applicable
        if (scStToggle.checked) {
            sections.push({ selector: ".sc-st-certificate", fields: ["#sc-st-cert-no", "#father-name", "#date-of-issue", "#religion"], name: "SC/ST Certificate" });
        }

        for (const section of sections) {
            const sectionElement = document.querySelector(section.selector);
            const missingFields = section.fields
                .map(selector => document.querySelector(selector))
                .filter(input => !input.value.trim());

            if (missingFields.length > 0) {
                return {
                    valid: false,
                    firstMissingSection: sectionElement,
                    sectionName: section.name
                };
            }
        }
        return { valid: true };
    }

    function scrollToSection(section) {
        const rect = section.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top - 100; // Offset for better visibility

        window.scrollTo({
            top: offsetTop,
            behavior: "smooth"
        });
    }

    function toggleFields(checkbox, section) {
        const fields = section.querySelectorAll("input[type='text'], input[type='file']");
        const alerts = {
            text: "This field is disabled until the checkbox is selected.",
            file: "File upload is disabled until the checkbox is selected."
        };

        // Disable fields initially
        fields.forEach(field => {
            field.disabled = !checkbox.checked;
            field.addEventListener("focus", function () {
                if (!checkbox.checked) {
                    alert(field.type === "file" ? alerts.file : alerts.text);
                    field.blur(); // Prevent user from typing
                }
            });
        });

        checkbox.addEventListener("change", function () {
            fields.forEach(field => {
                field.disabled = !checkbox.checked;
                if (field.disabled) {
                    field.value = ""; // Clear value if disabled
                }
            });
        });
    }
});
