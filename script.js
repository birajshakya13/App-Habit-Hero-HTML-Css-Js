
document.addEventListener("DOMContentLoaded", () => {
  //For prompt Creation
  let createPrompt = () => {
    let body = document.querySelector("main");
    let myDiv = document.createElement("form");
    myDiv.innerHTML = `
    <div class="promptBox">
    <nav>
    <label for="userName">Enter Your Full Name:</label>
    </nav>
    <main>
    <input type="text" pattern="[A-Za-z ]+" id="fullName" name="fullName" required>
    <button type="submit"><i class="fas fa-check"></i></button>
    </main>
    </div>`;
    myDiv.classList.add("prompt-container");
    myDiv.addEventListener("submit", (e) => {
      let fullName = document.querySelector("#fullName").value.toUpperCase();
      localStorage.setItem("user", fullName)
      location.reload();
      myDiv.remove();
    })
    body.appendChild(myDiv);
  }
  //for username
  let userName = document.querySelector("#userName");
  let savedUser = localStorage.getItem("user");

  if (savedUser == null) {
    createPrompt();
  } else {
    userName.innerHTML = savedUser;
  }

  //for date
  let showDate = document.querySelector("#date");
  let today = new Date();
  let options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  let formattedDate = today.toLocaleDateString("en-NP", options);

  showDate.innerHTML = formattedDate;

  //For Reset Button
  let createResetBtn = () => {
    let body = document.querySelector("body");
    let btn = document.createElement("button");
    btn.innerHTML = "<i class='fas fa-times'></i>";
    btn.classList.add("resetBtn");
    btn.addEventListener("click", resetAll)
    body.appendChild(btn);
  }
  createResetBtn();
  
  //For add Habit Button
  let createAddHabitBtn = () => {
    let body = document.querySelector("body");
    let btn = document.createElement("button");
    btn.innerHTML = "<i class='fas fa-plus'></i>";
    btn.classList.add("addHabitBtn");
    body.appendChild(btn);
  }
  createAddHabitBtn();
  
  //checking habit
  let boxes = document.querySelectorAll(".habit-container");
  boxes.forEach(box => {
    if(localStorage.getItem(box.id) === "true"){
    let btn = box.querySelector(".habit-btn");
    box.style.backgroundColor = "var(--themeColor4)";
    btn.innerHTML = "Finished";
    btn.style.backgroundColor = "var(--btnColor2)";
    count++;
    console.log(count);
    showProgress();
  }else{
    console.log("not good")
  }
  })
  
})
let count = 0;
function workDone (btn) {
  let box = btn.parentElement;
  if (btn.innerHTML === "Complete") {
    box.style.backgroundColor = "var(--themeColor4)";
    btn.innerHTML = "Finished";
    btn.style.backgroundColor = "var(--btnColor2)";
    localStorage.setItem(box.id, "true");
    count++;
    console.log(count);
    showProgress();
  } else {
    box.style.backgroundColor = "orange";
    btn.innerHTML = "Complete";
    btn.style.backgroundColor = "var(--btnColor)";
    localStorage.removeItem(box.id);
    count--;
    console.log(count);
    showProgress();
  }
}

function resetAll () {
  let btns = document.querySelectorAll(".habit-btn");
  btns.forEach(btn => {
    let box = btn.parentElement;
    box.style.backgroundColor = "orange";
    btn.innerHTML = "Complete";
    btn.style.backgroundColor = "var(--btnColor)";
    localStorage.removeItem(box.id);
  })
    count = 0;
    console.log(count);
    showProgress();
}

function showProgress () {
  let boxes = document.querySelectorAll('.habit-container');
  let bar = document.querySelector(".progress");
  bar.style.width = `calc(${count} * 100% / ${boxes.length}`;
}

function addHabit () {
  
}