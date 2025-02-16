let currentStep = 0;

async function getTextSuggestion(inputText, fieldId) {
    try {
        console.log('Sending request to AI model with input:', inputText);
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
        console.log('API response:', data);
        return data.suggestion;
    } catch (error) {
        console.error('Error generating text suggestion:', error);
        return 'Error fetching suggestion';
    }
}

function nextStep() {
    fillDefaultValues();
    saveData();
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep++;
    if (currentStep === 22) {
        showSummary();
    } else {
        document.getElementById(`step-${currentStep}`).classList.add('active');
    }
    updateProgressBar();
    updateProgressBarIndicator();
}

function prevStep() {
    if (currentStep === 22) {
        document.getElementById('summary').classList.remove('active');
        currentStep = 21;
    } else {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep--;
    }
    document.getElementById(`step-${currentStep}`).classList.add('active');
    updateProgressBar();
    updateProgressBarIndicator();
}

function fillDefaultValues() {
    const defaultValues = {
        'prosjekt-navn': 'Standard Prosjektnavn',
        'arbeidssted': 'Standard Arbeidssted',
        'behov-beskrivelse': 'Standard Behovsbeskrivelse',
        'behov-evaluation': 3,
        'losning-beskrivelse': 'Standard Løsningsbeskrivelse',
        'losning-evaluation': 3,
        'padriver-navn': 'Standard Pådrivernavn',
        'padriver-evaluation': 3,
        'team-medlemmer': 'Standard Teammedlemmer',
        'team-evaluation': 3,
        'forankring-beskrivelse': 'Standard Forankringsbeskrivelse',
        'forankring-evaluation': 3,
        'step-21-description': 'Standard Veien videre'
    };

    Object.keys(defaultValues).forEach(id => {
        const element = document.getElementById(id);
        if (element && !element.value) {
            element.value = defaultValues[id];
        }
    });
}

function showSummary() {
    fillDefaultValues();
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
        <h3>Veien videre</h3>
        <p>${document.getElementById('step-21-description').value}</p>
        ${Array.from({ length: 22 }, (_, i) => `
            <h3>${wizardTexts[`step${i}`]?.title || `Steg ${i}`}</h3>
            <p>${document.getElementById(`step-${i}-description`)?.value || wizardTexts[`step${i}`]?.introText || ''}</p>
        `).join('')}
        <h3>Evaluering</h3>
        <h4>Evaluering Bar Chart</h4>
        <canvas id="evaluationChart" width="400" height="200"></canvas>
    `;
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = 22;
    document.getElementById('summary').classList.add('active');
    updateProgressBar();
    setTimeout(renderEvaluationChart, 0);
}

function renderEvaluationChart() {
    const ctx = document.getElementById('evaluationChart').getContext('2d');
    const data = {
        labels: ['Behov', 'Løsning', 'Pådriver', 'Team', 'Forankring'],
        datasets: [{
            label: 'Evaluering',
            data: [
                parseInt(document.getElementById('behov-evaluation').value) || 0,
                parseInt(document.getElementById('losning-evaluation').value) || 0,
                parseInt(document.getElementById('padriver-evaluation').value) || 0,
                parseInt(document.getElementById('team-evaluation').value) || 0,
                parseInt(document.getElementById('forankring-evaluation').value) || 0
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5
                }
            }
        }
    });
}

function saveData() {
    const data = {
        prosjektNavn: document.getElementById('prosjekt-navn').value,
        arbeidssted: document.getElementById('arbeidssted').value,
        behov: document.getElementById('behov-beskrivelse').value,
        losning: document.getElementById('losning-beskrivelse').value,
        padriver: document.getElementById('padriver-navn').value,
        team: document.getElementById('team-medlemmer').value,
        forankring: document.getElementById('forankring-beskrivelse').value,
        step21: document.getElementById('step-21-description').value
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
        document.getElementById('step-21-description').value = data.step21;
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

    doc.setProperties({
        title: 'Prosjektrapport',
        subject: 'Oppsummering av prosjekt',
        author: 'Ditt Navn',
        keywords: 'prosjekt, rapport, oppsummering',
        creator: 'Ditt Navn'
    });

    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Prosjektrapport", 105, 20, null, null, 'center');

    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Dato: ${currentDate}`, 10, 30);

    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text(document.getElementById('prosjekt-navn').value, 105, 40, null, null, 'center');

    doc.setFontSize(16);
    doc.setTextColor(60, 60, 60);
    doc.text(document.getElementById('arbeidssted').value, 105, 50, null, null, 'center');

    const addSection = (title, content, yPosition) => {
        doc.setFontSize(14);
        doc.setTextColor(60, 60, 60);
        doc.text(title, 10, yPosition);
        doc.setFontSize(12);
        doc.setTextColor(80, 80, 80);
        const splitContent = doc.splitTextToSize(content, 180);
        doc.text(splitContent, 10, yPosition + 10);
        return yPosition + 10 + splitContent.length * 10;
    };

    let yPosition = 60;
    yPosition = addSection("Behov:", document.getElementById('behov-beskrivelse').value, yPosition);
    yPosition = addSection("Løsning:", document.getElementById('losning-beskrivelse').value, yPosition);
    yPosition = addSection("Pådriver:", document.getElementById('padriver-navn').value, yPosition);
    yPosition = addSection("Team:", document.getElementById('team-medlemmer').value, yPosition);
    yPosition = addSection("Forankring:", document.getElementById('forankring-beskrivelse').value, yPosition);
    yPosition = addSection("Veien videre:", document.getElementById('step-21-description').value, yPosition);

    for (let i = 0; i < 22; i++) {
        const stepDescription = document.getElementById(`step-${i}-description`)?.value || wizardTexts[`step${i}`]?.introText || '';
        if (stepDescription) {
            if (yPosition + 30 > doc.internal.pageSize.height) {
                doc.addPage();
                yPosition = 20;
            }
            yPosition = addSection(`Steg ${i}:`, stepDescription, yPosition);
        }
    }

    const canvas = document.getElementById('evaluationChart');
    if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        if (yPosition + 90 > doc.internal.pageSize.height) {
            doc.addPage();
            yPosition = 20;
        }
        doc.addImage(imgData, 'PNG', 10, yPosition, 180, 80);
    }

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
    document.getElementById('step-6-title').textContent = wizardTexts.step6.title;
    document.getElementById('step-6-description').textContent = wizardTexts.step6.description;
    document.getElementById('step-6-intro-text').textContent = wizardTexts.step6.introText;
    document.getElementById('step-7-title').textContent = wizardTexts.step7.title;
    document.getElementById('step-7-description').textContent = wizardTexts.step7.description;
    document.getElementById('step-7-intro-text').textContent = wizardTexts.step7.introText;
    document.getElementById('step-8-title').textContent = wizardTexts.step8.title;
    document.getElementById('step-8-description').textContent = wizardTexts.step8.description;
    document.getElementById('step-8-intro-text').textContent = wizardTexts.step8.introText;
    document.getElementById('step-9-title').textContent = wizardTexts.step9.title;
    document.getElementById('step-9-description').textContent = wizardTexts.step9.description;
    document.getElementById('step-9-intro-text').textContent = wizardTexts.step9.introText;
    document.getElementById('step-10-title').textContent = wizardTexts.step10.title;
    document.getElementById('step-10-description').textContent = wizardTexts.step10.description;
    document.getElementById('step-10-intro-text').textContent = wizardTexts.step10.introText;
    document.getElementById('step-11-title').textContent = wizardTexts.step11.title;
    document.getElementById('step-11-description').textContent = wizardTexts.step11.description;
    document.getElementById('step-11-intro-text').textContent = wizardTexts.step11.introText;
    document.getElementById('step-12-title').textContent = wizardTexts.step12.title;
    document.getElementById('step-12-description').textContent = wizardTexts.step12.description;
    document.getElementById('step-12-intro-text').textContent = wizardTexts.step12.introText;
    document.getElementById('step-13-title').textContent = wizardTexts.step13.title;
    document.getElementById('step-13-description').textContent = wizardTexts.step13.description;
    document.getElementById('step-13-intro-text').textContent = wizardTexts.step13.introText;
    document.getElementById('step-14-title').textContent = wizardTexts.step14.title;
    document.getElementById('step-14-description').textContent = wizardTexts.step14.description;
    document.getElementById('step-14-intro-text').textContent = wizardTexts.step14.introText;
    document.getElementById('step-15-title').textContent = wizardTexts.step15.title;
    document.getElementById('step-15-description').textContent = wizardTexts.step15.description;
    document.getElementById('step-15-intro-text').textContent = wizardTexts.step15.introText;
    document.getElementById('step-16-title').textContent = wizardTexts.step16.title;
    document.getElementById('step-16-description').textContent = wizardTexts.step16.description;
    document.getElementById('step-16-intro-text').textContent = wizardTexts.step16.introText;
    document.getElementById('step-17-title').textContent = wizardTexts.step17.title;
    document.getElementById('step-17-description').textContent = wizardTexts.step17.description;
    document.getElementById('step-17-intro-text').textContent = wizardTexts.step17.introText;
    document.getElementById('step-18-title').textContent = wizardTexts.step18.title;
    document.getElementById('step-18-description').textContent = wizardTexts.step18.description;
    document.getElementById('step-18-intro-text').textContent = wizardTexts.step18.introText;
    document.getElementById('step-19-title').textContent = wizardTexts.step19.title;
    document.getElementById('step-19-description').textContent = wizardTexts.step19.description;
    document.getElementById('step-19-intro-text').textContent = wizardTexts.step19.introText;
    document.getElementById('step-20-title').textContent = wizardTexts.step20.title;
    document.getElementById('step-20-description').textContent = wizardTexts.step20.description;
    document.getElementById('step-20-intro-text').textContent = wizardTexts.step20.introText;
    document.getElementById('step-21-title').textContent = wizardTexts.step21.title;
    document.getElementById('step-21-description').textContent = wizardTexts.step21.description;
    document.getElementById('step-21-intro-text').textContent = wizardTexts.step21.introText;
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
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
        if (currentStep === 22) {
            renderEvaluationChart();
        }
    };
    document.head.appendChild(script);
});
