
function checkRegisterForm(name, email, password, confirmPassword) {
  if (name.length < 2) return [false, "Name muss mindestens 2 Zeichen haben."];
  if (!email.includes("@") || !email.includes("."))
    return [false, "Bitte E-Mail überprüfen."];
  if (password.length < 5)
    return [false, "Passwort muss mindestens 6 Zeichen haben."];
  if (password !== confirmPassword)
    return [false, "Passwörter stimmen nicht überein."];
   return [true];
}

export { checkRegisterForm };
