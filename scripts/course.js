const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces programming fundamentals using Python.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'An introduction to the World Wide Web and basic HTML/CSS development.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Learn to organize programs using reusable functions and debugging techniques.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Introduces object-oriented concepts such as classes, inheritance, and polymorphism.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Create dynamic websites using JavaScript and responsive design.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Focus on accessibility, performance optimization, and API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

const courseList = document.getElementById('courseList');
const creditTotal = document.getElementById('creditTotal');

function displayCourses(filtered) {
  courseList.innerHTML = '';
  let total = 0;

  filtered.forEach(course => {
    const div = document.createElement('div');
    div.classList.add('course');
    if (course.completed) div.classList.add('completed');
    div.innerHTML = `
      <strong>${course.subject} ${course.number} - ${course.title}</strong><br>
      <em>${course.description}</em><br>
      <small>Credits: ${course.credits}</small>
    `;
    courseList.appendChild(div);
    total += course.credits;
  });

  creditTotal.textContent = `Total Credits: ${total}`;
}

document.getElementById('all').addEventListener('click', () => displayCourses(courses));
document.getElementById('wdd').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));
document.getElementById('cse').addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));

displayCourses(courses);