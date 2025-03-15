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
    summaryContent.innerHTML = '';

    if (wizardTexts.summary.toggleContent.showProsjektNavn) {
        summaryContent.innerHTML += `
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <div>
                        <h1 contenteditable="true" style="color: #3498db;">Prosjektets navn</h1>
                        <p contenteditable="true" style="font-size: 1.2rem;">${document.getElementById('prosjekt-navn').value}</p>
                    </div>
                </div>
            </div>`;
    }

    if (wizardTexts.summary.toggleContent.showOppdragsgiver) {
        summaryContent.innerHTML += `
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                    <div>
                        <h1 contenteditable="true" style="color: #e74c3c;">Oppdragsgiver</h1>
                        <p contenteditable="true" style="font-size: 1.2rem;">${document.getElementById('arbeidssted').value}</p>
                    </div>
                </div>
            </div>`;
    }

    if (wizardTexts.summary.toggleContent.showPadriver) {
        summaryContent.innerHTML += `
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                    <div>
                        <h3 contenteditable="true" style="color: #e74c3c;">Pådriver</h3>
                        <p contenteditable="true" style="font-size: 1rem;">${document.getElementById('padriver-navn').value}</p>
                    </div>
                </div>
            </div>`;
    }

    if (wizardTexts.summary.toggleContent.showTeam) {
        summaryContent.innerHTML += `
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                    <div>
                        <h3 contenteditable="true" style="color: #9b59b6;">Team</h3>
                        <p contenteditable="true" style="font-size: 1rem;">${document.getElementById('team-medlemmer').value}</p>
                    </div>
                </div>
            </div>`;
    }

    if (wizardTexts.summary.toggleContent.showBehov) {
        summaryContent.innerHTML += ` 
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                    <div>
                        <h3 contenteditable="true" style="color: #2ecc71;">Behov</h3>
                        <p contenteditable="true" style="font-size: 1rem;">${document.getElementById('behov-beskrivelse').value}</p>
                    </div>
                </div>
            </div>`;
    }

    if (wizardTexts.summary.toggleContent.showLosning) {
        summaryContent.innerHTML += `
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                    <div>
                        <h3 contenteditable="true" style="color: #f1c40f;">Løsning</h3>
                        <p contenteditable="true" style="font-size: 1rem;">${document.getElementById('losning-beskrivelse').value}</p>
                    </div>
                </div>
            </div>`;
    }

    if (wizardTexts.summary.toggleContent.showForankring) {
        summaryContent.innerHTML += `
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: space-between; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                    <div>
                        <h3 contenteditable="true" style="color: #3498db;">Forankring</h3>
                        <p contenteditable="true" style="font-size: 1rem;">${document.getElementById('forankring-beskrivelse').value}</p>
                    </div>
                </div>
            </div>`;
    }

    if (wizardTexts.summary.toggleContent.showEvaluationChart) {
        summaryContent.innerHTML += `
            <div class="draggable" draggable="true">
                <div style="display: flex; justify-content: center; align-items: center; background-color: #f9f9f9; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); margin-top: 20px;">
                    <canvas id="summaryEvaluationChart" width="400" height="200"></canvas>
                </div>
            </div>`;
    }

    // ...existing code for other sections...

    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = 22;
    document.getElementById('summary').classList.add('active');
    updateProgressBar();
    setTimeout(() => {
        createGrids();
        renderSummaryEvaluationChart();
    }, 0);
}

function renderEvaluationChart() {
    if (typeof Chart !== 'undefined') {
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
    } else {
        console.error('Chart.js is not loaded.');
    }
}

function renderSummaryEvaluationChart() {
    if (typeof Chart !== 'undefined') {
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
    } else {
        console.error('Chart.js is not loaded.');
    }
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
        prosjektNavn: document.getElementById('prosjekt-navn')?.value || '',
        arbeidssted: document.getElementById('arbeidssted')?.value || '',
        behov: document.getElementById('behov-beskrivelse')?.value || '',
        losning: document.getElementById('losning-beskrivelse')?.value || '',
        padriver: document.getElementById('padriver-navn')?.value || '',
        team: document.getElementById('team-medlemmer')?.value || '',
        forankring: document.getElementById('forankring-beskrivelse')?.value || '',
        step21: document.getElementById('step-21-description')?.value || ''
    };
    localStorage.setItem('projectData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('projectData'));
    if (data) {
        if (document.getElementById('prosjekt-navn')) document.getElementById('prosjekt-navn').value = data.prosjektNavn;
        if (document.getElementById('arbeidssted')) document.getElementById('arbeidssted').value = data.arbeidssted;
        if (document.getElementById('behov-beskrivelse')) document.getElementById('behov-beskrivelse').value = data.behov;
        if (document.getElementById('losning-beskrivelse')) document.getElementById('losning-beskrivelse').value = data.losning;
        if (document.getElementById('padriver-navn')) document.getElementById('padriver-navn').value = data.padriver;
        if (document.getElementById('team-medlemmer')) document.getElementById('team-medlemmer').value = data.team;
        if (document.getElementById('forankring-beskrivelse')) document.getElementById('forankring-beskrivelse').value = data.forankring;
        if (document.getElementById('step-21-description')) document.getElementById('step-21-description').value = data.step21;
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

function exportToPNG() {
    if (typeof html2canvas !== 'undefined') {
        const summaryElement = document.getElementById('summary');
        html2canvas(summaryElement, { scale: 2 }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'prosjektrapport.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(error => {
            console.error('Error exporting to PNG:', error);
        });
    } else {
        console.error('html2canvas is not loaded.');
    }
}

function setWizardTexts() {
    if (wizardTexts.step0 && document.getElementById('step-0-text')) {
        document.getElementById('step-0-text').textContent = wizardTexts.step0.text;
    }
    if (wizardTexts.step1 && document.getElementById('step-1-title')) {
        document.getElementById('step-1-title').textContent = wizardTexts.step1.title;
        document.getElementById('step-1-description').textContent = wizardTexts.step1.description;
        document.getElementById('step-1-intro-text').textContent = wizardTexts.step1.introText;
    }
    if (wizardTexts.step2 && document.getElementById('step-2-title')) {
        document.getElementById('step-2-title').textContent = wizardTexts.step2.title;
        document.getElementById('step-2-description').textContent = wizardTexts.step2.description;
        document.getElementById('step-2-intro-text').textContent = wizardTexts.step2.introText;
    }
    if (wizardTexts.step3 && document.getElementById('step-3-title')) {
        document.getElementById('step-3-title').textContent = wizardTexts.step3.title;
        document.getElementById('step-3-description').textContent = wizardTexts.step3.description;
        document.getElementById('step-3-intro-text').textContent = wizardTexts.step3.introText;
    }
    if (wizardTexts.step4 && document.getElementById('step-4-title')) {
        document.getElementById('step-4-title').textContent = wizardTexts.step4.title;
        document.getElementById('step-4-description').textContent = wizardTexts.step4.description;
        document.getElementById('step-4-intro-text').textContent = wizardTexts.step4.introText;
    }
    if (wizardTexts.step5 && document.getElementById('step-5-title')) {
        document.getElementById('step-5-title').textContent = wizardTexts.step5.title;
        document.getElementById('step-5-description').textContent = wizardTexts.step5.description;
        document.getElementById('step-5-intro-text').textContent = wizardTexts.step5.introText;
    }
    if (wizardTexts.step6 && document.getElementById('step-6-title')) {
        document.getElementById('step-6-title').textContent = wizardTexts.step6.title;
        document.getElementById('step-6-description').textContent = wizardTexts.step6.description;
        document.getElementById('step-6-intro-text').textContent = wizardTexts.step6.introText;
    }
    if (wizardTexts.step7 && document.getElementById('step-7-title')) {
        document.getElementById('step-7-title').textContent = wizardTexts.step7.title;
        document.getElementById('step-7-description').textContent = wizardTexts.step7.description;
        document.getElementById('step-7-intro-text').textContent = wizardTexts.step7.introText;
    }
    if (wizardTexts.step8 && document.getElementById('step-8-title')) {
        document.getElementById('step-8-title').textContent = wizardTexts.step8.title;
        document.getElementById('step-8-description').textContent = wizardTexts.step8.description;
        document.getElementById('step-8-intro-text').textContent = wizardTexts.step8.introText;
    }
    if (wizardTexts.step9 && document.getElementById('step-9-title')) {
        document.getElementById('step-9-title').textContent = wizardTexts.step9.title;
        document.getElementById('step-9-description').textContent = wizardTexts.step9.description;
        document.getElementById('step-9-intro-text').textContent = wizardTexts.step9.introText;
    }
    if (wizardTexts.step10 && document.getElementById('step-10-title')) {
        document.getElementById('step-10-title').textContent = wizardTexts.step10.title;
        document.getElementById('step-10-description').textContent = wizardTexts.step10.description;
        document.getElementById('step-10-intro-text').textContent = wizardTexts.step10.introText;
    }
    if (wizardTexts.step11 && document.getElementById('step-11-title')) {
        document.getElementById('step-11-title').textContent = wizardTexts.step11.title;
        document.getElementById('step-11-description').textContent = wizardTexts.step11.description;
        document.getElementById('step-11-intro-text').textContent = wizardTexts.step11.introText;
    }
    if (wizardTexts.step12 && document.getElementById('step-12-title')) {
        document.getElementById('step-12-title').textContent = wizardTexts.step12.title;
        document.getElementById('step-12-description').textContent = wizardTexts.step12.description;
        document.getElementById('step-12-intro-text').textContent = wizardTexts.step12.introText;
    }
    if (wizardTexts.step13 && document.getElementById('step-13-title')) {
        document.getElementById('step-13-title').textContent = wizardTexts.step13.title;
        document.getElementById('step-13-description').textContent = wizardTexts.step13.description;
        document.getElementById('step-13-intro-text').textContent = wizardTexts.step13.introText;
    }
    if (wizardTexts.step14 && document.getElementById('step-14-title')) {
        document.getElementById('step-14-title').textContent = wizardTexts.step14.title;
        document.getElementById('step-14-description').textContent = wizardTexts.step14.description;
        document.getElementById('step-14-intro-text').textContent = wizardTexts.step14.introText;
    }
    if (wizardTexts.step15 && document.getElementById('step-15-title')) {
        document.getElementById('step-15-title').textContent = wizardTexts.step15.title;
        document.getElementById('step-15-description').textContent = wizardTexts.step15.description;
        document.getElementById('step-15-intro-text').textContent = wizardTexts.step15.introText;
    }
    if (wizardTexts.step16 && document.getElementById('step-16-title')) {
        document.getElementById('step-16-title').textContent = wizardTexts.step16.title;
        document.getElementById('step-16-description').textContent = wizardTexts.step16.description;
        document.getElementById('step-16-intro-text').textContent = wizardTexts.step16.introText;
    }
    if (wizardTexts.step17 && document.getElementById('step-17-title')) {
        document.getElementById('step-17-title').textContent = wizardTexts.step17.title;
        document.getElementById('step-17-description').textContent = wizardTexts.step17.description;
        document.getElementById('step-17-intro-text').textContent = wizardTexts.step17.introText;
    }
    if (wizardTexts.step18 && document.getElementById('step-18-title')) {
        document.getElementById('step-18-title').textContent = wizardTexts.step18.title;
        document.getElementById('step-18-description').textContent = wizardTexts.step18.description;
        document.getElementById('step-18-intro-text').textContent = wizardTexts.step18.introText;
    }
    if (wizardTexts.step19 && document.getElementById('step-19-title')) {
        document.getElementById('step-19-title').textContent = wizardTexts.step19.title;
        document.getElementById('step-19-description').textContent = wizardTexts.step19.description;
        document.getElementById('step-19-intro-text').textContent = wizardTexts.step19.introText;
    }
    if (wizardTexts.step20 && document.getElementById('step-20-title')) {
        document.getElementById('step-20-title').textContent = wizardTexts.step20.title;
        document.getElementById('step-20-description').textContent = wizardTexts.step20.description;
        document.getElementById('step-20-intro-text').textContent = wizardTexts.step20.introText;
    }
    if (wizardTexts.step21 && document.getElementById('step-21-title')) {
        document.getElementById('step-21-title').textContent = wizardTexts.step21.title;
        document.getElementById('step-21-description').textContent = wizardTexts.step21.description;
        document.getElementById('step-21-intro-text').textContent = wizardTexts.step21.introText;
    }
    if (wizardTexts.summary && document.getElementById('summary-title')) {
        document.getElementById('summary-title').textContent = wizardTexts.summary.title;
        document.getElementById('summary-prev-button').textContent = wizardTexts.summary.prevButton;
        document.getElementById('summary-export-button').textContent = wizardTexts.summary.exportButton;
        document.getElementById('summary-reset-button').textContent = wizardTexts.summary.resetButton;
    }
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

function createGrids(rows = 3, cols = 3, numGrids = 1) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    for (let i = 0; i < numGrids; i++) {
        addGrid(rows, cols, i + 1);
    }

    const elements = Array.from(document.querySelectorAll('.draggable'));
    elements.forEach((element, index) => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.appendChild(element);
        gridContainer.children[Math.floor(index / (rows * cols))].querySelector('.grid-container').appendChild(gridItem);
    });

    enableDragAndDrop();
}

function addGrid(rows, cols, chapterNumber) {
    const gridContainer = document.getElementById('grid-container');
    const gridWrapper = document.createElement('div');
    gridWrapper.classList.add('grid-wrapper');
    const gridHeader = document.createElement('h3');
    gridHeader.contentEditable = "true";
    gridHeader.textContent = `Kapittel ${chapterNumber}`;
    gridWrapper.appendChild(gridHeader);

    const grid = document.createElement('div');
    grid.classList.add('grid-container');
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridWrapper.appendChild(grid);
    gridContainer.appendChild(gridWrapper);
}

function enableDragAndDrop() {
    const draggables = document.querySelectorAll('.draggable');
    const gridItems = document.querySelectorAll('.grid-item');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    gridItems.forEach(item => {
        item.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(item, e.clientY);
            const dragging = document.querySelector('.dragging');
            if (afterElement == null) {
                item.appendChild(dragging);
            } else {
                item.insertBefore(dragging, afterElement);
            }
        });
    });

    const gridWrappers = document.querySelectorAll('.grid-wrapper');
    gridWrappers.forEach(wrapper => {
        wrapper.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(wrapper.querySelector('.grid-container'), e.clientY);
            const dragging = document.querySelector('.dragging');
            if (afterElement == null) {
                wrapper.querySelector('.grid-container').appendChild(dragging);
            } else {
                wrapper.querySelector('.grid-container').insertBefore(dragging, afterElement);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function addNewChapter() {
    const newRowsInput = document.getElementById('new-rows');
    const newColsInput = document.getElementById('new-cols');
    const rows = newRowsInput ? parseInt(newRowsInput.value, 10) : 3;
    const cols = newColsInput ? parseInt(newColsInput.value, 10) : 3;
    const chapterNumber = document.querySelectorAll('.grid-wrapper').length + 1;
    if (!isNaN(rows) && !isNaN(cols)) {
        addGrid(rows, cols, chapterNumber);
        enableDragAndDrop();
    }
}

function updateSummary() {
    showSummary();
}

function updateGrid() {
    const rows = parseInt(document.getElementById('rows').value, 6);
    const cols = parseInt(document.getElementById('cols').value, 6);
    const numGrids = parseInt(document.getElementById('numGrids').value, 3);
    if (!isNaN(rows) && !isNaN(cols) && !isNaN(numGrids)) {
        createGrids(rows, cols, numGrids);
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

    const html2canvasScript = document.createElement('script');
    html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    html2canvasScript.onload = () => {
        const buildReportButton = document.getElementById('build-report-button');
        if (buildReportButton) {
            buildReportButton.addEventListener('click', () => {
                const customizeMenu = document.getElementById('customize-grid-menu');
                if (customizeMenu) {
                    customizeMenu.style.display = customizeMenu.style.display === 'none' ? 'block' : 'none';
                }
            });
        }

        const addChapterButton = document.getElementById('add-chapter-button');
        if (addChapterButton) {
            addChapterButton.addEventListener('click', addNewChapter);
        }

        const rowsInput = document.getElementById('rows');
        if (rowsInput) {
            rowsInput.addEventListener('change', updateGrid);
        }

        const colsInput = document.getElementById('cols');
        if (colsInput) {
            colsInput.addEventListener('change', updateGrid);
        }

        const numGridsInput = document.getElementById('numGrids');
        if (numGridsInput) {
            numGridsInput.addEventListener('change', updateGrid);
        }
    };
    document.head.appendChild(html2canvasScript);
});
