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


loadFromStorage();



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

