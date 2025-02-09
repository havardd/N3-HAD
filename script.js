let currentStep = 0;

async function getTextSuggestion(inputText, fieldId) {
    try {
        console.log('Sending request to AI model with input:', inputText); // Legg til logging her
        const response = await fetch('http://localhost:4000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputText })
        });
        if (!response.ok) {
            if (response.status === 405) {
                console.error('HTTP error 405: Method Not Allowed. Please check the server configuration.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data); // Legg til logging her
        return data.suggestion;
    } catch (error) {
        console.error('Error generating text suggestion:', error);
        return 'Error fetching suggestion'; // Returner en feilmelding
    }
}

function nextStep() {
    saveData();
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep++;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    updateProgressBar();
    updateProgressBarIndicator();
}

function prevStep() {
    if (currentStep === 6) { // If currently on the summary page
        document.getElementById('summary').classList.remove('active');
        currentStep = 5; // Go back to step 5
    } else {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep--;
    }
    document.getElementById(`step-${currentStep}`).classList.add('active');
    updateProgressBar();
    updateProgressBarIndicator();
}

function showSummary() {
    saveData();
    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = `
        <h3>Prosjektets navn</h3>
        <p>${document.getElementById('prosjekt-navn').value}</p>
        <h3>Hvor jobber dere?</h3>
        <p>${document.getElementById('arbeidssted').value}</p>
        <h3>Behov</h3>
        <p>${document.getElementById('behov-beskrivelse').value}</p>
        <h3>Løsning</h3>
        <p>${document.getElementById('losning-beskrivelse').value}</p>
        <h3>Pådriver</h3>
        <p>${document.getElementById('padriver-navn').value}</p>
        <h3>Team</h3>
        <p>${document.getElementById('team-medlemmer').value}</p>
        <h3>Forankring</h3>
        <p>${document.getElementById('forankring-beskrivelse').value}</p>
    `;
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = 6; // Set current step to summary
    document.getElementById('summary').classList.add('active');
    updateProgressBar();
}

function saveData() {
    const data = {
        prosjektNavn: document.getElementById('prosjekt-navn').value,
        arbeidssted: document.getElementById('arbeidssted').value,
        behov: document.getElementById('behov-beskrivelse').value,
        losning: document.getElementById('losning-beskrivelse').value,
        padriver: document.getElementById('padriver-navn').value,
        team: document.getElementById('team-medlemmer').value,
        forankring: document.getElementById('forankring-beskrivelse').value
    };
    localStorage.setItem('projectData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('projectData'));
    if (data) {
        document.getElementById('prosjekt-navn').value = data.prosjektNavn;
        document.getElementById('arbeidssted').value = data.arbeidssted;
        document.getElementById('behov-beskrivelse').value = data.behov;
        document.getElementById('losning-beskrivelse').value = data.losning;
        document.getElementById('padriver-navn').value = data.padriver;
        document.getElementById('team-medlemmer').value = data.team;
        document.getElementById('forankring-beskrivelse').value = data.forankring;
    }
}

function resetForm() {
    localStorage.removeItem('projectData');
    document.querySelectorAll('textarea, input').forEach(input => input.value = '');
    currentStep = 0;
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById('step-0').classList.add('active');
    updateProgressBar();
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Set document properties
    doc.setProperties({
        title: 'Prosjektrapport',
        subject: 'Oppsummering av prosjekt',
        author: 'Ditt Navn',
        keywords: 'prosjekt, rapport, oppsummering',
        creator: 'Ditt Navn'
    });

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Prosjektrapport", 105, 20, null, null, 'center');

    // Add a line under the title
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Add current date
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Dato: ${currentDate}`, 10, 30);

    // Add project details
    const addSection = (title, content, yPosition) => {
        doc.setFontSize(16);
        doc.setTextColor(60, 60, 60);
        doc.text(title, 10, yPosition);
        doc.setFontSize(14);
        doc.setTextColor(80, 80, 80);
        doc.text(content, 10, yPosition + 10);
    };

    let yPosition = 40;
    addSection("Prosjektets navn:", document.getElementById('prosjekt-navn').value, yPosition);
    yPosition += 30;
    addSection("Hvor jobber dere?", document.getElementById('arbeidssted').value, yPosition);
    yPosition += 30;
    addSection("Behov:", document.getElementById('behov-beskrivelse').value, yPosition);
    yPosition += 30;
    addSection("Løsning:", document.getElementById('losning-beskrivelse').value, yPosition);
    yPosition += 30;
    addSection("Pådriver:", document.getElementById('padriver-navn').value, yPosition);
    yPosition += 30;
    addSection("Team:", document.getElementById('team-medlemmer').value, yPosition);
    yPosition += 30;
    addSection("Forankring:", document.getElementById('forankring-beskrivelse').value, yPosition);

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Generert av Ditt Navn", 105, 290, null, null, 'center');

    doc.save('prosjektrapport.pdf');
}

function setWizardTexts() {
    document.getElementById('step-0-text').textContent = wizardTexts.step0.text;
    document.getElementById('step-1-title').textContent = wizardTexts.step1.title;
    document.getElementById('step-1-description').textContent = wizardTexts.step1.description;
    document.getElementById('step-1-intro-text').textContent = wizardTexts.step1.introText;
    document.getElementById('step-2-title').textContent = wizardTexts.step2.title;
    document.getElementById('step-2-description').textContent = wizardTexts.step2.description;
    document.getElementById('step-2-intro-text').textContent = wizardTexts.step2.introText;
    document.getElementById('step-3-title').textContent = wizardTexts.step3.title;
    document.getElementById('step-3-description').textContent = wizardTexts.step3.description;
    document.getElementById('step-3-intro-text').textContent = wizardTexts.step3.introText;
    document.getElementById('step-4-title').textContent = wizardTexts.step4.title;
    document.getElementById('step-4-description').textContent = wizardTexts.step4.description;
    document.getElementById('step-4-intro-text').textContent = wizardTexts.step4.introText;
    document.getElementById('step-5-title').textContent = wizardTexts.step5.title;
    document.getElementById('step-5-description').textContent = wizardTexts.step5.description;
    document.getElementById('step-5-intro-text').textContent = wizardTexts.step5.introText;
    document.getElementById('summary-title').textContent = wizardTexts.summary.title;
    document.getElementById('summary-prev-button').textContent = wizardTexts.summary.prevButton;
    document.getElementById('summary-export-button').textContent = wizardTexts.summary.exportButton;
    document.getElementById('summary-reset-button').textContent = wizardTexts.summary.resetButton;
}

function updateProgressBar() {
    const progressBars = document.querySelectorAll('.progress-bar div');
    progressBars.forEach((bar, index) => {
        if (index < currentStep) {
            bar.classList.add('completed');
            bar.classList.remove('active');
        } else if (index === currentStep) {
            bar.classList.add('active');
            bar.classList.remove('completed');
        } else {
            bar.classList.remove('active', 'completed');
        }
    });
}

function updateProgressBarIndicator() {
    const progressIndicator = document.getElementById('progress-indicator');
    if (progressIndicator) {
        progressIndicator.textContent = `Steg ${currentStep + 1}`;
    } else {
        console.error('Element with ID "progress-indicator" not found');
    }
}

async function handleAISuggestionClick(event) {
    const textarea = event.target.previousElementSibling;
    const inputText = textarea.value;
    if (inputText) {
        const suggestion = await getTextSuggestion(inputText, textarea.id);
        textarea.value = suggestion;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setWizardTexts();
    updateProgressBar();
    updateProgressBarIndicator();
});
