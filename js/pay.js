document.addEventListener("DOMContentLoaded", function() {
    const paymentMethod = document.getElementById("paymentMethod");
    const cardDetails = document.querySelectorAll(".card-details");
    const upiDetails = document.querySelectorAll(".upi-details");
    const emiDetails = document.querySelectorAll(".emi-details");
    const paymentForm = document.getElementById("paymentForm");

    paymentMethod.addEventListener("change", function() {
        togglePaymentDetails(paymentMethod.value);
    });

        paymentForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission
            if (validateForm()) {
                // Redirect to thank you page upon successful validation
                window.location.href = "thankyou.html";
            }
    });

    function togglePaymentDetails(method) {
        hideAllDetails();
        if (method === "card") {
            cardDetails.forEach(detail => detail.style.display = "block");
        } else if (method === "upi") {
            upiDetails.forEach(detail => detail.style.display = "block");
        } else if (method === "emi") {
            emiDetails.forEach(detail => detail.style.display = "block");
        }
    }

    function hideAllDetails() {
        cardDetails.forEach(detail => detail.style.display = "none");
        upiDetails.forEach(detail => detail.style.display = "none");
        emiDetails.forEach(detail => detail.style.display = "none");
    }

    function validateForm() {
        let isValid = true;
        const paymentMethodValue = paymentMethod.value;
        clearErrorMessages();

        if (paymentMethodValue === "card") {
            isValid = validateCardDetails();
        } else if (paymentMethodValue === "upi") {
            isValid = validateUpiDetails();
        } else if (paymentMethodValue === "emi") {
            isValid = validateEmiDetails();
        } else {
            isValid = false;
            alert("Please select a payment method.");
        }

        return isValid;
    }

    function validateCardDetails() {
        let isValid = true;
        const cardNumber = document.getElementById("cardNumber").value;
        const expiry = document.getElementById("expiry").value;
        const cvv = document.getElementById("cvv").value;

        if (!validateCardNumber(cardNumber)) {
            setError("cardNumber", "Invalid card number");
            isValid = false;
        }
        if (!validateExpiryDate(expiry)) {
            setError("expiry", "Invalid or expired date");
            isValid = false;
        }
        if (!validateCVV(cvv)) {
            setError("cvv", "Invalid CVV");
            isValid = false;
        }

        return isValid;
    }

    function validateCardNumber(number) {
        const regex = /^[0-9]{16}$/;
        return regex.test(number);
    }

    function validateExpiryDate(expiry) {
        const [month, year] = expiry.split('/').map(Number);
        if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear() || (year === new Date().getFullYear() && month < (new Date().getMonth() + 1))) {
            return false;
        }
        return true;
    }

    function validateCVV(cvv) {
        const regex = /^[0-9]{3}$/;
        return regex.test(cvv);
    }

    function validateUpiDetails() {
        let isValid = true;
        const upiId = document.getElementById("upiId").value;

        if (!validateUpiId(upiId)) {
            setError("upiId", "Invalid UPI ID");
            isValid = false;
        }

        return isValid;
    }

    function validateUpiId(upiId) {
        const regex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
        return regex.test(upiId);
    }

    function validateEmiDetails() {
        let isValid = true;
        const emiOptions = document.getElementById("emiOptions").value;

        if (!emiOptions) {
            setError("emiOptions", "Please select an EMI option");
            isValid = false;
        }

        return isValid;
    }

    function setError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorMessage = field.nextElementSibling;
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
    }

    function clearErrorMessages() {
        document.querySelectorAll(".error-message").forEach(message => {
            message.textContent = "";
        });
    }

    // Initialize form with hidden details
    hideAllDetails();
});
