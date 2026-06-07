const hasAccess = sessionStorage.getItem("elementoAccess") === "true";

if (!hasAccess) {
  window.location.href = "index.html#access";
}

const questionForm = document.getElementById("questionForm");
const questionMessage = document.getElementById("questionMessage");

// Pending: replace with Apps Script Web App URL.
const questionEndpointUrl = "";

questionForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const attendeeName = document.getElementById("attendeeName").value.trim();
  const attendeeQuestion = document.getElementById("attendeeQuestion").value.trim();
  const accessCode = sessionStorage.getItem("elementoAccessCode") || "";

  if (!attendeeName || !attendeeQuestion) {
    showQuestionMessage("Complete su nombre y su pregunta.", "error");
    return;
  }

  if (!questionEndpointUrl) {
    console.log({
      attendeeName,
      attendeeQuestion,
      accessCode,
      timestamp: new Date().toISOString()
    });

    showQuestionMessage(
      "Pregunta registrada en modo prueba. Falta conectar el formulario a Google Sheets.",
      "success"
    );

    questionForm.reset();
    return;
  }

  try {
    const response = await fetch(questionEndpointUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        attendeeName,
        attendeeQuestion,
        accessCode,
        timestamp: new Date().toISOString()
      })
    });

    showQuestionMessage("Pregunta enviada correctamente.", "success");
    questionForm.reset();
  } catch (error) {
    console.error(error);
    showQuestionMessage("No se pudo enviar la pregunta. Intente nuevamente.", "error");
  }
});

function showQuestionMessage(message, type) {
  questionMessage.textContent = message;
  questionMessage.className = "form-message " + type;
}