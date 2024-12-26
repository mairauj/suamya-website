document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.querySelectorAll(".box");
    const totalPriceElement = document.getElementById("total-price");
    const proceedPaymentButton = document.getElementById("proceed-payment");

    function updateTotalPrice() {
        let totalPrice = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector(".content span").innerText.replace("$", ""));
            const quantity = parseInt(item.querySelector(".content input").value);
            totalPrice += price * quantity;
        });
        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    cartItems.forEach(item => {
        const quantityInput = item.querySelector(".content input");
        quantityInput.addEventListener("input", updateTotalPrice);

        const removeButton = item.querySelector(".remove-item");
        removeButton.addEventListener("click", () => {
            item.remove();
            updateTotalPrice();
        });
    });

    proceedPaymentButton.addEventListener("click", () => {
        window.location.href = "payment.html";
    });

    updateTotalPrice();
});
