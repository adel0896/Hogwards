"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];

function start() {
  console.log("ready");

  loadJSON();
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
      student.image = student.lastname.toLowerCase() + `_${student.firstname.substring(0, 1).toLowerCase()}` + `.png`;
    }

    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayAnimal);
}

function displayAnimal(student) {
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
    clone.querySelector("[data-field=image] img").src = `images/${student.lastname}_${student.firstname[0]}.png`;
  }

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
