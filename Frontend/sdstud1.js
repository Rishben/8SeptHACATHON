document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.querySelector(".end-page-btn");
    const disabilityCheckbox = document.getElementById("disability-checkbox");
    const diplomaCheckbox = document.getElementById("diploma-checkbox");

    // Initialize fields based on checkbox status
    toggleFields(disabilityCheckbox, document.querySelector(".rectangle:nth-of-type(3)"));
    toggleFields(diplomaCheckbox, document.querySelector(".rectangle:nth-of-type(4)"));

    // Handle Submit button click
    submitButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default button behavior

        // Validate all required sections
        const validationResults = validateSections();

        if (validationResults.valid) {
            // Show success message and redirect to HOME.html
            alert("All details are uploaded successfully,you will be redirected to HOME");
            window.location.href = "HOME.html"; // Redirect to HOME.html
        } else {
            // Show an alert message with the section name and scroll to the first missing section
            alert(`Please fill out all required fields in the ${validationResults.sectionName} section.`);
            scrollToSection(validationResults.firstMissingSection);
        }
    });

    function validateSections() {
        // Define sections and their fields
        const sections = [
            { 
                selector: ".rectangle:nth-of-type(1)", 
                fields: ["#name", "#issueDate", "#certificateNo"], 
                uploads: ["#upload"], 
                name: "Domicile Certificate" 
            },
            { 
                selector: ".rectangle:nth-of-type(2)", 
                fields: ["#adhaarNo", "#nameAdhaar", "#address"], 
                uploads: ["#passportPhoto", "#signaturePhoto", "#adhaarCardPhoto"], 
                name: "Adhaar Details" 
            },
            { 
                selector: ".rectangle:nth-of-type(3)", 
                fields: ["#certificateNoDisability", "#typesOfDisability"], 
                uploads: ["#pwdCertificate"], 
                name: "Disability Certificate", 
                checkbox: disabilityCheckbox 
            },
            { 
                selector: ".rectangle:nth-of-type(4)", 
                fields: ["#uid", "#course", "#yearOfPassing", "#division"], 
                uploads: ["#diplomaCertificate"], 
                name: "Diploma Certificate", 
                checkbox: diplomaCheckbox 
            }
        ];

        for (const section of sections) {
            const sectionElement = document.querySelector(section.selector);
            
            // Skip validation if checkbox is not checked
            if (section.checkbox && !section.checkbox.checked) {
                continue; // Skip this section if checkbox is not checked
            }

            const missingFields = section.fields
                .map(selector => document.querySelector(selector))
                .filter(input => !input.value.trim());

            const missingUploads = section.uploads
                .map(selector => document.querySelector(selector))
                .filter(input => !input.files.length); // Check if file input has files

            if (missingFields.length > 0 || missingUploads.length > 0) {
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
