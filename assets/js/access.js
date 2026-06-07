const accessForm = document.getElementById("accessForm");
const accessCodeInput = document.getElementById("accessCode");
const accessMessage = document.getElementById("accessMessage");

// Temporary local codes for development.
// Replace later with Apps Script Web App validation.
const validCodes = ["TEST1", "A7K9P", "M3Q8X"];

accessForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const code = accessCodeInput.value.trim().toUpperCase();

  if (!code) {
    showAccessMessage("Ingrese su código de acceso.", "error");
    return;
  }

  if (!validCodes.includes(code)) {
    showAccessMessage("Código inválido. Revise el correo recibido e intente nuevamente.", "error");
    return;
  }

  sessionStorage.setItem("elementoAccess", "true");
  sessionStorage.setItem("elementoAccessCode", code);

  showAccessMessage("Código validado. Redirigiendo...", "success");

  setTimeout(function () {
    window.location.href = "evento.html";
  }, 700);
});

function showAccessMessage(message, type) {
  accessMessage.textContent = message;
  accessMessage.className = "form-message " + type;
}