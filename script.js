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

// ============================================================
// 3. DOM Manipulation helpers
//    All UI changes happen here — no page reloads
// ============================================================

/** Show one section, hide all others */
const hideAll = () => {
    ['loginSection', 'adminDashboard', 'studentView', 'courseManagement'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
};

/** Show admin dashboard */
const showAdmin = () => {
    hideAll();
    document.getElementById('adminDashboard').style.display = 'block';
    updateCourseCheckboxes();
    renderTable();
    updateStats();
};

/** Show course management page */
const showCoursePage = () => {
    hideAll();
    document.getElementById('courseManagement').style.display = 'block';
    renderCourseTable();
};



// ============================================================
// 10. Live counter — updates every time data changes
// ============================================================

const updateStats = () => {
    // Use array methods: filter for pass/fail counts
    const passed = students.filter(s => s.status === 'Passed').length;
    const failed = students.filter(s => s.status === 'Failed').length;

    animateCounter('totalCount',  students.length);
    animateCounter('passCount',   passed);
    animateCounter('failCount',   failed);
    animateCounter('courseCount', courses.length);
};

/** Briefly scale the stat number when it changes */
const animateCounter = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = value;
    el.style.transform = 'scale(1.3)';
    el.style.color = '#93c5fd';
    setTimeout(() => {
        el.style.transform = 'scale(1)';
        el.style.color = '';
    }, 300);
};

// ============================================================
// 4. Event Listeners — login form
// ============================================================

document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('usernameInput').value.trim().toLowerCase();
    const p = document.getElementById('passwordInput').value;
    const errEl = document.getElementById('loginError');

    // ── 8. Conditional Logic & Validation ──
    if (!u || !p) {
        showInlineError(errEl, '⚠️ Please enter both username and password.');
        return;
    }

    // ── 9. Error Handling ──
    try {
        if (u === 'admin' && p === '123') {
            setCookie('sms_last_user', 'admin');  // 7. Cookie — save preference
            const savedName = getCookie('sms_last_user');
            document.getElementById('adminWelcome').textContent =
                `Welcome back, ${savedName || 'Admin'}! 👋`;
            errEl.style.display = 'none';
            showAdmin();
        } else if (u === 'student' && p === '123') {
            setCookie('sms_last_user', 'student');
            errEl.style.display = 'none';
            showStudentPortal();
        } else {
            showInlineError(errEl, '❌ Incorrect credentials. Try admin/123 or student/123.');
        }
    } catch (err) {
        console.error('[SMS] Login error:', err);
        showInlineError(errEl, '⚠️ Unexpected error. Please try again.');
    }
});

// Allow Enter key on password field
document.getElementById('passwordInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('loginForm').dispatchEvent(new Event('submit'));
});

// ============================================================
// 5. Functions — well-named, single-responsibility
// ============================================================

/** Display inline validation error with shake animation */
const showInlineError = (el, msg) => {
    el.textContent = msg;
    el.style.display = 'block';
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = 'shake 0.4s ease';
};

/** Build course checkboxes from courses array */
const updateCourseCheckboxes = () => {
    const container = document.getElementById('checkboxList');
    if (!container) return;
    container.innerHTML = '';

    if (courses.length === 0) {
        container.innerHTML = '<span style="color:#fca5a5; font-size:0.85rem;">No courses found! Add courses first.</span>';
        return;
    }

    // Array method: forEach to create checkbox labels
    courses.forEach(c => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="courseCheck" value="${c.name}"> <span>${c.name}</span>`;
        container.appendChild(label);
    });
};

/** Render the student table */
const renderTable = () => {
    const tbody = document.getElementById('studentTableBody');
    const empty = document.getElementById('emptyState');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (students.length === 0) {
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    // Array method: forEach to build rows
    students.forEach((s, i) => {
        // Array method: map to create badges
        const badges = (s.courses || [])
            .map(c => `<span class="badge">${c}</span>`)
            .join(' ');
        const statusBadge = s.status === 'Passed'
            ? `<span class="badge badge-pass">✔ Passed</span>`
            : `<span class="badge badge-fail">✘ Failed</span>`;

        const tr = document.createElement('tr');
        tr.className = 'row-animate';
        tr.style.animationDelay = `${i * 40}ms`;
        tr.innerHTML = `
            <td><b>${escapeHtml(s.name)}</b></td>
            <td>${s.grade}</td>
            <td>${s.absence}%</td>
            <td>${badges || '<span style="color:#64748b">—</span>'}</td>
            <td>${statusBadge}</td>
            <td>
                <button class="btn-danger delete-student-btn" data-id="${s.id}">Delete</button>
            </td>`;
        tbody.appendChild(tr);
    });

    // 4. Event listeners — attach delete via delegation
    attachDeleteListeners();
};

/** Attach click listeners to all delete-student buttons */
const attachDeleteListeners = () => {
    document.querySelectorAll('.delete-student-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            // Array method: find to get student name for message
            const student = students.find(s => s.id === id);
            showPopup({
                title:       'Delete Student?',
                message:     `Remove "${student?.name || 'this student'}" from the system? This cannot be undone.`,
                icon:        '🗑️',
                type:        'warning',
                showCancel:  true,
                confirmLabel:'Delete',
                cancelLabel: 'Keep',
                onConfirm:   () => deleteStudent(id),
            });
        });
    });
};


const deleteStudent = id => {
    try {
        students = students.filter(s => Number(s.id) !== Number(id));

        saveStudents();
        renderTable();
        updateStats();

        showPopup({
            title: 'Deleted!',
            message: 'The student has been removed successfully.',
            icon: '✅',
            type: 'success'
        });

    } catch (err) {
        console.error('[SMS] Delete error:', err);

        showPopup({
            title: 'Error',
            message: 'Could not delete student.',
            icon: '❌',
            type: 'error'
        });
    }
};

/** Render student portal table */
const renderStudentPortal = () => {
    const container = document.getElementById('studentDataCard');
    if (!container) return;

    if (students.length === 0) {
        container.innerHTML = '<div class="empty-state"><span>🎒</span><p>No students enrolled yet.</p></div>';
        return;
    }

    // Array method: map to build rows
    const rows = students.map(s => {
        const badges = (s.courses || [])
            .map(c => `<span class="badge">${c}</span>`)
            .join(' ');
        const statusBadge = s.status === 'Passed'
            ? `<span class="badge badge-pass">✔ Passed</span>`
            : `<span class="badge badge-fail">✘ Failed</span>`;
        return `<tr class="row-animate">
                    <td><b>${escapeHtml(s.name)}</b></td>
                    <td>${s.grade}</td>
                    <td>${badges || '—'}</td>
                    <td>${statusBadge}</td>
                </tr>`;
    }).join('');

    container.innerHTML = `
        <h3 class="section-title">📋 Enrolled Students</h3>
        <div class="table-wrap">
            <table>
                <thead><tr><th>Name</th><th>Grade</th><th>Courses</th><th>Status</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>`;
};

/** Render course management table */
const renderCourseTable = () => {
    const tbody     = document.getElementById('courseTableBody');
    const emptyEl   = document.getElementById('emptyCourseState');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (courses.length === 0) {
        if (emptyEl) emptyEl.style.display = 'block';
        return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    // Array method: forEach
    courses.forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.className = 'row-animate';
        tr.style.animationDelay = `${i * 40}ms`;
        tr.innerHTML = `
            <td><b>${escapeHtml(c.name)}</b></td>
            <td>
                <button class="btn-danger delete-course-btn" data-id="${c.id}">Delete</button>
            </td>`;
        tbody.appendChild(tr);
    });

    // Attach course delete listeners
    document.querySelectorAll('.delete-course-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            const course = courses.find(c => c.id === id);
            showPopup({
                title:       'Delete Course?',
                message:     `Remove "${course?.name}" from available courses?`,
                icon:        '🗑️',
                type:        'warning',
                showCancel:  true,
                confirmLabel:'Delete',
                cancelLabel: 'Keep',
                onConfirm:   () => deleteCourse(id),
            });
        });
    });

    updateStats();
};

/** Delete a course by ID */
const deleteCourse = id => {
    try {
        courses = courses.filter(c => c.id !== id);
        saveCourses();
        renderCourseTable();
        showPopup({
            title:   'Course Deleted',
            message: 'The course has been removed.',
            icon:    '✅',
            type:    'success',
        });
    } catch (err) {
        console.error('[SMS] Course delete error:', err);
        showPopup({ title: 'Error', message: 'Could not delete course.', icon: '❌', type: 'error' });
    }
};

/** Sanitize user input to prevent XSS in innerHTML */
const escapeHtml = str => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
};

/** Logout: clear session cookie + reload */
const logout = () => {
    deleteCookie('sms_last_user');
    location.reload();
};

// ============================================================
// 4. Event Listeners — Add Student button
// ============================================================

document.getElementById('addBtn').addEventListener('click', () => {
    const name  = document.getElementById('stdName').value.trim();
    const grade = document.getElementById('stdGrade').value;
    const abs   = document.getElementById('stdAbsence').value || 0;
    const errEl = document.getElementById('addError');

    // Array method: querySelectorAll returns NodeList, convert with Array.from
    const checked  = Array.from(document.querySelectorAll('input[name="courseCheck"]:checked'));
    const selected = checked.map(cb => cb.value);

    // ── 8. Validation ──
    if (!name) {
        showInlineError(errEl, '⚠️ Please enter the student name.');
        return;
    }
    if (grade === '' || isNaN(parseFloat(grade))) {
        showInlineError(errEl, '⚠️ Please enter a valid grade (0–100).');
        return;
    }
    if (parseFloat(grade) < 0 || parseFloat(grade) > 100) {
        showInlineError(errEl, '⚠️ Grade must be between 0 and 100.');
        return;
    }
    if (parseFloat(abs) < 0 || parseFloat(abs) > 100) {
        showInlineError(errEl, '⚠️ Absence % must be between 0 and 100.');
        return;
    }
    if (selected.length === 0) {
        showInlineError(errEl, '⚠️ Please select at least one course.');
        return;
    }

    errEl.style.display = 'none';

    // ── 9. Error Handling ──
    try {
        // 1. Class instantiation
        const newStudent = new Student(Date.now(), name, grade, abs, selected);
        // 2. Array method: push
        students.push(newStudent);
        saveStudents();

        // Reset form fields
        ['stdName', 'stdGrade', 'stdAbsence'].forEach(id => {
            document.getElementById(id).value = '';
        });
        document.querySelectorAll('input[name="courseCheck"]').forEach(cb => cb.checked = false);

        renderTable();
        updateStats();

        // 10. Confirmation popup
        showPopup({
            title:   'Student Added! 🎉',
            message: `${name} has been enrolled in ${selected.join(', ')}.`,
            icon:    '✅',
            type:    'success',
        });
    } catch (err) {
        console.error('[SMS] Add student error:', err);
        showPopup({ title: 'Error', message: 'Could not add student. Please try again.', icon: '❌', type: 'error' });
    }
});

// ── keydown shortcut: Enter in name field moves to grade ──
document.getElementById('stdName').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('stdGrade').focus();
});

// ============================================================
// 4. Event Listeners — Add Course button
// ============================================================

document.getElementById('addCourseBtn').addEventListener('click', () => {
    const name  = document.getElementById('courseName').value.trim();
    const errEl = document.getElementById('courseError');

    if (!name) {
        showInlineError(errEl, '⚠️ Please enter a course name.');
        return;
    }

    // Array method: find — prevent duplicates
    const exists = courses.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        showInlineError(errEl, `⚠️ "${name}" already exists.`);
        return;
    }

    errEl.style.display = 'none';

    try {
        courses.push(new Course(Date.now(), name));
        saveCourses();
        document.getElementById('courseName').value = '';
        renderCourseTable();
        showPopup({
            title:   'Course Added!',
            message: `"${name}" is now available for students.`,
            icon:    '📚',
            type:    'success',
        });
    } catch (err) {
        console.error('[SMS] Add course error:', err);
        showPopup({ title: 'Error', message: 'Could not add course.', icon: '❌', type: 'error' });
    }
});

// Enter key in course name input
document.getElementById('courseName').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('addCourseBtn').click();
});

// ============================================================
// 4. Event Listeners — Navigation buttons
// ============================================================

document.getElementById('manageCoursesBtn').addEventListener('click', showCoursePage);
document.getElementById('backToAdminBtn').addEventListener('click', showAdmin);
document.getElementById('logoutBtnAdmin').addEventListener('click', logout);
document.getElementById('logoutBtnStudent').addEventListener('click', logout);

// Initial render
renderTable();
updateStats();
updateCourseCheckboxes();
