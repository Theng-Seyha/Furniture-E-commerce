/**
 * Anti Studio | Internship Portal (Pure Vanilla JS)
 * Handles multi-step form navigation, validation, and theme switching.
 */

// 0. Initialize Firebase
const firebaseConfig = {
    projectId: "balmy-haven-5vxch",
    appId: "1:943077997436:web:1b81c0ece704f384e382f9",
    apiKey: "AIzaSyAmOrj3Elh5VTiZYXUcuHN_DrV3kS1qKJc",
    authDomain: "balmy-haven-5vxch.firebaseapp.com",
    storageBucket: "balmy-haven-5vxch.firebasestorage.app",
    messagingSenderId: "943077997436"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.app().firestore("ai-studio-antimodernfurnit-710d3189-8309-4d78-9061-75857e104adc");

// Global Monitoring for Internship Portal
const reportPortalError = async (error, severity = 'error') => {
    try {
        await db.collection('runtime_errors').add({
            message: error.message || 'Unknown Portal Error',
            stack: error.stack || null,
            url: window.location.href,
            userAgent: navigator.userAgent,
            component: 'InternshipPortal',
            severity: severity,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (e) {
        console.error('Failed to log portal error:', e);
    }
};

window.addEventListener('error', (event) => reportPortalError(event.error || { message: event.message }));
window.addEventListener('unhandledrejection', (event) => reportPortalError(event.reason instanceof Error ? event.reason : { message: String(event.reason) }, 'fatal'));

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switching Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('fur_intern_theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('fur_intern_theme', body.classList.contains('dark') ? 'dark' : 'light');
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
            const isActive = idx === currentStep;
            if (isActive && !sec.classList.contains('active')) {
                sec.classList.add('active');
                gsap.fromTo(sec, 
                    { opacity: 0, y: 15 }, 
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            } else if (!isActive) {
                sec.classList.remove('active');
            }
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

    // 3. GSAP Enhanced Form Validation
    const validateStep = (step) => {
        const currentSection = sections[step];
        const inputs = currentSection.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                // GSAP Shake on individual input
                gsap.to(input, {
                    x: 6,
                    duration: 0.1,
                    repeat: 5,
                    yoyo: true,
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)'
                });
                isValid = false;
            } else {
                gsap.to(input, {
                    x: 0,
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.05)',
                    duration: 0.3
                });
            }
        });

        if (!isValid) {
            // Shake the whole card
            const card = document.querySelector('.form-glass-card');
            gsap.to(card, {
                x: 10,
                duration: 0.1,
                repeat: 3,
                yoyo: true,
                ease: "power2.inOut",
                onComplete: () => gsap.set(card, { x: 0 })
            });
        }

        return isValid;
    };

    // Real-time feedback listeners
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.hasAttribute('required') && input.value.trim()) {
                gsap.to(input, {
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.05)',
                    duration: 0.3
                });
            } else if (input.hasAttribute('required')) {
                gsap.to(input, {
                    borderColor: '',
                    backgroundColor: '',
                    duration: 0.3
                });
            }
        });
    });

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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Final validation
        if (!fileInput.files.length) {
            alert('Please upload your resume to complete the application.');
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Transmitting...';

        const formData = new FormData(form);
        
        // Fire Telegram Notification
        const result = await sendInternshipToTelegram(formData);

        // Show Success Overlay
        const successOverlay = document.getElementById('success-overlay');
        const refDisplay = successOverlay.querySelector('.text-stone-500');
        if (refDisplay && result.ref) {
            refDisplay.innerHTML = `Your application <b>${result.ref}</b> has been received. Our engineering lead will review your portfolio and GitHub.`;
        }
        successOverlay.classList.add('active');
        
        // GSAP Success Animation
        gsap.from(successOverlay.querySelector('.success-card'), {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });

        gsap.from(successOverlay.querySelector('.success-icon'), {
            rotate: -180,
            scale: 0,
            duration: 1,
            delay: 0.3,
            ease: "elastic.out(1, 0.5)"
        });
        
        // Console log for audit
        console.log('Application Submitted Successfully!');
    });

    // Initialize UI
    updateUI();

    /**
     * Sends internship data to the Workshop Bot
     */
    const sendInternshipToTelegram = async (formData) => {
        // Shared Studio Bot Configuration
        const botToken = '8888825923:AAEzB68kP5_F7KV74IN3nUVUnUIuVQFG05M';
        const chatId = '1662189487';
        
        const name = formData.get('fullname');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const university = formData.get('university');
        const github = formData.get('github');
        const motivation = formData.get('motivation');
        const skills = formData.getAll('skills').join(', ');
        
        const ref = `INT-${Math.floor(100000 + Math.random() * 900000)}`;

        // Persistent Storage in Firestore
        try {
            await db.collection('internship_applications').doc(ref).set({
                fullname: name,
                email: email,
                phone: phone || '',
                university: university || '',
                github: github || '',
                skills: skills || '',
                motivation: motivation || '',
                status: 'Received',
                ref: ref,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Stored in Firestore:', ref);
        } catch (dbErr) {
            console.error('Firestore storage failed:', dbErr);
        }

        const messageText = `
🎓 <b>NEW INTERNSHIP APPLICATION</b>
━━━━━━━━━━━━━━━━━━━━━
<b>Ref:</b> <code>${ref}</code>
<b>Name:</b> ${name}
<b>Email:</b> ${email}
<b>Phone:</b> ${phone}
<b>University:</b> ${university}
━━━━━━━━━━━━━━━━━━━━━
<b>GitHub:</b> ${github}
<b>Skills:</b> ${skills}
━━━━━━━━━━━━━━━━━━━━━
<b>Vision:</b>
<i>${motivation}</i>
━━━━━━━━━━━━━━━━━━━━━
<i>Dispatched from Fur Studio Engineering Portal</i>
`.trim();

        // Create Quick Reply Buttons for Admin
        const inline_keyboard = [];
        if (email) {
            inline_keyboard.push([
                { 
                    text: "📧 Reply via Email", 
                    url: `mailto:${email}?subject=${encodeURIComponent(`Regarding your Fur Studio Internship Application (${ref})`)}` 
                }
            ]);
        }
        
        // If phone looks like it could be on Telegram/WhatsApp
        const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
        if (cleanPhone) {
            inline_keyboard.push([
                { 
                    text: "💬 Reply via WhatsApp", 
                    url: `https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello ${name}! I am Theng Seyha from Fur Studio. I just reviewed your internship application ${ref}...`)}` 
                }
            ]);
        }

        try {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: messageText,
                    parse_mode: 'HTML',
                    reply_markup: inline_keyboard.length > 0 ? { inline_keyboard } : undefined
                })
            });
            return { success: true, ref };
        } catch (err) {
            console.warn('Telegram notification relay failed, but application local record kept.');
            return { success: false };
        }
    };
});
