export const validateForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required*";
  }
  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required*";
  }

  const email = formData.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.email = "Email is required*";
  } else if (!emailRegex.test(email)) {
    console.log("Invalid email format:", email);
    errors.email = "Invalid email format*";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!formData.password) {
    errors.password = "Password is required*";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password =
      "Password must contain at least 8 characters, including uppercase, lowercase letters, and a special character (!@#$%^&*)*";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password*";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match*";
  }

  if (!formData.agreed) {
    errors.agreed = "You must agree to the Terms of Use and Privacy Policy*";
  }

  return errors;
};
