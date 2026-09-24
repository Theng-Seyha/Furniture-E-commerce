/**
 * Anti Studio | Internship Portal (Pure Vanilla JS)
 * Handles multi-step form navigation, validation, and theme switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switching Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('anti_intern_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('anti_intern_theme', body.classList.contains('dark') ? 'dark' : 'light');
    });

    // 2. Multi-Step Form Logic
    const form = document.getElementById('application-form');
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tab-content');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const stepLabel = document.querySelector('.step-label');
    const progressBar = document.querySelector('.bar-fill');

    let currentStep = 0; // 0, 1, 2
    const totalSteps = 3;

    const updateUI = () => {
        // Show/Hide sections
        sections.forEach((sec, idx) => {
            sec.classList.toggle('active', idx === currentStep);
        });

        // Update tabs
        tabs.forEach((tab, idx) => {
            tab.classList.toggle('active', idx === currentStep);
        });

        // Update Buttons
        prevBtn.style.display = currentStep === 0 ? 'none' : 'block';
        nextBtn.style.display = currentStep === totalSteps - 1 ? 'none' : 'block';
        submitBtn.style.display = currentStep === totalSteps - 1 ? 'block' : 'none';

        // Update Progress
        const percent = ((currentStep + 1) / totalSteps) * 100;
        progressBar.style.width = `${percent}%`;
        stepLabel.textContent = `Step ${currentStep + 1} of 3`;
    };

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            updateUI();
            window.scrollTo({ top: 100, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', () => {
        currentStep--;
        updateUI();
    });

    // Tab direct clicking (only if validated)
    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', () => {
            if (idx < currentStep || validateStep(currentStep)) {
                currentStep = idx;
                updateUI();
            }
        });
    });

    // 3. Simple Form Validation
    const validateStep = (step) => {
        const currentSection = sections[step];
        const inputs = currentSection.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });

        if (!isValid) {
            // Shake animation
            const card = document.querySelector('.form-glass-card');
            card.style.animation = 'shake 0.4s ease-in-out';
            setTimeout(() => card.style.animation = '', 400);
        }

        return isValid;
    };

    // 4. File Upload UI Feedback
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('resume');
    const fileNameDisplay = document.getElementById('file-name');

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            fileNameDisplay.textContent = `Selected: ${fileName}`;
            dropZone.style.borderColor = '#059669';
            dropZone.style.background = 'rgba(5, 150, 105, 0.05)';
        }
    });

    // Drag & Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, e => e.preventDefault());
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            fileInput.files = files;
            const fileName = files[0].name;
            fileNameDisplay.textContent = `Dropped: ${fileName}`;
        }
    });

    // 5. Final Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Final validation
        if (!fileInput.files.length) {
            alert('Please upload your resume to complete the application.');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Transmitting...';

        // Simulate network delay
        setTimeout(() => {
            document.getElementById('success-overlay').classList.add('active');
            
            // Console log for demo
            const formData = new FormData(form);
            console.log('Application Submitted Successfully!');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
        }, 1500);
    });
});

// Add shake keyframes to head
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
`;
document.head.appendChild(style);
