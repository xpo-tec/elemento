const hasAccess = sessionStorage.getItem("elementoAccess") === "true";

if (!hasAccess) {
  window.location.href = "index.html#access";
}

const questionForm = document.getElementById("questionForm");
const questionMessage = document.getElementById("questionMessage");
const attendeeNameInput = document.getElementById("attendeeName");

const apiEndpointUrl =
  "https://script.google.com/macros/s/AKfycbzaNaaYieTrDplI0FIoHXP-JF1KHcEpJfWt2NySk7Dt97ZXlO7R8IBZtF7S5iEK7Lt9/exec";

const storedName = sessionStorage.getItem("elementoAccessName") || "";
const accessCode = sessionStorage.getItem("elementoAccessCode") || "";

if (storedName && attendeeNameInput) {
  attendeeNameInput.value = storedName;
}

questionForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const attendeeName = attendeeNameInput.value.trim();
  const attendeeQuestion = document
    .getElementById("attendeeQuestion")
    .value.trim();

  if (!attendeeName || !attendeeQuestion) {
    showQuestionMessage("Complete su nombre y su pregunta.", "error");
    return;
  }

  showQuestionMessage("Enviando pregunta...", "success");

  try {
    const response = await fetch(apiEndpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify({
        action: "submitQuestion",
        name: attendeeName,
        code: accessCode,
        question: attendeeQuestion
      })
    });

    const result = await response.json();

    if (!result.success) {
      showQuestionMessage(
        "No se pudo enviar la pregunta. Intente nuevamente.",
        "error"
      );
      return;
    }

    showQuestionMessage("Pregunta enviada correctamente.", "success");
    document.getElementById("attendeeQuestion").value = "";
  } catch (error) {
    console.error(error);
    showQuestionMessage(
      "No se pudo enviar la pregunta. Intente nuevamente.",
      "error"
    );
  }
});

function showQuestionMessage(message, type) {
  questionMessage.textContent = message;
  questionMessage.className = "form-message " + type;
}