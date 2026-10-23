// EDIT THESE ARRAYS to customize the interactive Problems & Solutions activity.
const problems = [
  { id: "p1", title: "[Problem placeholder 1]", solutionId: "s2" },
  { id: "p2", title: "[Problem placeholder 2]", solutionId: "s1" },
  { id: "p3", title: "[Problem placeholder 3]", solutionId: "s3" }
];

const solutions = [
  { id: "s1", title: "[Solution placeholder 1]" },
  { id: "s2", title: "[Solution placeholder 2]" },
  { id: "s3", title: "[Solution placeholder 3]" }
];

const problemList = document.getElementById("problemList");
const solutionList = document.getElementById("solutionList");
const feedback = document.getElementById("matchFeedback");

function renderMatchingActivity() {
  problemList.innerHTML = "";
  problems.forEach((problem) => {
    const row = document.createElement("div");
    row.className = "match-row";
    row.dataset.problemId = problem.id;

    const label = document.createElement("label");
    label.className = "match-problem";
    label.htmlFor = `select-${problem.id}`;
    label.textContent = problem.title;

    const select = document.createElement("select");
    select.id = `select-${problem.id}`;
    select.setAttribute("aria-label", `Choose a solution for ${problem.title}`);

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "[Choose a solution]";
    select.appendChild(defaultOption);

    solutions.forEach((solution) => {
      const option = document.createElement("option");
      option.value = solution.id;
      option.textContent = solution.title;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      row.classList.remove("correct", "incorrect");
      feedback.textContent = "[Click “Check connections” to see your results.]";
    });

    row.append(label, select);
    problemList.appendChild(row);
  });

  solutionList.innerHTML = "";
  solutions.forEach((solution, index) => {
    const item = document.createElement("div");
    item.className = "match-row";
    item.style.gridTemplateColumns = "1fr";
    item.textContent = `${String(index + 1).padStart(2, "0")}  ${solution.title}`;
    solutionList.appendChild(item);
  });
}

document.getElementById("checkMatches").addEventListener("click", () => {
  let correct = 0;
  let answered = 0;

  problems.forEach((problem) => {
    const row = problemList.querySelector(`[data-problem-id="${problem.id}"]`);
    const select = row.querySelector("select");
    row.classList.remove("correct", "incorrect");

    if (select.value) answered++;
    if (select.value && select.value === problem.solutionId) {
      correct++;
      row.classList.add("correct");
    } else {
      row.classList.add("incorrect");
    }
  });

  if (answered < problems.length) {
    feedback.textContent = `You have answered ${answered} of ${problems.length}. Finish the remaining matches and check again.`;
  } else if (correct === problems.length) {
    feedback.textContent = `Excellent! All ${correct} connections are correct.`;
  } else {
    feedback.textContent = `${correct} of ${problems.length} connections are correct. Try again!`;
  }
});

document.getElementById("resetMatches").addEventListener("click", () => {
  renderMatchingActivity();
  feedback.textContent = "[Select a solution for each problem.]";
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

renderMatchingActivity();
