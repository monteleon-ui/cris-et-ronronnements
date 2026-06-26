// Charger les questions depuis le fichier JSON
let allQuestions = [];
let currentQuestionIndex = 0;

async function loadQuestions() {
    try {
        const response = await fetch('../assets/data/questions.json');
        const data = await response.json();
        allQuestions = data.questions;
        loadCurrentQuestion();
    } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
        alert("Impossible de charger les questions. Veuillez réessayer plus tard.");
    }
}

// Charger la question actuelle
function loadCurrentQuestion() {
    const questionId = getCurrentQuestionId();
    const question = allQuestions.find(q => q.id === questionId);

    if (!question) {
        redirectToFirstUnansweredQuestion();
        return;
    }

    const container = document.getElementById('question-container');
    let questionHTML = `
        <div class="card my-4">
            <div class="card-header bg-primary text-white">
                <h2 class="h4 mb-0">Question ${allQuestions.indexOf(question) + 1} / ${allQuestions.length} : ${question.title}</h2>
            </div>
            <div class="card-body">
                <img src="../assets/images/${question.image}" alt="Illustration pour ${question.title}" class="img-fluid mb-3" style="max-width: 400px;">
                <p class="card-text">${question.description}</p>
                <form id="questionForm">
    `;

    // Ajouter le champ de réponse en fonction du type de question
    if (question.type === "texte_libre") {
        questionHTML += `
            <div class="mb-3">
                <label for="response" class="form-label">Votre réponse :</label>
                <textarea class="form-control" id="response" name="response" rows="4" ${question.required ? 'required' : ''}></textarea>
            </div>
        `;
    } else if (question.type === "choix_unique") {
        questionHTML += `
            <fieldset class="mb-3">
                <legend class="fw-bold">Choisissez une seule réponse :</legend>
                <div class="form-check">
        `;
        question.options.forEach((option, index) => {
            questionHTML += `
                <input class="form-check-input" type="radio" id="option${index}" name="response" value="${option}" ${question.required ? 'required' : ''}>
                <label class="form-check-label" for="option${index}">${option}</label><br>
            `;
        });
        questionHTML += `
                </div>
            </fieldset>
        `;
    } else if (question.type === "choix_multiples") {
        questionHTML += `
            <fieldset class="mb-3">
                <legend class="fw-bold">Cochez toutes les réponses qui s'appliquent :</legend>
                <div class="form-check">
        `;
        question.options.forEach((option, index) => {
            questionHTML += `
                <input class="form-check-input" type="checkbox" id="option${index}" name="response" value="${option}">
                <label class="form-check-label" for="option${index}">${option}</label><br>
            `;
        });
        questionHTML += `
                </div>
            </fieldset>
        `;
    }

    // Ajouter les boutons
    questionHTML += `
                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-primary" onclick="saveResponse('${question.id}')">Sauvegarder et continuer</button>
                    <a href="../information/${question.theme}.html" class="btn btn-outline-secondary">Voir les informations liées</a>
                </div>
                </form>
            </div>
        </div>
    `;

    container.innerHTML = questionHTML;

    // Charger la réponse sauvegardée si elle existe
    loadResponse(question.id, question.type);
}

// Sauvegarder une réponse (adaptée pour tous les types)
function saveResponse(questionId) {
    const question = allQuestions.find(q => q.id === questionId);
    let response;

    if (question.type === "texte_libre") {
        response = document.getElementById('response').value;
    } else if (question.type === "choix_unique") {
        const selectedOption = document.querySelector('input[name="response"]:checked');
        response = selectedOption ? selectedOption.value : null;
    } else if (question.type === "choix_multiples") {
        const selectedOptions = Array.from(document.querySelectorAll('input[name="response"]:checked')).map(el => el.value);
        response = selectedOptions;
    }

    // Vérifier si la réponse est requise
    if (question.required && !response) {
        alert("Cette question est obligatoire. Veuillez répondre.");
        return;
    }

    // Sauvegarder la réponse
    let responses = JSON.parse(localStorage.getItem('questionnaireResponses')) || {};
    responses[questionId] = response;
    localStorage.setItem('questionnaireResponses', JSON.stringify(responses));
    localStorage.setItem('lastQuestionAnswered', questionId);

    alert("Votre réponse a été sauvegardée localement. Vous pouvez reprendre plus tard.");

    // Passer à la question suivante
    const nextQuestionId = getNextQuestion(questionId);
    window.location.href = `question.html?question=${nextQuestionId}`;
}

// Charger une réponse sauvegardée (adaptée pour tous les types)
function loadResponse(questionId, questionType) {
    let responses = JSON.parse(localStorage.getItem('questionnaireResponses')) || {};
    if (!responses[questionId]) return;

    const savedResponse = responses[questionId];

    if (questionType === "texte_libre") {
        document.getElementById('response').value = savedResponse;
    } else if (questionType === "choix_unique") {
        const option = document.querySelector(`input[name="response"][value="${savedResponse}"]`);
        if (option) option.checked = true;
    } else if (questionType === "choix_multiples") {
        savedResponse.forEach(value => {
            const option = document.querySelector(`input[name="response"][value="${value}"]`);
            if (option) option.checked = true;
        });
    }
}

// Obtenir l'ID de la question actuelle depuis l'URL
function getCurrentQuestionId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('question') || allQuestions[0].id;
}

// Obtenir la prochaine question
function getNextQuestion(currentQuestionId) {
    const currentIndex = allQuestions.findIndex(q => q.id === currentQuestionId);
    if (currentIndex < allQuestions.length - 1) {
        return allQuestions[currentIndex + 1].id;
    } else {
        return "fin"; // Page de fin
    }
}

// Charger une réponse sauvegardée
function loadResponse(questionId) {
    let responses = JSON.parse(localStorage.getItem('questionnaireResponses')) || {};
    if (responses[questionId]) {
        document.getElementById('response').value = responses[questionId];
    }
}

// Rediriger vers la première question non répondue
function redirectToFirstUnansweredQuestion() {
    const responses = JSON.parse(localStorage.getItem('questionnaireResponses')) || {};
    for (let i = 0; i < allQuestions.length; i++) {
        if (!responses[allQuestions[i].id]) {
            window.location.href = `question.html?question=${allQuestions[i].id}`;
            return;
        }
    }
    // Si toutes les questions ont été répondues
    window.location.href = "fin.html";
}

// Initialiser le questionnaire
window.onload = function() {
    loadQuestions();
};