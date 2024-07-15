const validateEmail = function (email) {
    const atIndex = email.indexOf("@");
    const hasValidSymbol = atIndex !== -1 && atIndex === email.lastIndexOf("@");
    const username = email.slice(0, atIndex);
    const isGmail = email.includes("gmail");
    const hasMinimumCharacters = username.length >= 2;
    return isGmail && hasMinimumCharacters && hasValidSymbol;
  };
console.log("hhhhh")
  module.exports = validateEmail