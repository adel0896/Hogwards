"use strict";

window.addEventListener("DOMContentLoaded", start);

const allStudents = [];
const settings = {
  filter: "Allhouses",
  sortBy: "firstname",
  sortDir: "asc",
};
const meStudent = {
  firstname: "Adelina",
  lastname: "Radulescu",
  middlename: "Stefania",
  nickname: "Ade",
  image: "image/radulescu_a.png",
  house: "Gryffindor",
  status: false,
  blood: "pure",
  prefect: false,
  squad: false,
  gender: "girl",
};
function start() {
  console.log("ready");
  registerButtons();
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
      gender: "",
    };
    const student = Object.create(Student);
    console.log(student);
    console.log(Student);
    let fullname = elem.fullname.trim();
    let house = elem.house.trim();
    let pureblood = elem.pure;
    let gender = elem.gender;
    console.log(pureblood);
    console.log(fullname);
    //The first name
    let firstname = (student.firstname = fullname.substring(fullname.lastIndexOf(), fullname.indexOf(" ")));
    console.log(fullname.indexOf(" "));
    if (fullname.indexOf(" ") >= 0) {
      console.log(fullname.indexOf(firstname));
      student.firstname = student.firstname.substring(0, 1).toUpperCase() + student.firstname.substring(1).toLowerCase();
      console.log(firstname);
    } else {
      console.log("not 0");

      firstname = student.firstname = fullname.substring(fullname.indexOf(" ") + 1);
      console.log(firstname);
    }

    //The last name
    let lastname = (student.lastname = fullname.substring(fullname.lastIndexOf(" ") + 1));

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
    //The gender
    student.gender = gender;
    student.gender = student.gender.substring(0, 1).toUpperCase() + student.gender.substring(1).toLowerCase();

    console.log(student.gender);

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
  } else if (settings.filter === "half") {
    filteredList = allStudents.filter(isHalf);
  } else if (settings.filter === "pure") {
    filteredList = allStudents.filter(isPure);
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
function isHalf(student) {
  return student.blood === "half";
}
function isPure(student) {
  return student.blood === "pure";
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

  clone.querySelector("[data-field=name]").textContent = student.firstname;
  clone.querySelector("[data-field=desc]").textContent = student.lastname;
  clone.querySelector("[data-field=type]").textContent = student.middlename;
  clone.querySelector("[data-field=nickname]").textContent = student.nickname;
  // clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelectorAll("[data-field=image]").forEach((card) => card.addEventListener("click", selectStudent));
  clone.querySelector("[data-field=status]").dataset.status = student.status;
  clone.querySelector("[data-field=status]").addEventListener("click", expellStudents);

  //expelling
  function expellStudents() {
    let expelbtn = document.querySelector("[data-field=status]");
    if (student.status === true) {
      expelbtn.textContent = "unexpell";
    } else {
      expelbtn.textContent = "expell";
    }
    if (student.status === true) {
      student.status = false;
    } else if (student.firstname === "Adelina") {
      document.getElementById("hackwarning").classList.remove("hidden");
      document.querySelector(".closebuttonhack").addEventListener("click", closePop);
      function closePop() {
        console.log("closepop works");
        document.querySelector("#hackwarning").classList.add("hidden");
      }
    } else {
      student.status = true;
    }

    builtList();
  }

  if (student.house === "Slytherin") {
    clone.querySelector("[data-field=studentcard]").style.border = "solid #0d6217";
  } else if (student.house === "Gryffindor") {
    clone.querySelector("[data-field=studentcard]").style.border = "solid #7f0909";
  } else if (student.house === "Hufflepuff") {
    clone.querySelector("[data-field=studentcard]").style.border = "solid rgb(209, 179, 9)";
  } else if (student.house === "Ravenclaw") {
    clone.querySelector("[data-field=studentcard]").style.border = "solid #000a90";
  }
  //images-----

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
    //Giving the modal different background colors and house images
    const modal = document.querySelector(".box");
    if (student.house === "Slytherin") {
      document.querySelectorAll(".data [data-field]").forEach((element) => (element.style.color = "rgb(209, 179, 9)"));
      document.querySelector(".close").style.color = "rgb(209, 179, 9)";
      document.querySelectorAll(".statuses span, .statuses [data-field]").forEach((element) => (element.style.color = "rgb(209, 179, 9)"));

      modal.style.background = " #0d6217";
    } else if (student.house === "Gryffindor") {
      modal.style.background = " #7f0909";
      document.querySelectorAll(".statuses span, .statuses [data-field]").forEach((element) => (element.style.color = "rgb(209, 179, 9)"));

      document.querySelectorAll(".data [data-field]").forEach((element) => (element.style.color = "rgb(209, 179, 9)"));
      document.querySelector(".close").style.color = "rgb(209, 179, 9)";
    } else if (student.house === "Hufflepuff") {
      modal.style.background = " rgb(209, 179, 9)";
      document.querySelectorAll(".data [data-field]").forEach((element) => (element.style.color = "#7f0909"));
      document.querySelectorAll(".statuses span, .statuses [data-field]").forEach((element) => (element.style.color = "#7f0909"));

      document.querySelector(".close").style.color = "#7f0909";
    } else if (student.house === "Ravenclaw") {
      modal.style.background = "#0c005a";
      document.querySelectorAll(".statuses span, .statuses [data-field]").forEach((element) => (element.style.color = "rgb(209, 179, 9)"));

      document.querySelector(".close").style.color = "rgb(209, 179, 9)";

      document.querySelectorAll(".data [data-field]").forEach((element) => (element.style.color = "rgb(209, 179, 9)"));
    }
    modal.classList.remove("hide");
    //modal information
    modal.querySelector("[data-field=imagepop]").src = `images/${student.lastname.substring(student.lastname.indexOf("-") + 1).toLowerCase()}_${student.firstname[0].toLowerCase()}.png`;
    modal.querySelector("[data-field=imagehousepop]").src = `images/${student.house.toLowerCase()}.png`;

    modal.querySelector("[data-field=namepop]").textContent = "First name: " + student.firstname;
    modal.querySelector("[data-field=lastnamepop]").textContent = "Last name: " + student.lastname;

    modal.querySelector("[data-field=nicknamepop]").textContent = "Nickname: " + student.nickname;
    modal.querySelector("[data-field=housepop]").textContent = "House: " + student.house;
    modal.querySelector("[data-field=gender]").textContent = "Gender: " + student.gender;

    modal.querySelector(".close").addEventListener("click", closepop);
    //the status check on the modal
    let expelstatus = document.querySelector(".checkexp");
    let inqstatus = document.querySelector(".checkinq");
    let prefectstatus = document.querySelector(".checkpre");
    if (student.status === true) {
      expelstatus.textContent = "✔";
    } else if (student.status === false) {
      expelstatus.textContent = "X";
    }
    if (student.squad === true) {
      inqstatus.textContent = "✔";
    } else if (student.squad === false) {
      inqstatus.textContent = "X";
    }
    if (student.prefect === true) {
      prefectstatus.textContent = "✔";
    } else if (student.prefect === false) {
      prefectstatus.textContent = "X";
    }
    function closepop() {
      modal.classList.add("hide");
    }
    //for bloodtype
    let bloodstatus = document.querySelector("[data-field=bloodtype]");
    if (student.blood === "half") {
      bloodstatus.textContent = "Blood-status: Half";
    } else if (student.blood === "pure") {
      bloodstatus.textContent = "Blood-status: Pure";
    } else {
      bloodstatus.textContent = "Blood-status: muggle";
    }
  }
  //the prefects (and squads)

  clone.querySelector("[data-field=prefect]").dataset.prefect = student.prefect;
  clone.querySelector("[data-field=prefect]").addEventListener("click", clickPrefect);
  function clickPrefect() {
    if (student.prefect === true) {
      student.prefect = false;
    } else {
      tryToMakeAPrefect(student);
    }
    builtList();
  }
  //////-----------squad
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
//----prefects
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
//--------------hacking
let clicked = true;
console.log(clicked);
document.querySelector(".hack").addEventListener("click", hackit);
function hackit() {
  // console.log(student);
  allStudents.forEach(randomBloodStatus);
  allStudents.push(meStudent);
  builtList();
  if (clicked === true) {
    clicked = false;
    document.querySelector(".hack").removeEventListener("click", hackit);

    console.log(clicked);
  }
}
function randomBloodStatus(student) {
  console.log(student);
  if (student.blood === "pure") {
    const types = ["Muggle-blood", "half"];
    const randomNumber = Math.floor(Math.random() * 2);
    student.blood = types[randomNumber];
    console.log(student.blood);
  } else if (student.blood === "half") {
    student.blood = "Pure-blood";
    console.log(student.blood);
  }
}
