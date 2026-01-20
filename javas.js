window.onload = function () {
    showStudents();
};

let editIndex = null;

// Add or Update Student
function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;

    if (name === "" || roll === "" || course === "") {
        alert("Please fill all fields");
        return;
    }
   

    let students = localStorage.getItem("students");
    students = students ? JSON.parse(students) : [];

    let rollExists = students.some((student, index) =>
    student.roll === roll && index !== editIndex
);

if (rollExists) {
    alert("Roll number already exists");
    return;
}



    if (editIndex === null) {
        // ADD
        students.push({ name, roll, course });
    } else {
        // UPDATE
        students[editIndex] = { name, roll, course };
        editIndex = null;
    }
    

    localStorage.setItem("students", JSON.stringify(students));
    showStudents();
    document.getElementById("studentForm").reset();
}

// Show students
function showStudents() {

    let students = localStorage.getItem("students");
    students = students ? JSON.parse(students) : [];

    let html = "";

    students.forEach((student, index) => {
        html += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                    onclick="editStudent(${index})">Edit</button>

                <button class="btn btn-danger btn-sm"
                    onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
    });

    document.getElementById("studentTable").innerHTML = html;
}

// Edit student
function editStudent(index) {

    let students = JSON.parse(localStorage.getItem("students"));

    document.getElementById("name").value = students[index].name;
    document.getElementById("roll").value = students[index].roll;
    document.getElementById("course").value = students[index].course;

    editIndex = index;
}

// Delete student
function deleteStudent(index) {

    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));
    showStudents();
}

// Search student
function searchStudent() {

    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}
function tableprint() {
  let printContents = document.getElementById("studentlist").outerHTML;
  let originalContents = document.body.innerHTML;

  document.body.innerHTML = `
    <html>
      <head>
        <style>
          table{
            width: 100%;
            border-collapse: collapse;
          }
          th, td{
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `;

  window.print();
  document.body.innerHTML = originalContents;
  location.reload();
}


