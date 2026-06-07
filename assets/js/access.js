const accessForm = document.getElementById("accessForm");
const accessCodeInput = document.getElementById("accessCode");
const accessMessage = document.getElementById("accessMessage");

const apiEndpointUrl =
  "https://script.google.com/macros/s/AKfycbzaNaaYieTrDplI0FIoHXP-JF1KHcEpJfWt2NySk7Dt97ZXlO7R8IBZtF7S5iEK7Lt9/exec";

accessForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const code = accessCodeInput.value.trim().toUpperCase();

  if (!code) {
    showAccessMessage("Ingrese su código de acceso.", "error");
    return;
  }

  showAccessMessage("Validando código...", "success");

  try {
    const response = await fetch(apiEndpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "validateCode",
        code: code
      })
    });

    const result = await response.json();

    if (!result.success || !result.valid) {
      showAccessMessage(
        "Código inválido o registro no aprobado. Revise el correo recibido e intente nuevamente.",
        "error"
      );
      return;
    }

    sessionStorage.setItem("elementoAccess", "true");
    sessionStorage.setItem("elementoAccessCode", result.code || code);
    sessionStorage.setItem("elementoAccessName", result.name || "");

    showAccessMessage("Código validado. Redirigiendo...", "success");

    setTimeout(function () {
      window.location.href = "evento.html";
    }, 700);
  } catch (error) {
    console.error(error);
    showAccessMessage(
      "No se pudo validar el código. Intente nuevamente en unos minutos.",
      "error"
    );
  }
});

function showAccessMessage(message, type) {
  accessMessage.textContent = message;
  accessMessage.className = "form-message " + type;
}