// Global App State
const app = {
    currentDepartment: 0,
    currentSlide: 0,
    departments: [],

    // Initialize the application
    async init() {
        try {
            // Load data from JSON file
            const response = await fetch('data.json');
            this.departments = await response.json();

            // Render UI
            this.renderDepartmentList();
            this.loadDepartment(0);

            console.log('✓ App initialized successfully');
            console.log('✓ Departments loaded:', this.departments.length);
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    },

    // Render department buttons
    renderDepartmentList() {
        const list = document.getElementById('departmentList');
        list.innerHTML = '';

        this.departments.forEach((dept, index) => {
            const btn = document.createElement('button');
            btn.className = `dept-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = `${dept.icon} ${dept.name}`;
            btn.onclick = () => this.loadDepartment(index);
            list.appendChild(btn);
        });
    },

    // Load a department
    loadDepartment(index) {
        this.currentDepartment = index;
        this.currentSlide = 0;

        // Update active button
        document.querySelectorAll('.dept-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        // Update header
        const dept = this.departments[index];
        document.getElementById('departmentTitle').textContent = `${dept.icon} ${dept.name}`;
        document.getElementById('departmentSubtitle').textContent = '12-Month Implementation Roadmap';

        // Render slide
        this.renderSlide();
    },

    // Render current slide
    renderSlide() {
        const dept = this.departments[this.currentDepartment];
        const slide = dept.slides[this.currentSlide];
        const container = document.getElementById('slideContainer');

        container.innerHTML = '';

        // Create slide element based on type
        const slideHTML = this.createSlideContent(slide);
        container.innerHTML = slideHTML;

        // Update slide counter
        document.getElementById('currentSlide').textContent = this.currentSlide + 1;
        document.getElementById('totalSlides').textContent = dept.slides.length;

        // Update button states
        document.getElementById('prevBtn').disabled = this.currentSlide === 0;
        document.getElementById('nextBtn').disabled = this.currentSlide === dept.slides.length - 1;
    },

    // Create HTML content for slide based on type
    createSlideContent(slide) {
        switch (slide.type) {
            case 'title':
                return this.createTitleSlide(slide);
            case 'radial':
                return this.createRadialSlide(slide);
            case 'assessment':
                return this.createAssessmentSlide(slide);
            case 'roadmap':
                return this.createRoadmapSlide(slide);
            case 'phase-improvement':
                return this.createPhaseSlide(slide);
            case 'outcomes':
                return this.createOutcomesSlide(slide);
            case 'kpi':
                return this.createKPISlide(slide);
            default:
                return '<div class="slide active">Slide type not recognized</div>';
        }
    },

    // Title slide template
    createTitleSlide(slide) {
        return `
            <div class="slide active title-slide">
                <h1>${slide.title}</h1>
                <p class="subtitle">${slide.subtitle}</p>
                <div class="title-metrics">
                    <div class="metric-card">
                        <div class="metric-label">Current Baseline</div>
                        <div class="metric-value">${slide.baseline}</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Target</div>
                        <div class="metric-value">${slide.target}</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-label">Improvement Gap</div>
                        <div class="metric-value">${slide.gap}</div>
                    </div>
                </div>
            </div>
        `;
    },

    // Radial chart slide
    createRadialSlide(slide) {
        const svg = this.generateRadialChart(slide.dimensions);
        return `
            <div class="slide active">
                <h1>${slide.title}</h1>
                <p style="text-align: center; color: #2185b4; font-weight: 600; margin-bottom: 20px;">${slide.subtitle}</p>
                <div class="radial-chart">${svg}</div>
                <div class="legend">
                    <div class="legend-item">
                        <div class="legend-color" style="background: #ef5350;"></div>
                        Current
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: #ffa726;"></div>
                        Budgeted
                    </div>
                    <div class="legend-item">
                        <div class="legend-color" style="background: #66bb6a;"></div>
                        Kastzalan
                    </div>
                </div>
            </div>
        `;
    },

    // Generate radial chart SVG
    generateRadialChart(dimensions) {
        const size = 400;
        const center = size / 2;
        const maxRadius = 140;
        const levels = 5;
        let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="max-width: 100%;">`;

        // Draw concentric circles
        for (let i = 1; i <= levels; i++) {
            const r = (maxRadius / levels) * i;
            svg += `<circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="#e0e0e0" stroke-width="1"/>`;
        }

        // Draw radial lines and labels
        const angleSlice = (Math.PI * 2) / dimensions.length;
        dimensions.forEach((dim, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const x1 = center + maxRadius * Math.cos(angle);
            const y1 = center + maxRadius * Math.sin(angle);
            svg += `<line x1="${center}" y1="${center}" x2="${x1}" y2="${y1}" stroke="#e0e0e0" stroke-width="1"/>`;

            const labelDist = maxRadius + 30;
            const labelX = center + labelDist * Math.cos(angle);
            const labelY = center + labelDist * Math.sin(angle);
            svg += `<text x="${labelX}" y="${labelY}" font-size="12" font-weight="600" fill="#2c5f73" text-anchor="middle">${dim.name}</text>`;
        });

        // Draw polygons for current, budgeted, kastzalan
        svg += this.drawPolygon(dimensions, 'current', '#ef5350', 0.3, center, maxRadius, angleSlice);
        svg += this.drawPolygon(dimensions, 'budgeted', '#ffa726', 0.2, center, maxRadius, angleSlice, 'dashed');
        svg += this.drawPolygon(dimensions, 'kastzalan', '#66bb6a', 0.2, center, maxRadius, angleSlice);

        svg += `</svg>`;
        return svg;
    },

    // Draw polygon for chart
    drawPolygon(dimensions, property, color, opacity, center, maxRadius, angleSlice, dash = '') {
        let points = '';
        dimensions.forEach((dim, i) => {
            const angle = angleSlice * i - Math.PI / 2;
            const r = (maxRadius / 5) * Math.min(dim[property], 5);
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            points += `${x},${y} `;
        });

        const dashAttr = dash ? `stroke-dasharray="5,5"` : '';
        return `<polygon points="${points}" fill="rgba(${this.hexToRgb(color)},${opacity})" stroke="${color}" stroke-width="2" ${dashAttr}/>`;
    },

    // Convert hex to RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : '0,0,0';
    },

    // Assessment slide
    createAssessmentSlide(slide) {
        let html = `<div class="slide active"><h1>${slide.title}</h1>`;

        if (slide.strengths) {
            html += '<h2>Strengths</h2>';
            slide.strengths.forEach(s => {
                html += `<div class="strength-item">✓ ${s}</div>`;
            });
        }

        if (slide.gaps) {
            html += '<h2>Areas for Improvement</h2>';
            slide.gaps.forEach(g => {
                html += `<div class="gap-item">✗ ${g}</div>`;
            });
        }

        html += '</div>';
        return html;
    },

    // Roadmap slide
    createRoadmapSlide(slide) {
        let html = `<div class="slide active"><h1>${slide.title}</h1>`;

        slide.phases.forEach(phase => {
            html += `
                <div class="phase-box">
                    <h4>${phase.month}: ${phase.focus}</h4>
                    <ul>${phase.activities.map(a => `<li>${a}</li>`).join('')}</ul>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    // Phase improvement slide
    createPhaseSlide(slide) {
        let html = `<div class="slide active"><h1>${slide.title}</h1><div class="phase-improvement-chart">`;

        slide.phases.forEach(phase => {
            html += `
                <div class="phase-progress-item">
                    <div class="phase-progress-label">
                        <span>${phase.name}</span>
                        <span>${phase.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${phase.progress}%">
                            ${phase.progress > 10 ? phase.progress + '%' : ''}
                        </div>
                    </div>
                    <div style="font-size: 13px; color: #666; margin-top: 5px;">${phase.status}</div>
                </div>
            `;
        });

        html += '</div></div>';
        return html;
    },

    // Outcomes slide
    createOutcomesSlide(slide) {
        let html = `<div class="slide active"><h1>${slide.title}</h1>`;

        slide.outcomes.forEach(outcome => {
            html += `
                <div class="outcome-item">
                    <strong>${outcome.metric}</strong><br>
                    From <strong>${outcome.baseline}</strong> → <strong>${outcome.target}</strong><br>
                    <span style="color: #1976d2;">Improvement: ${outcome.improvement}</span>
                </div>
            `;
        });

        html += '</div>';
        return html;
    },

    // KPI slide
    createKPISlide(slide) {
        let html = `<div class="slide active"><h1>${slide.title}</h1><table>
            <tr><th>Area</th><th>Current</th><th>Target</th><th>Owner</th></tr>`;

        slide.metrics.forEach(m => {
            html += `<tr><td>${m.area}</td><td>${m.current}</td><td>${m.target}</td><td>${m.owner}</td></tr>`;
        });

        html += '</table></div>';
        return html;
    },

    // Navigation
    nextSlide() {
        const dept = this.departments[this.currentDepartment];
        if (this.currentSlide < dept.slides.length - 1) {
            this.currentSlide++;
            this.renderSlide();
        }
    },

    previousSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.renderSlide();
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
