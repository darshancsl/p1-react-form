export const validations = (formData) => {
  const { username, email, password, confirmPassword } = formData;

  const newErrors = {};
  if (!/^[A-Za-z][A-Za-z0-9_]{4,24}$/i.test(username)) {
    newErrors.username = "Username must be between 4 to 24 letters";
  }
  if (!/^(?=.{1,81}$)[\w.-]+@[\w.-]+\.\w{2,4}$/i.test(email)) {
    newErrors.email = "Invalid email";
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    newErrors.password =
      "Password must have Minimum 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character:";
  }
  if (password !== confirmPassword || confirmPassword === "") {
    newErrors.confirmPassword = "Password does not match";
  }
  return newErrors;
};