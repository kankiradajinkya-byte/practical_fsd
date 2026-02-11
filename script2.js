const form = document.getElementById("regForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const prnInput = document.getElementById("prn");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const prnError = document.getElementById("prnError");
const result = document.getElementById("result");


function validateName() {
  let name = nameInput.value.trim();

  if (name === "") {
    nameError.textContent = "Name is required";
    return false;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    nameError.textContent = "Only letters allowed";
    return false;
  }

  if (name.length < 2) {
    nameError.textContent = "Name too short";
    return false;
  }

  nameError.textContent = "";
  return true;
}


function validateEmail() {
  let email = emailInput.value.trim();

  if (email === "") {
    emailError.textContent = "Email is required";
    return false;
  }

  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Enter valid email";
    return false;
  }

  emailError.textContent = "";
  return true;
}


function validatePRN() {
  let prn = prnInput.value.trim();

  if (prn === "") {
    prnError.textContent = "PRN is required";
    return false;
  }

  if (isNaN(prn)) {
    prnError.textContent = "PRN must contain numbers only";
    return false;
  }

  if (prn.length < 6) {
    prnError.textContent = "PRN must be at least 6 digits";
    return false;
  }

  prnError.textContent = "";
  return true;
}


nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);

// remove letters automatically
prnInput.addEventListener("input", function () {
  prnInput.value = prnInput.value.replace(/[^0-9]/g, "");
  validatePRN();
});


form.addEventListener("submit", function (e) {
  e.preventDefault();

  result.textContent = "";

  let okName = validateName();
  let okEmail = validateEmail();
  let okPRN = validatePRN();

  if (okName && okEmail && okPRN) {
    result.textContent = "Registration Successful ✅";
  }
});


form.addEventListener("reset", function () {
  nameError.textContent = "";
  emailError.textContent = "";
  prnError.textContent = "";
  result.textContent = "";
});
