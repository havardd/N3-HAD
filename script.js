let currentStep = 0;

let evaluationChartInstance = null;
let summaryEvaluationChartInstance = null;
let lineChartInstance = null;

function nextStep() {
    fillDefaultValues();
    saveData();
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep++;
    if (currentStep === 22) {
        showSummary();
    } else {
        document.getElementById(`step-${currentStep}`).classList.add('active');
        if (currentStep === 21) {
            renderEvaluationChart();
        }
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
        'prosjekt-navn': 'Flere inntektsskapende tiltak for å øke inntektene til bedriften',
        'arbeidssted': 'HAD Data',
        'behov-beskrivelse': 'Bedriften trenger flere inntektsskapende tiltak for å øke inntektene.',
        'behov-evaluation': 1,
        'losning-beskrivelse': 'Bedriften skal utvikle flere inntektsskapende tiltak for å øke inntektene.',
        'losning-evaluation': 1,
        'padriver-navn': 'Ola Nordmann',
        'padriver-evaluation': 1,
        'team-medlemmer': 'Siri Rådgiver, Ola Utvikler og Kari Designer',
        'team-evaluation': 1,
        'forankring-beskrivelse': 'Rektor, lærere og elever bør involveres i prosjektet.',
        'forankring-evaluation': 1,
        'step-21-description': 'Prosjektet skal fortsette å utvikle flere inntektsskapende tiltak for å øke inntektene.'
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
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div>
                <h1 style="color: #3498db;">Prosjektets navn</h1>
                <p style="font-size: 1.2rem;">${document.getElementById('prosjekt-navn').value}</p>
            </div>
            <div>
                <h1 style="color: #e74c3c;">Oppdragsgiver</h1>
                <p style="font-size: 1.2rem;">${document.getElementById('arbeidssted').value}</p>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <div>
                <h3 style="color: #e74c3c;">Pådriver</h3>
                <p style="font-size: 1rem;">${document.getElementById('padriver-navn').value}</p>
            </div>
            <div>
                <h3 style="color: #9b59b6;">Team</h3>
                <p style="font-size: 1rem;">${document.getElementById('team-medlemmer').value}</p>
            </div>
            <div>
                <h3 style="color: #3498db;">Forankring</h3>
                <p style="font-size: 1rem;">${document.getElementById('forankring-beskrivelse').value}</p>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <div>
                <h3 style="color: #2ecc71;">Behov</h3>
                <p style="font-size: 1rem;">${document.getElementById('behov-beskrivelse').value}</p>
            </div>
            <div>
                <h3 style="color: #e74c3c;">Hvor god innsikt har dere i behovet?</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-14-intro-text').textContent}</p>
            </div>
            <div>
                <h3 style="color: #f1c40f;">Hva bør dere vite for å få bedre innsikt i behovet?</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-2-intro-text').textContent}</p>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <div>
                <h3 style="color: #f1c40f;">Løsning</h3>
                <p style="font-size: 1rem;">${document.getElementById('losning-beskrivelse').value}</p>
            </div>
            <div>
                <h3 style="color: #e74c3c;">Hvor langt har dere kommet med løsningen?</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-15-intro-text').textContent}</p>
            </div>
            <div>
                <h3 style="color: #2ecc71;">Den enkleste måten å teste en løsning på, er å spørre folk hva de mener om den. Hvilke spørsmål kan teste folks oppfatning av en tenkt løsning?</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-6-intro-text').textContent}</p>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <div>
                <h3 style="color: #e74c3c;">Hvem kan gi svar på disse spørsmålene?</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-3-intro-text').textContent}</p>
            </div>
            <div>
                <h3 style="color: #2ecc71;">Ta kontakt med relevante personer oppsummering fra møtet</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-4-intro-text').textContent}</p>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <div>
                <h3 style="color: #e74c3c;">Skriv inn navnene på tre personer som kan gi svar på disse tre spørsmålene?</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-7-intro-text').textContent}</p>
            </div>
            <div>
                <h3 style="color: #2ecc71;">Ta kontakt med ... Forklar at dere jobber med <prosjekt navn> og ønsker å forbedre løsningen deres</h3>
                <p style="font-size: 1rem;">${document.getElementById('step-8-intro-text').textContent}</p>
            </div>
        </div>
        ${Array.from({ length: 22 }, (_, i) => (i !== 9 && i > 0) ? `
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                <h3 style="color: #${Math.floor(Math.random()*16777215).toString(16)};">${wizardTexts[`step${i}`]?.title || `Steg ${i}`}</h3>
                <p style="font-size: 1rem;">${document.getElementById(`step-${i}-description`)?.value || wizardTexts[`step${i}`]?.introText || ''}</p>
            </div>
        ` : '').join('')}
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <h3 style="color: #e74c3c;">${wizardTexts.summary.evaluationTitle || 'Evaluering'}</h3>
            <h4 style="color: #2ecc71;">${wizardTexts.summary.evaluationChartTitle || 'Evaluering Bar Chart'}</h4>
            <canvas id="summaryEvaluationChart" width="400" height="200"></canvas>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
            <h3 style="color: #3498db;">Veien videre</h3>
            <p style="font-size: 1rem;">${document.getElementById('step-21-description').value}</p>
        </div>
    `;
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = 22;
    document.getElementById('summary').classList.add('active');
    updateProgressBar();
    setTimeout(renderSummaryEvaluationChart, 0);
}

function renderEvaluationChart() {
    const ctx = document.getElementById('evaluationChart').getContext('2d');
    if (evaluationChartInstance) {
        evaluationChartInstance.destroy();
    }
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
            backgroundColor: [
                '#3498db', /* Blue */
                '#e74c3c', /* Red */
                '#2ecc71', /* Green */
                '#f1c40f', /* Yellow */
                '#9b59b6'  /* Purple */
            ],
            borderColor: [
                '#2980b9', /* Darker Blue */
                '#c0392b', /* Darker Red */
                '#27ae60', /* Darker Green */
                '#f39c12', /* Darker Yellow */
                '#8e44ad'  /* Darker Purple */
            ],
            borderWidth: 1
        }]
    };
    evaluationChartInstance = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        }
                    }
                }
            }
        }
    });
}

function renderSummaryEvaluationChart() {
    const ctx = document.getElementById('summaryEvaluationChart').getContext('2d');
    if (summaryEvaluationChartInstance) {
        summaryEvaluationChartInstance.destroy();
    }
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
            backgroundColor: [
                '#3498db', /* Blue */
                '#e74c3c', /* Red */
                '#2ecc71', /* Green */
                '#f1c40f', /* Yellow */
                '#9b59b6'  /* Purple */
            ],
            borderColor: [
                '#2980b9', /* Darker Blue */
                '#c0392b', /* Darker Red */
                '#27ae60', /* Darker Green */
                '#f39c12', /* Darker Yellow */
                '#8e44ad'  /* Darker Purple */
            ],
            borderWidth: 1
        }]
    };
    summaryEvaluationChartInstance = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        }
                    }
                }
            }
        }
    });
}

function renderLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    if (lineChartInstance) {
        lineChartInstance.destroy();
    }
    const averageEvaluation = (
        parseInt(document.getElementById('behov-evaluation').value) +
        parseInt(document.getElementById('losning-evaluation').value) +
        parseInt(document.getElementById('padriver-evaluation').value) +
        parseInt(document.getElementById('team-evaluation').value) +
        parseInt(document.getElementById('forankring-evaluation').value)
    ) / 5;

    const data = {
        labels: ['Dårlig', 'Under middels', 'Middels', 'God', 'Svært god'],
        datasets: [{
            label: 'Prosjektstatus',
            data: [0, 0, 0, 0, 0],
            backgroundColor: '#3498db',
            borderColor: '#2980b9',
            borderWidth: 1,
            pointRadius: 5,
            pointBackgroundColor: '#e74c3c',
            pointBorderColor: '#c0392b',
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#e74c3c',
            pointHoverBorderColor: '#c0392b'
        }]
    };

    data.datasets[0].data[Math.round(averageEvaluation) - 1] = averageEvaluation;

    lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        callback: function(value) {
                            if (Number.isInteger(value)) {
                                return value;
                            }
                        }
                    }
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
    const doc = new jsPDF('landscape');

    doc.setProperties({
        title: 'Prosjektrapport',
        subject: 'Oppsummering av prosjekt',
        author: 'Ditt Navn',
        keywords: 'prosjekt, rapport, oppsummering',
        creator: 'Ditt Navn'
    });

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Prosjektrapport", 148.5, 20, null, null, 'center');

    doc.setLineWidth(0.5);
    doc.line(10, 25, 287, 25);

    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Dato: ${currentDate}`, 10, 30);

    const addSection = (title, content, xPosition, yPosition) => {
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(title, xPosition, yPosition);
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        const splitContent = doc.splitTextToSize(content, 80);
        doc.text(splitContent, xPosition, yPosition + 5);
        return yPosition + 5 + splitContent.length * 5;
    };

    let yPosition = 40;
    yPosition = addSection("Prosjektets navn:", document.getElementById('prosjekt-navn').value, 10, yPosition);
    yPosition = addSection("Oppdragsgiver:", document.getElementById('arbeidssted').value, 148.5, yPosition);

    yPosition += 20;
    yPosition = addSection("Pådriver:", document.getElementById('padriver-navn').value, 10, yPosition);
    yPosition = addSection("Team:", document.getElementById('team-medlemmer').value, 148.5, yPosition);
    yPosition = addSection("Forankring:", document.getElementById('forankring-beskrivelse').value, 287, yPosition);

    yPosition += 20;
    yPosition = addSection("Behov:", document.getElementById('behov-beskrivelse').value, 10, yPosition);
    yPosition = addSection("Hvor god innsikt har dere i behovet?", document.getElementById('step-14-intro-text').textContent, 148.5, yPosition);
    yPosition = addSection("Hva bør dere vite for å få bedre innsikt i behovet?", document.getElementById('step-2-intro-text').textContent, 287, yPosition);

    yPosition += 20;
    yPosition = addSection("Løsning:", document.getElementById('losning-beskrivelse').value, 10, yPosition);
    yPosition = addSection("Hvor langt har dere kommet med løsningen?", document.getElementById('step-15-intro-text').textContent, 148.5, yPosition);
    yPosition = addSection("Den enkleste måten å teste en løsning på, er å spørre folk hva de mener om den. Hvilke spørsmål kan teste folks oppfatning av en tenkt løsning?", document.getElementById('step-6-intro-text').textContent, 287, yPosition);

    yPosition += 20;
    yPosition = addSection("Hvem kan gi svar på disse spørsmålene?", document.getElementById('step-3-intro-text').textContent, 10, yPosition);
    yPosition = addSection("Ta kontakt med relevante personer oppsummering fra møtet", document.getElementById('step-4-intro-text').textContent, 148.5, yPosition);

    for (let i = 0; i < 22; i++) {
        const stepDescription = document.getElementById(`step-${i}-description`)?.value || wizardTexts[`step${i}`]?.introText || '';
        if (stepDescription) {
            if (yPosition + 20 > doc.internal.pageSize.height - 20) {
                doc.addPage();
                yPosition = 20;
            }
            yPosition = addSection(`${wizardTexts[`step${i}`]?.title || `Steg ${i}`}:`, stepDescription, 10, yPosition);
        }
    }

    const canvas = document.getElementById('summaryEvaluationChart');
    if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        if (yPosition + 80 > doc.internal.pageSize.height - 20) {
            doc.addPage();
            yPosition = 20;
        }
        doc.addImage(imgData, 'PNG', 10, yPosition, 267, 80);
        yPosition += 80;
    }

    yPosition = addSection(wizardTexts.step21.title || "Veien videre:", document.getElementById('step-21-description').value, 10, yPosition);

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("Generert av Ditt Navn", 148.5, doc.internal.pageSize.height - 10, null, null, 'center');

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
        console.warn('Element with ID "progress-indicator" not found');
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
            renderSummaryEvaluationChart();
        }
        if (currentStep === 21) {
            renderEvaluationChart();
        }
    };
    document.head.appendChild(script);
});
