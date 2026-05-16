// ============================================================
// 1. Objects & Classes
//    Model app data using ES6 classes with computed properties
// ============================================================

class Student {
    constructor(id, name, grade, absence, selectedCourses = []) {
        this.id = id;
        this.name = name;
        this.grade = parseFloat(grade);
        this.absence = parseFloat(absence);
        this.courses = Array.isArray(selectedCourses) ? selectedCourses : [];
        // Computed status based on grade threshold
        this.status = this.grade >= 50 ? 'Passed' : 'Failed';
    }
}

class Course {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

// ============================================================
// 2. Arrays & Array Methods
//    Core data stores; all mutations use push/filter/map/find
// ============================================================

// Seed data — default courses so the app works out of the box
const DEFAULT_COURSES = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Chemistry' },
    { id: 4, name: 'English' },
    { id: 5, name: 'History' },
];

// ============================================================
// 6. localStorage
//    Load persisted data; seed courses only on first run
// ============================================================

let students = [];
let courses  = [];

const loadFromStorage = () => {
    try {
        students = JSON.parse(localStorage.getItem('sms_data'))    || [];
        const saved = JSON.parse(localStorage.getItem('courses_data'));
        // First-time run: inject seed courses
        courses = saved !== null ? saved : DEFAULT_COURSES.map(c => new Course(c.id, c.name));
        if (saved === null) localStorage.setItem('courses_data', JSON.stringify(courses));
    } catch (err) {
        console.error('[SMS] Storage load error:', err);
        students = [];
        courses  = DEFAULT_COURSES.map(c => new Course(c.id, c.name));
    }
};

const saveStudents = () => {
    try {
        localStorage.setItem('sms_data', JSON.stringify(students));
    } catch (err) {
        console.error('[SMS] Could not save students:', err);
    }
};

const saveCourses = () => {
    try {
        localStorage.setItem('courses_data', JSON.stringify(courses));
    } catch (err) {
        console.error('[SMS] Could not save courses:', err);
    }
};

const saveStudents = () => {
    try {
        localStorage.setItem('sms_data', JSON.stringify(students));
    } catch (err) {
        console.error('[SMS] Could not save students:', err);
    }
};

const saveCourses = () => {
    try {
        localStorage.setItem('courses_data', JSON.stringify(courses));
    } catch (err) {
        console.error('[SMS] Could not save courses:', err);
    }
};





const saveStudents = () => {
    try {
        localStorage.setItem('sms_data', JSON.stringify(students));
    } catch (err) {
        console.error('[SMS] Could not save students:', err);
    }
};

const saveCourses = () => {
    try {
        localStorage.setItem('courses_data', JSON.stringify(courses));
    } catch (err) {
        console.error('[SMS] Could not save courses:', err);
    }
};


loadFromStorage();


// ============================================================
// 7. Cookies
//    Store & restore last-used username preference
// ============================================================

/** Set a cookie with optional expiry in days */
const setCookie = (name, value, days = 30) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

/** Get a cookie value by name; returns null if not found */
const getCookie = name => {
    const match = document.cookie
        .split('; ')
        .find(row => row.startsWith(encodeURIComponent(name) + '='));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
};

/** Delete a cookie */
const deleteCookie = name => {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Pre-fill username from cookie on page load
const savedUser = getCookie('sms_last_user');
if (savedUser) {
    const userInput = document.getElementById('usernameInput');
    if (userInput) userInput.value = savedUser;
}

// ============================================================
// 10. Dynamic UI & User Feedback
//     Custom popup system (replaces native alert/confirm)
// ============================================================


const showPopup = ({
    title = 'Notice',
    message = '',
    icon = 'ℹ️',
    type = 'info',
    onConfirm = null,
    showCancel = false,
    confirmLabel = 'OK',
    cancelLabel = 'Cancel'
} = {}) => {

    const overlay = document.getElementById('popupOverlay');
    const card = document.getElementById('popupCard');

    document.getElementById('popupIcon').textContent = icon;
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupMessage').textContent = message;

    overlay.className = 'popup-overlay';
    overlay.classList.add(`popup-${type}`);
    overlay.style.display = 'flex';
    overlay.classList.add('active');

    const actions = document.getElementById('popupActions');

    actions.innerHTML = '';

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'popup-btn-confirm';
    confirmBtn.textContent = confirmLabel;

    confirmBtn.addEventListener('click', () => {
        closePopup();
        if (onConfirm) onConfirm();
    });

    actions.appendChild(confirmBtn);

    if (showCancel) {
        const cancelBtn = document.createElement('button');

        cancelBtn.className = 'popup-btn-cancel';
        cancelBtn.textContent = cancelLabel;

        cancelBtn.addEventListener('click', closePopup);

        actions.appendChild(cancelBtn);
    }

    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = '';
};


const closePopup = () => {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.remove('active');
    overlay.style.display = 'none';
};
