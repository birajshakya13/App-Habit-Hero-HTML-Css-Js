
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
      e.preventDefault();
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
    btn.addEventListener("click", () => {
      let box = document.querySelector(".newHabitPrompt-container");
      box.style.display = "flex";
    });
    body.appendChild(btn);
  }
  createAddHabitBtn();

  //checking habits

  function initiateHabit() {
    let container = document.querySelector("#habitContainer");
    for(let i = 0;i < localStorage.length; i++) {
      let key = localStorage.key(i);

      if (key.includes("habit")) {
        let data = JSON.parse(localStorage.getItem(key));
        let habitName = data.keyName;
        let habitNote = data.keyNote;
        let habitIcon = data.keyIcon;
        let div = document.createElement("div");
        div.classList.add("habit-container");
        div.id = `habit${i}`;
        div.innerHTML = `
        <p class="habit-header">${habitName}</p>
        <p class="habit-note">${habitNote}</p>
        <button class="habit-btn" onclick="workDone(this)">Complete</button>
        <icon class="habit-icon"><i class="fas fa-${habitIcon}"></i></icon>
        `;
        container.appendChild(div);
      }
    }
  }
  initiateHabit();

  //checking habit
  let boxes = document.querySelectorAll(".habit-container");
  boxes.forEach(box => {
    let data = JSON.parse(localStorage.getItem(box.id));
    if (data === "true") {
      let btn = box.querySelector(".habit-btn");
      box.style.backgroundColor = "var(--themeColor4)";
      btn.innerHTML = "Finished";
      btn.style.backgroundColor = "var(--btnColor2)";
      count++;
      console.log(count);
      showProgress();
    } else {
      console.log("not good")
    }
  })
  // Creating add Habit Form
  let habitform = () => {
    let body = document.querySelector("main");
    let form = document.createElement("form");
    form.classList.add("newHabitPrompt-container");
    form.id = "newHabitPrompt";
    form.innerHTML =
      `<div class="newHabitPrompt">
        <div class="newHabit-title">
          <h3>Add New Habit</h3>
        </div>
        <div class="newHabit-close">
          <button onclick="closeHabitForm()"><i class="fas fa-xmark"></i></button>
        </div>
        <div class="newHabit">
          <div>
            <input type="text" id="newHabit-name" class="habit" placeholder=" " required>
            <label for="newHabit">Habit Name</label>
          </div>
        </div>
        <div class="newHabit">
          <div>
            <input type="text" id="newHabit-note" class="habit" placeholder=" " required>
            <label for="habitNote">Habit Note</label>
          </div>
        </div>
        <div class="newHabit-icon">
          <label>
            <input type="radio" name="habit-icon" value="droplet">
            <div class="newHabit-img">
              <i class="fas fa-droplet"></i>
            </div>
          </label>
          <label>
            <input type="radio" name="habit-icon" value="book-open" >
            <div class="newHabit-img">
              <i class="fas fa-book-open"></i>
            </div>
          </label>
          <label>
            <input type="radio" name="habit-icon" value="dumbbell" >
            <div class="newHabit-img">
              <i class="fas fa-dumbbell"></i>
            </div>
          </label>
          <label>
            <input type="radio" name="habit-icon" value="ellipsis" checked>
            <div class="newHabit-img">
              <i class="fas fa-ellipsis"></i>
            </div>
          </label>
        </div>
        <div class="newHabit-btn">
          <input type="submit" class="habit-btn">
          <input type="reset" class="habit-btn">
        </div>
      </div>`;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      addHabit();
    })
    body.appendChild(form);
  }
  habitform();
})

let count = 0;
function workDone(btn) {
  let box = btn.parentElement;
  let habit = JSON.parse(localStorage.getItem(box.id));
  if (habit === "false") {
    box.style.backgroundColor = "var(--themeColor4)";
    btn.innerHTML = "Finished";
    btn.style.backgroundColor = "var(--btnColor2)";
    habit.keyStatus = "true";
    localStorage.setItem(box.id, JSON.stringify(habit));
    count++;
    console.log(count);
    showProgress();
  } else {
    box.style.backgroundColor = "orange";
    btn.innerHTML = "Complete";
    btn.style.backgroundColor = "var(--btnColor)";
    habit.keyStatus = "false";
    localStorage.setItem(box.id, JSON.stringify(habit));
    count--;
    console.log(count);
    showProgress();
  }
}

function resetAll() {
  let btns = document.querySelectorAll(".habit-btn");
  btns.forEach(btn => {
    let box = btn.parentElement;
    let habit = JSON.parse(localStorage.getItem(box.id)).keyStatus;
    box.style.backgroundColor = "orange";
    btn.innerHTML = "Complete";
    btn.style.backgroundColor = "var(--btnColor)";
    habit.keyStatus = "false";
    localStorage.setItem(box.id, JSON.stringify(habit));
  })
  count = 0;
  showProgress();
}

function showProgress() {
  let boxes = document.querySelectorAll('.habit-container');
  let bar = document.querySelector(".progress");
  if (boxes.length >= 1) {
    bar.style.width = `calc(${count} * 100% / ${boxes.length}`;
    bar.style.visibility = "visible";
  } else {
    bar.style.visibility = "hidden";
  }
}

function closeHabitForm() {
  let box = document.querySelector(".newHabitPrompt-container");
  box.style.display = "none";
}

function habitFromReset() {
  let habitName = document.querySelector("#newHabit-name");
  let habitNote = document.querySelector("#newHabit-note");
  habitName.value = "";
  habitNote.value = "";
}

function addHabit() {
  let container = document.querySelector("#habitContainer");
  let boxes = Array.from(container.children);
  let habitName = document.querySelector("#newHabit-name").value;
  let habitNote = document.querySelector("#newHabit-note").value;
  let habitIcon = document.querySelector("input[name='habit-icon']:checked").value;
  let div = document.createElement("div");
  div.classList.add("habit-container");
  div.id = `habit${boxes.length}`;
  div.innerHTML = `
  <p class="habit-header">${habitName}</p>
  <p class="habit-note">${habitNote}</p>
  <button class="habit-btn" onclick="workDone(this)">Complete</button>
  <icon class="habit-icon"><i class="fas fa-${habitIcon}"></i></icon>
  `;
  container.appendChild(div);
  let data = {
    keyStatus: "false",
    keyName: habitName,
    keyNote: habitNote,
    keyIcon: habitIcon
  };
  let key = `habit${boxes.length}`;
  localStorage.setItem(key, JSON.stringify(data));
  closeHabitForm();
  habitFromReset()
}