// Get HTML Elements
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const calculateBtn = document.getElementById("calculateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const result = document.getElementById("result");

// Store the calculated BMI result
let currentResult = "";

// BMI Calculation
calculateBtn.addEventListener("click", () => {

    const weight = Number(weightInput.value);
    const heightCm = Number(heightInput.value);

    // Validate empty inputs
    if (
        weightInput.value.trim() === "" ||
        heightInput.value.trim() === ""
    ) {
        result.textContent = "";
        currentResult = "";
        alert("Please enter both weight and height!");
        return;
    }

    // Validate numeric values
    if (!Number.isFinite(weight) || !Number.isFinite(heightCm)) {
        result.textContent = "";
        currentResult = "";
        alert("Please enter valid numbers!");
        return;
    }

    // Validate positive values
    if (weight <= 0 || heightCm <= 0) {
        result.textContent = "";
        currentResult = "";
        alert("Weight and height must be greater than zero!");
        return;
    }

    // Convert height from cm to meters
    const height = heightCm / 100;

    // Calculate BMI
    const bmi = weight / (height * height);
    const roundedBMI = bmi.toFixed(1);

    // Determine BMI Category
    let status = "";

    if (bmi < 18.5) {
        status = "Underweight 😕";
    } else if (bmi < 25) {
        status = "Normal 👍";
    } else if (bmi < 30) {
        status = "Overweight ⚠️";
    } else {
        status = "Obese 🚨";
    }

    // Display Result
    currentResult = `Your BMI is ${roundedBMI} — ${status}`;

    result.textContent = currentResult;

    // Restart Result Animation
    result.style.animation = "none";
    void result.offsetWidth;
    result.style.animation = "bounce 0.8s";

    // Confetti Effect
    if (typeof confetti === "function") {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Success Message
    setTimeout(() => {
        alert("Share your BMI with friends! 🎉");
    }, 500);

});


// Floating Confetti Background
if (typeof confetti === "function") {

    setInterval(() => {

        confetti({
            particleCount: 3,
            spread: 60,
            origin: {
                x: Math.random(),
                y: 0
            },
            colors: ['#ff0', '#f0f', '#0ff', '#fff'],
            ticks: 200,
            gravity: 0.1
        });

    }, 800);

}


// Download BMI Result as Image
downloadBtn.addEventListener("click", () => {

    if (!currentResult) {
        alert("Calculate your BMI first!");
        return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = 700;
    canvas.height = 250;

    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#ff512f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Text
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";

    ctx.font = "bold 30px Poppins, sans-serif";
    ctx.fillText(
        "BMI Calculator",
        canvas.width / 2,
        80
    );

    // BMI Result
    ctx.font = "24px Poppins, sans-serif";

    ctx.fillText(
        currentResult,
        canvas.width / 2,
        145
    );

    // Footer
    ctx.font = "16px Poppins, sans-serif";

    ctx.fillText(
        "Check your body mass index!",
        canvas.width / 2,
        200
    );

    // Download Image
    const link = document.createElement("a");

    link.download = "my_bmi_result.png";
    link.href = canvas.toDataURL("image/png");

    link.click();

});


// Copy BMI Result to Clipboard
copyBtn.addEventListener("click", async () => {

    if (!currentResult) {
        alert("Calculate your BMI first!");
        return;
    }

    try {

        await navigator.clipboard.writeText(currentResult);

        alert("BMI result copied successfully! ✅");

    } catch (error) {

        alert("Oops! Unable to copy. Please try again.");

        console.error("Clipboard Error:", error);

    }

});