"use strict";

//Select Elements
const nameEl = document.getElementById("student-name");
const emailEl = document.getElementById("student-email");
const phoneNumberEl = document.getElementById("student-phoneNumber");
const addressEl = document.getElementById("student-address");
const genderMaleEl = document.getElementById("male");
const genderFemaleEl = document.getElementById("female");
const btnSave = document.getElementById("btn-save-data");
const tableBodyEl = document.querySelector(".student-infos");
const searchDataInputEl = document.getElementById("student-search-data");
const btnSearch = document.getElementById("btn-search-student");
const btnReturn = document.getElementById("btn-return");

//If localstorage has a studentsData array, then use it
//Otherwise, use the default array.
let studentsData;

//Retrieve localStore
const savedStudentsData = JSON.parse(localStorage.getItem("studentsData"));

function Students({ id, name, email, phoneNumber, address, gender }) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.phoneNumber = phoneNumber;
  this.address = address;
  this.gender = gender;
}
//Check if it's an array
if (Array.isArray(savedStudentsData)) {
  studentsData = savedStudentsData;
  console.log(studentsData);
} else {
  studentsData = [
    {
      id: "id1",
      name: "rikkei",
      email: "rikkei@gmail.com",
      phoneNumber: "0823868888",
      address: "hà nội",
      gender: "nam",
    },
    {
      id: "id2",
      name: "academy",
      email: "rikkei@gmail.com",
      phoneNumber: "0828638888",
      address: "HCM",
      gender: "nữ",
    },
  ];
}

function rederStudentData() {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < studentsData.length; i++) {
    tableBodyEl.innerHTML += ` <tr>
    <td>${i + 1}</td>
    <td>${studentsData[i].name}</td>
    <td>${studentsData[i].email}</td>
    <td>${studentsData[i].phoneNumber}</td>
    <td>${studentsData[i].address}</td>
    <td>${studentsData[i].gender}</td>
    <td><a id=${studentsData[i].id} onclick="editStudentData(this)">Edit</a>
    <a  id=${
      studentsData[i].id
    } onclick="deleteStudentData(this)">Delete</a></td>
    <td></td>
  </tr>`;
  }
}

function resetValue() {
  nameEl.value = "";
  emailEl.value = "";
  phoneNumberEl.value = "";
  addressEl.value = "";
  genderMaleEl.checked = true;
}

btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  let gender = "Nam";
  if (genderMaleEl.checked) {
    gender = "Nam";
  } else if (genderFemaleEl.checked) {
    gender = "Nữ";
  }

  function checkValidPhoneNuber() {
    if (phoneNumberEl.value.length <= 10 && phoneNumberEl.value[0] == 0) {
      return phoneNumberEl.value;
    } else {
      const phoneNumberUnvalidAlertEl = document.createElement("span");
      phoneNumberUnvalidAlertEl.setAttribute("class", "alert-message");
      phoneNumberUnvalidAlertEl.innerHTML =
        "Phải nhập đúng định dạng số điện thoại Việt Nam (Ít hơn 10 số và bắt đầu bằng số 0)";
      document
        .querySelector(".phoneNumber")
        .appendChild(phoneNumberUnvalidAlertEl);
      console.log(phoneNumberUnvalidAlertEl);
      return "";
    }
  }
  let phoneNumber = checkValidPhoneNuber();

  let studentData = new Students({
    id: "" + new Date().getTime(),
    name: nameEl.value,
    email: emailEl.value,
    phoneNumber: phoneNumber,
    address: addressEl.value,
    gender,
  });
  studentsData.push(studentData);
  saveStudentsData();
  rederStudentData();
  resetValue();
});

function removeStudentData(idToDelete) {
  studentsData = studentsData.filter((item) => item.id !== idToDelete);
  console.log(studentsData);
  saveStudentsData();
}

function saveStudentsData() {
  localStorage.setItem("studentsData", JSON.stringify(studentsData));
}

function deleteStudentData(item) {
  removeStudentData(item.id);
  rederStudentData();
}

function editStudentData(item) {
  for (let student of studentsData) {
    if (item.id === student.id) {
      nameEl.value = student.name;
      emailEl.value = student.email;
      phoneNumberEl.value = student.phoneNumber;
      addressEl.value = student.address;
      genderMaleEl.value = student.gender;
    }
  }
  removeStudentData(item.id);
  rederStudentData();
}

rederStudentData();

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();

  const searchInput = searchDataInputEl.value.toLowerCase().trim();
  console.log(searchInput);

  for (const student of studentsData) {
    if (student.name.toLowerCase().trim().includes(searchInput)) {
      console.log(true);
      tableBodyEl.innerHTML += ` <tr>
    <td>1</td>
    <td>${student.name}</td>
    <td>${student.email}</td>
    <td>${student.phoneNumber}</td>
    <td>${student.address}</td>
    <td>${student.gender}</td>
    <td><a id=${student.id} onclick="editStudentData(this)">Edit</a>
    <a  id=${student.id} onclick="deleteStudentData(this)">Delete</a></td>
    <td></td>
  </tr>`;
    } else tableBodyEl.innerHTML = "";
  }
});

btnReturn.addEventListener("click", rederStudentData);
