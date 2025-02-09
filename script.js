const form = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').querySelector('tbody');


let students = JSON.parse(localStorage.getItem('students')) || [];


displayStudents();

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const studentId = document.getElementById('studentId').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;

  if (!name || !studentId || !email || !contact) {
    alert('All fields are required!');
    return;
  }

  // Add student
  const student = { name, studentId, email, contact };
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));

  // Reset form
  form.reset();

  // Update table
  displayStudents();
});

// Display students
function displayStudents() {
  studentTable.innerHTML = '';

  students.forEach((student, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    studentTable.appendChild(row);
  });
}

// Edit student
function editStudent(index) {
  const student = students[index];
  document.getElementById('name').value = student.name;
  document.getElementById('studentId').value = student.studentId;
  document.getElementById('email').value = student.email;
  document.getElementById('contact').value = student.contact;

  deleteStudent(index);
}

// Delete student
function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}
