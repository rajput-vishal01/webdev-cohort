const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const resultDiv = document.getElementById("result");

calculateBtn.addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const time = parseFloat(document.getElementById("time").value);

  if (
    isNaN(amount) ||
    isNaN(rate) ||
    isNaN(time) ||
    amount <= 0 ||
    rate <= 0 ||
    time <= 0
  ) {
    resultDiv.textContent =
      "Please enter valid positive values for all fields.";
    resultDiv.style.color = "red";
    return;
  }

  const interest = (amount * rate * time) / 100;

  resultDiv.textContent = `The calculated interest is: ₹${interest.toFixed(2)}`;
  resultDiv.style.color = "#007BFF";
});

resetBtn.addEventListener("click", () => {
  resultDiv.textContent = "";
});
