export const validateUpdateForm = (formData) => {
  let errors = "";

  if (!formData.firstName.trim()) {
    return (errors = "First name is required*");
  }
  if (!formData.lastName.trim()) {
    return (errors = "Last name is required*");
  }

  const email = formData.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors = "Email is required*";
    return;
  } else if (!emailRegex.test(email)) {
    console.log("Invalid email format:", email);
    return (errors = "Invalid email format*");
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!formData.password) {
    return (errors = "Password is required*");
  } else if (!passwordRegex.test(formData.password)) {
    return (errors =
      "Password must contain at least 8 characters, including uppercase, lowercase letters, and a special character (!@#$%^&*)*");
  }

  if (!formData.confirmPassword) {
    return (errors = "Please confirm your password*");
  } else if (formData.password !== formData.confirmPassword) {
    return (errors = "Passwords and ConfirmPassword do not match*");
  }

  return errors;
};
