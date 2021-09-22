"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
const settings = {
  filter: "Allhouses",
  sortBy: "firstname",
  sortDir: "asc",
};

function start() {
  console.log("ready");
  registerButtons();
  // registerCards();
  loadJSON();
}
function registerButtons() {
  document.querySelectorAll("[data-action=filter]").forEach((button) => button.addEventListener("click", selectFilter));
  document.querySelectorAll("[data-action=sort]").forEach((button) => button.addEventListener("click", selectSort));
  document.querySelector(".searchbar").addEventListener("input", searchBar);
}
function searchBar(e) {
  const searchString = e.target.value.toLowerCase();
  const searchedStudents = allStudents.filter((student) => {
    return student.firstname.toLowerCase().includes(searchString) || student.lastname.toLowerCase().includes(searchString) || student.house.toLowerCase().includes(searchString);
  });
  displayList(searchedStudents);
}

function loadJSON() {
  Promise.all([fetch("https://petlatkea.dk/2021/hogwarts/students.json").then((resp) => resp.json()), fetch("https://petlatkea.dk/2021/hogwarts/families.json").then((resp) => resp.json())]).then((jsonData) => {
    prepareObjects(jsonData[0], jsonData[1]);
    console.log(jsonData[1]);
  });
  // fetch("https://petlatkea.dk/2021/hogwarts/students.json")
  //   .then((response) => response.json())
  //   .then((jsonData) => {
  //     // when loaded, prepare objects
  //     prepareObjects(jsonData);
  //   });
}

function prepareObjects(jsonData1, jsonData2) {
  console.log(jsonData1);
  console.log(jsonData2);

  jsonData1.forEach((elem) => {
    console.log(elem);
    // TODO: Create new object with cleaned data - and store that in the allAnimals array
    const Student = {
      firstname: "",
      lastname: "",
      middlename: "",
      nickname: "",
      image: "",
      house: "",
      status: false,
      blood: "half",
      prefect: false,
      squad: false,
    };
    const student = Object.create(Student);

    console.log(student);
    console.log(Student);
    let fullname = elem.fullname.trim();
    let house = elem.house.trim();
    let pureblood = elem.pure;
    console.log(pureblood);
    // let halfblood = elem.half;
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

    const array = Object.values(jsonData2);
    for (let i = 0; i < 2; i++) {
      if (array[i].includes(lastname)) {
        if (i == 1) {
          student.blood = "pure";
        }
      }
      // console.log(student.blood);
      //
    }
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

  builtList();
  console.log(allStudents);
}
///----filtering
function selectFilter(event) {
  console.log(event);
  //find old sortBy element and remove sortBy
  const oldElement = document.querySelector(`[data-filter='${settings.filter}']`);
  oldElement.classList.remove("filterBy");
  //indicate active sort
  event.target.classList.add("filterBy");
  // button.filter.style.border = "solid white";
  const filter = event.target.dataset.filter;

  console.log(`user selected ${filter}`);
  setFilter(filter);
}
function setFilter(filter) {
  settings.filter = filter;
  builtList();
}
function filterList(filteredList) {
  // let filteredList = allStudents;
  if (settings.filter === "Slytherin") {
    filteredList = allStudents.filter(isSl);
  } else if (settings.filter === "Gryffindor") {
    filteredList = allStudents.filter(isGr);
  } else if (settings.filter === "Hufflepuff") {
    filteredList = allStudents.filter(isHu);
  } else if (settings.filter === "Ravenclaw") {
    filteredList = allStudents.filter(isRa);
  } else if (settings.filter === "expelled") {
    filteredList = allStudents.filter(isExpelled);
  } else if (settings.filter === "unexpelled") {
    filteredList = allStudents.filter(isUnExpelled);
  }

  return filteredList;
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
function isExpelled(student) {
  return student.status === true;
}
function isUnExpelled(student) {
  return student.status === false;
}
////----sorting
function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  const sortDir = event.target.dataset.sortDirection;
  console.log(settings.sortBy);
  //find old sortBy element and remove sortBy
  const oldElement = document.querySelector(`[data-sort='${settings.sortBy}']`);
  oldElement.classList.remove("sortBy");
  //indicate active sort
  event.target.classList.add("sortBy");
  //toggle the direction
  if (sortDir === "asc") {
    event.target.dataset.sortDirection = "desc";
  } else {
    event.target.dataset.sortDirection = "asc";
  }
  console.log(`user selected ${sortBy} - ${sortDir}`);
  setSort(sortBy, sortDir);
}
function setSort(sortBy, sortDir) {
  settings.sortBy = sortBy;
  settings.sortDir = sortDir;
  builtList();
}
function sortList(sortedlist) {
  // let sortedlist = allStudents;

  let direction = 1;
  if (settings.sortDir === "desc") {
    direction = -1;
  } else {
    direction = 1;
  }
  sortedlist = sortedlist.sort(sortByPropriety);
  function sortByPropriety(studentA, studentB) {
    // console.log(`sortBy is ${settings.sortBy}`);
    if (studentA[settings.sortBy] < studentB[settings.sortBy]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }
  return sortedlist;
}
function builtList() {
  const currentList = filterList(allStudents);
  const sortedlist = sortList(currentList);
  displayList(sortedlist);
}
function displayList(students) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  students.forEach(displayStudent);
  // console.log(students.length);
  document.querySelector(".nrstudents").textContent = students.length;
  //putting borders
}

function displayStudent(student) {
  // create clone
  const clone = document.querySelector("template#student").content.cloneNode(true);

  // set clone data
  // clone.querySelector("[data-name=nothing]").textContent = student.firstname;

  clone.querySelector("[data-field=name]").textContent = student.firstname;
  clone.querySelector("[data-field=desc]").textContent = student.lastname;
  clone.querySelector("[data-field=type]").textContent = student.middlename;
  clone.querySelector("[data-field=nickname]").textContent = student.nickname;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelectorAll("[data-field=image]").forEach((card) => card.addEventListener("click", selectStudent));
  clone.querySelector("[data-field=status]").dataset.status = student.status;
  clone.querySelector("[data-field=status]").addEventListener("click", expellStudents);
  function expellStudents() {
    if (student.status === true) {
      student.status = false;
    } else {
      student.status = true;
    }
    builtList();
  }

  if (student.house === "Slytherin") {
    clone.querySelector("tr").style.border = "solid #0d6217";
  } else if (student.house === "Gryffindor") {
    clone.querySelector("tr").style.border = "solid #7f0909";
  } else if (student.house === "Hufflepuff") {
    clone.querySelector("tr").style.border = "solid rgb(209, 179, 9)";
  } else if (student.house === "Ravenclaw") {
    clone.querySelector("tr").style.border = "solid #000a90";
  }
  //images-----
  clone.querySelector("[data-field=imagehouse] img").src = `images/${student.house.toLowerCase()}.png`;

  if (student.lastname.includes("-")) {
    clone.querySelector("[data-field=image] img").src = `images/${student.lastname.substring(student.lastname.indexOf("-") + 1).toLowerCase()}_${student.firstname[0].toLowerCase()}.png`;
  } else if (student.lastname.includes("Patil")) {
    clone.querySelector("[data-field=image] img").src = `images/${student.lastname.toLowerCase()}_${student.firstname.toLowerCase()}.png`;
  } else {
    clone.querySelector("[data-field=image] img").src = `images/${student.lastname.toLowerCase()}_${student.firstname[0].toLowerCase()}.png`;
  }
  ////making the pop up
  function selectStudent(event) {
    console.log(event);
    const modal = document.querySelector(".box");
    if (student.house === "Slytherin") {
      modal.style.background = " #0d6217";
    } else if (student.house === "Gryffindor") {
      modal.style.background = " #7f0909";
    } else if (student.house === "Hufflepuff") {
      modal.style.background = " rgb(209, 179, 9)";
    } else if (student.house === "Ravenclaw") {
      modal.style.background = "#000a90";
    }
    modal.classList.remove("hide");

    modal.querySelector("[data-field=imagepop]").src = `images/${student.lastname.substring(student.lastname.indexOf("-") + 1).toLowerCase()}_${student.firstname[0].toLowerCase()}.png`;
    modal.querySelector("[data-field=namepop]").textContent = student.firstname;
    modal.querySelector("[data-field=nicknamepop]").textContent = student.nickname;
    modal.querySelector("[data-field=housepop]").textContent = student.house;

    modal.querySelector(".close").addEventListener("click", closepop);
    function closepop() {
      modal.classList.add("hide");
      //remove event listeners here
    }
    //for bloodtype
    let bloodstatus = document.querySelector("[data-field=bloodtype]");
    if (student.blood === "half") {
      bloodstatus.textContent = "Half";
    } else if (student.blood === "pure") {
      bloodstatus.textContent = "Pure";
    }
  }
  //the prefects

  clone.querySelector("[data-field=prefect]").dataset.prefect = student.prefect;
  clone.querySelector("[data-field=prefect]").addEventListener("click", clickPrefect);
  function clickPrefect() {
    if (student.prefect === true) {
      student.prefect = false;
    } else {
      tryToMakeAPrefect(student);
      // student.prefect = true;
    }
    builtList();
  }
  //////squad
  clone.querySelector("[data-field=squad]").dataset.squad = student.squad;
  clone.querySelector("[data-field=squad]").addEventListener("click", makeSquadSlytherin);

  function makeSquadSlytherin() {
    console.log("make squad works");
    if (student.house === "Slytherin") {
      makeSquad(student);
    } else if (student.blood === "pure") {
      makeSquad(student);
    } else {
      cannotSquad();
    }
  }

  function makeSquad(student) {
    if (student.squad === true) {
      student.squad = false;
    } else {
      student.squad = true;
    }
    builtList();
  }
  function cannotSquad() {
    console.log("make pop up work");
    document.querySelector("#notAllowed").classList.remove("hidden");
    document.querySelector("#notAllowed .closebutton").addEventListener("click", closeDialog);

    function closeDialog() {
      document.querySelector("#notAllowed").classList.add("hidden");
      document.querySelector("#notAllowed .closebutton").removeEventListener("click", closeDialog);
    }
  }
  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
function tryToMakeAPrefect(selectedstudent) {
  const prefects = allStudents.filter((student) => student.prefect === true);
  const numberOfPrefects = prefects.length;
  const other = prefects.filter((student) => student.house === selectedstudent.house).shift();
  //if there is another of the same type
  if (other !== undefined) {
    console.log("there can be only one prefect of each house");
    removeOther(other);
  } else if (numberOfPrefects >= 2) {
    console.log("there can only be 2 prefects");
    removeAorB(prefects[0], prefects[1]);
  } else {
    makePrefect(selectedstudent);
  }
  // console.log(`there are ${numberOfPrefects} prefects`);
  // // console.log(`the other prefect of this type is ${other.firstname}`);
  // console.log(other);

  //just for testing
  // makePrefect(selectedstudent);
  function removeOther(other) {
    //ask user to ignore or remove the other
    document.querySelector("#remove_other").classList.remove("hidden");
    document.querySelector("#remove_other .closebutton").addEventListener("click", closeDialog);
    document.querySelector("#remove_other #removeother").addEventListener("click", clickRemoveOther);
    document.querySelector("#remove_other [data-field=otherprefect]").textContent = other.firstname;

    //if ignore---do nothing
    function closeDialog() {
      document.querySelector("#remove_other .closebutton").removeEventListener("click", closeDialog);
      document.querySelector("#remove_other").classList.add("hidden");
      document.querySelector("#remove_other #removeother").removeEventListener("click", clickRemoveOther);
    }
    //if remove other:
    function clickRemoveOther() {
      removePrefect(other);
      makePrefect(selectedstudent);
      builtList();
      closeDialog();
    }
  }
  function removeAorB(prefectA, prefectB) {
    //ask the user to ignore, or remove A or B
    document.querySelector("#remove_aorb").classList.remove("hidden");
    document.querySelector("#remove_aorb .closebutton").addEventListener("click", closeDialog);

    document.querySelector("#remove_aorb #removeA").addEventListener("click", clickRemoveA);
    document.querySelector("#remove_aorb #removeB").addEventListener("click", clickRemoveB);
    //show names on buttons
    document.querySelector("#remove_aorb [data-field=prefectA]").textContent = prefectA.firstname;
    document.querySelector("#remove_aorb [data-field=prefectB]").textContent = prefectB.firstname;

    //if ignore do nothing
    function closeDialog() {
      document.querySelector("#remove_aorb").classList.add("hidden");
      document.querySelector("#remove_aorb .closebutton").removeEventListener("click", closeDialog);

      document.querySelector("#remove_aorb #removeA").removeEventListener("click", clickRemoveA);
      document.querySelector("#remove_aorb #removeB").removeEventListener("click", clickRemoveB);
    }
    //if remove A
    function clickRemoveA() {
      removePrefect(prefectA);
      makePrefect(selectedstudent);
      builtList();
      closeDialog();
    }
    function clickRemoveB() {
      removePrefect(prefectB);
      makePrefect(selectedstudent);
      builtList();
      closeDialog();
    }
    //else if remove B
  }
  function removePrefect(prefectStudent) {
    prefectStudent.prefect = false;
  }
  function makePrefect(student) {
    student.prefect = true;
  }
}

//trying the pop up------does not do the event listener for some reason
// function registerCards() {
//   console.log("register cards works");
//   document.querySelectorAll("[data-field= studentcard]").forEach((card) => card.addEventListener("click", selectStudent));
//   // document.querySelector("[data-field= studentcard]").addEventListener("click", selectStudent);

//   // console.log(ca);
// }
// function selectStudent(event) {
//   console.log("select student works");
//   alert("it works");
//   const card = event.target.dataset.studentcard;
//   console.log(`user selected ${card}`);
// }
