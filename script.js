"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

function start() {
  console.log("ready");
  registerButtons();
  loadJSON();
}
function registerButtons() {
  document.querySelectorAll("[data-action=filter]").forEach((button) => button.addEventListener("click", selectFilter));
}

function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach((elem) => {
    console.log(elem);
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const Student = {
      firstname: "",
      lastname: "",
      middlename: "",
      nickname: "",
      image: "",
      house: "",
    };
    const student = Object.create(Student);
    console.log(student);
    console.log(Student);
    let fullname = elem.fullname.trim();
    let house = elem.house.trim();
    console.log(fullname);
    //The first name
    let firstname = (student.firstname = fullname.substring(fullname.lastIndexOf(), fullname.indexOf(" ")));
    console.log(fullname.indexOf(" "));
    // console.log(fullname.length);
    if (fullname.indexOf(" ") >= 0) {
      console.log(fullname.indexOf(firstname));
      student.firstname = student.firstname.substring(0, 1).toUpperCase() + student.firstname.substring(1).toLowerCase();
      // student.firstname = firstname[0].toUpperCase() + firstname.substring(1).toLowerCase();
      console.log(firstname);
    } else {
      console.log("not 0");

      firstname = student.firstname = fullname.substring(fullname.indexOf(" ") + 1);
      console.log(firstname);
    }

    //The last name
    let lastname = (student.lastname = fullname.substring(fullname.lastIndexOf(" ") + 1));
    // student.lastname = student.lastname.substring(0, 1).toUpperCase() + student.lastname.substring(1).toLowerCase();
    if (fullname.indexOf(" ") >= 0) {
      console.log(fullname.indexOf(lastname));
      student.lastname = student.lastname.substring(0, 1).toUpperCase() + student.lastname.substring(1).toLowerCase();
      // student.firstname = firstname[0].toUpperCase() + firstname.substring(1).toLowerCase();
      console.log(lastname);
    } else {
      console.log("not 0");

      lastname = student.lastname = "";

      console.log(lastname);
    }
    console.log(student.lastname);

    //The middle name
    let middlename = fullname.substring(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
    if (middlename.includes('"')) {
      student.nickname = fullname.substring(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
      console.log(student.nickname);
    } else {
      student.middlename = fullname.substring(fullname.indexOf(" ") + 1, fullname.lastIndexOf(" "));
      student.middlename = student.middlename.substring(0, 1).toUpperCase() + student.middlename.substring(1).toLowerCase();
      console.log(student.middlename);
    }
    console.log(student.middlename);

    //The house
    student.house = house;
    student.house = student.house.substring(0, 1).toUpperCase() + student.house.substring(1).toLowerCase();

    console.log(student.house);

    //The image
    if (fullname.indexOf(" ") == -1) {
      let studentlastnamesmall = student.lastname.toLowerCase();
      student.image = studentlastnamesmall + `_${student.firstname.substring(0, 1).toLowerCase()}` + `.png`;
      console.log(student.image);
    }

    allStudents.push(student);
  });

  displayList(allStudents);
}
function selectFilter(event) {
  const filter = event.target.dataset.filter;
  console.log(`user selected ${filter}`);
  filterList(filter);
}
function filterList(filterBy) {
  let filteredList = allStudents;
  if (filterBy === "Slytherin") {
    filteredList = allStudents.filter(isSl);
  } else if (filterBy === "Gryffindor") {
    filteredList = allStudents.filter(isGr);
  } else if (filterBy === "Hufflepuff") {
    filteredList = allStudents.filter(isHu);
  } else if (filterBy === "Ravenclaw") {
    filteredList = allStudents.filter(isRa);
  }

  displayList(filteredList);
}
function isSl(student) {
  return student.house === "Slytherin";
}
function isGr(student) {
  return student.house === "Gryffindor";
}
function isHu(student) {
  return student.house === "Hufflepuff";
}
function isRa(student) {
  return student.house === "Ravenclaw";
}
function displayList(students) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  students.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = student.firstname;
  clone.querySelector("[data-field=desc]").textContent = student.lastname;
  clone.querySelector("[data-field=type]").textContent = student.middlename;
  clone.querySelector("[data-field=nickname]").textContent = student.nickname;
  clone.querySelector("[data-field=house]").textContent = student.house;
  if (student.lastname.includes("-")) {
    clone.querySelector("[data-field=image] img").src = `images/${student.lastname.substring(student.lastname.indexOf("-") + 1)}_${student.firstname[0]}.png`;
  } else if (student.lastname.includes("Patil")) {
    clone.querySelector("[data-field=image] img").src = `images/${student.lastname}_${student.firstname}.png`;
  } else {
    clone.querySelector("[data-field=image] img").src = `images/${student.lastname.toLowerCase()}_${student.firstname[0].toLowerCase()}.png`;
  }

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
