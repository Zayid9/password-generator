let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");
let messageBox = document.getElementById("message");

// Set the default slider value to 10
sliderValue.textContent = inputSlider.value = 10;

inputSlider.addEventListener("input", () => {
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener("click", () => {
    if (!lowercase.checked && !uppercase.checked && !numbers.checked && !symbols.checked) {
        showMessage("Please select at least one option to generate a password!", "error");
        return;
    }
    passBox.value = generatePassword();
    showMessage("Password generated successfully!", "success");
});

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

// Function to generate Password
function generatePassword() {
    let genPassword = "";
    let allChars = "";

    allChars += lowercase.checked ? lowerChars : "";
    allChars += uppercase.checked ? upperChars : "";
    allChars += numbers.checked ? allNumbers : "";
    allChars += symbols.checked ? allSymbols : "";

    if (allChars === "" || allChars.length === 0) {
        return genPassword;
    }

    let i = 1;
    while (i <= inputSlider.value) {
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        i++;
    }

    return genPassword;
}

copyIcon.addEventListener("click", () => {
    if (passBox.value !== "" || passBox.value.length >= 1) {
        navigator.clipboard.writeText(passBox.value);
        copyIcon.innerText = "check";
        copyIcon.title = "Password Copied";
        showMessage("Password copied to clipboard!", "success");

        setTimeout(() => {
            copyIcon.innerHTML = "content_copy";
            copyIcon.title = "";
        }, 3000);
    }
});

// Function to show a user-friendly message
function showMessage(message, type) {
    messageBox.textContent = message;
    messageBox.classList.remove("hidden", "bg-red-500", "bg-green-500");
    if (type === "error") {
        messageBox.classList.add("bg-red-500");
    } else if (type === "success") {
        messageBox.classList.add("bg-green-500");
    }

    // Hide the message after 3 seconds
    setTimeout(() => {
        messageBox.classList.add("hidden");
    }, 3000);
}