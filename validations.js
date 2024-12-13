const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const usernameInput = document.getElementById("username");
const cpasswordInput = document.getElementById("cpassword");
const submitbtn = document.getElementById("submit");
const cpasswordMsg = document.getElementById("cpasswordMsg");
const emailMsg = document.getElementById("emailMsg");
const usernameMsg = document.getElementById("usernameMsg");
const popup_p = document.getElementById("passwordConditions");
const popup_cp = document.getElementById("cpasswordCondition");
const popup_u = document.getElementById("usernameCondition");
const popup_e = document.getElementById("emailConditions");

let isPasswordValid,
	isCPasswordValid,
	isUsernameValid,
	isEmailValid = false;

submitbtn.disabled = true;

usernameInput.addEventListener("input", () => {
	const username = usernameInput.value;
	popup_u.innerText = "Must contain atleast 3 alphabets.";
	const reg = /^[A-Za-z]{3,}$/;
	if (reg.test(username)) {
		isUsernameValid = true;
		popup_u.style.display = "none";
		usernameInput.style.border = "2px solid green";
	} else {
		isUsernameValid = false;
		popup_u.style.display = "block";
		usernameInput.style.border = "2px solid red";
	}
	enableSubmitButton();
});
emailInput.addEventListener("input", () => {
	const email = emailInput.value;
	const reg = /([A-Za-z0-9_\.]+)@([A-Za-z0-9]+)\.([a-z]+)(\.[a-z]+)?/;
	popup_e.innerText = "Enter a valid email.";
	if (reg.test(email)) {
		isEmailValid = true;
		popup_e.style.display = "none";
		emailInput.style.border = "2px solid green";
	} else {
		isEmailValid = false;
		popup_e.style.display = "block";
		emailInput.style.border = "2px solid red";
	}
	enableSubmitButton();
});

passwordInput.addEventListener("input", () => {
	cpasswordInput.value = "";

	const password = passwordInput.value;
	const length = /^.{8,}$/;
	const alpha = /[A-Za-z]/;
	const special = /[@$&]/;
	var conditions = [];

	let len,
		alp,
		spc = false;
	if (length.test(password)) len = true;
	else {
		conditions.push("Password must be at least 8 characters long.");
		len = false;
	}
	if (alpha.test(password)) alp = true;
	else {
		conditions.push("Password must contain atleast 1 alphabet.");
		alp = false;
	}
	if (special.test(password)) spc = true;
	else {
		conditions.push("Password must contain atleast 1 special character.");
		spc = false;
	}
	popup_p.innerHTML = conditions.join("<br>");
	if (len && alp && spc) {
		isPasswordValid = true;
		popup_p.style.display = "none";
		passwordInput.style.border = "2px solid green";
	} else {
		isPasswordValid = false;
		popup_p.style.display = "block";
		passwordInput.style.border = "2px solid red";
	}
	enableSubmitButton();
});

cpasswordInput.addEventListener("input", () => {
	const password = passwordInput.value;
	const cpassword = cpasswordInput.value;
	popup_cp.innerText = "Password dosen't match.";
	if (cpassword === password) {
		isCPasswordValid = true;
		popup_cp.style.display = "none";
		cpasswordInput.style.border = "2px solid green";
	} else {
		isCPasswordValid = false;
		popup_cp.style.display = "block";
		cpasswordInput.style.border = "2px solid red";
	}
	enableSubmitButton();
});

function enableSubmitButton() {
	if (isUsernameValid && isEmailValid && isPasswordValid && isCPasswordValid)
		submitbtn.disabled = false;
	else submitbtn.disabled = true;
}

usernameInput.addEventListener("blur", () => {
	popup_u.style.display = "none";
});
emailInput.addEventListener("blur", () => {
	popup_e.style.display = "none";
});
passwordInput.addEventListener("blur", () => {
	popup_p.style.display = "none";
});
cpasswordInput.addEventListener("blur", () => {
	popup_cp.style.display = "none";
});