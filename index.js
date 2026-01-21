const form = document.getElementById("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const button = document.getElementById("btn");
const formMessage = document.getElementById("formMsg");
const r1 = document.getElementById("r1");
const r2 = document.getElementById("r2");
const r3 = document.getElementById("r3");
const r4 = document.getElementById("r4");

// EMAIL VALIDATION PROCESS

function checkEmail() {
  let emailValue = emailInput.value.trim();

  if (emailValue === "") {
    emailError.textContent = "This field cannot be empty!";
    emailInput.className = "invalid";
    return false;
  }

  if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
    emailError.textContent = `Enter a valid email address`;
    emailInput.className = `invalid`;
    return false;
  }

  emailError.textContent = "";
  emailInput.className = "valid";
  return true; // Added return true for validity check
}

// PASSWORD VALIDATION PROCESS

// Uppercase helper function
function hasUpperCase(text) {
  if (text.toLowerCase() !== text) {
    return true;
  } else {
    return false;
  }
}

// Lowercase helper function
function hasLowerCase(text) {
  if (text.toUpperCase() !== text) {
    return true;
  } else {
    return false;
  }
}

// Number helper function
function hasNumber(text) {
  // Fixed: Added 'text' parameter
  let i = 0;

  while (i < text.length) {
    let ch = text[i];

    if (ch >= "0" && ch <= "9") {
      return true;
    }
    i++;
  }

  return false;
}

function passwordChecker() {
  let passwordValue = passwordInput.value;

  // check for length
  if (passwordValue.length >= 8) {
    r1.className = "req ok";
  } else {
    r1.className = "req";
  }

  // check for uppercase
  if (hasUpperCase(passwordValue)) {
    r2.className = "req ok";
  } else {
    r2.className = "req";
  }

  // check for lowercase
  if (hasLowerCase(passwordValue)) {
    r3.className = "req ok";
  } else {
    r3.className = "req";
  }

  // check for 1 number
  if (hasNumber(passwordValue)) {
    r4.className = "req ok";
  } else {
    r4.className = "req";
  }

  // Return true if all requirements are met
  return (
    passwordValue.length >= 8 &&
    hasUpperCase(passwordValue) &&
    hasLowerCase(passwordValue) &&
    hasNumber(passwordValue)
  );
}

// Function to check overall form validity and enable/disable button
function checkFormValidity() {
  const emailValid = checkEmail();
  const passwordValid = passwordChecker();
  button.disabled = !(emailValid && passwordValid);
}

// Add event listeners to inputs for real-time validation
emailInput.addEventListener("input", checkFormValidity);
passwordInput.addEventListener("input", checkFormValidity);

// Form submit handler: Clear fields and reset state
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent actual form submission (remove if you want to submit to a server)

  // Clear input values
  emailInput.value = "";
  passwordInput.value = "";

  // Reset validation states
  emailError.textContent = "";
  emailInput.className = "";
  passwordError.textContent = "";
  // Reset requirement classes
  r1.className = "req";
  r2.className = "req";
  r3.className = "req";
  r4.className = "req";

  // Disable button and show success message
  button.disabled = true;
  formMessage.textContent = "Account created successfully!"; // Optional feedback
});

// Initial check (in case inputs have values on load)
checkFormValidity();
