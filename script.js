const header = document.querySelector("header");
const sumDisplay = document.getElementById("sum");
const container = document.getElementById("container");
const btnSize = 2;
const plsBtnSVG = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" pId="10297" height="${btnSize}rem" width="${btnSize}rem" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" pId="10298"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" pId="10299"></path></svg>`
const minBtnSVG = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="${btnSize}rem" width="${btnSize}rem" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>`
var sum = 0;

chips = JSON.parse(localStorage.getItem("chips") || "[]");

if (chips == "") {
    defaultChips();
}

function defaultChips() {
    chips = [
        {
            color: "white",
            text: "black",
            value: 1,
            count: 20
        },
        {
            color: "red",
            text: "white",
            value: 2,
            count: 15
        },
        {
            color: "green",
            text: "white",
            value: 5,
            count: 10
        },
        {
            color: "blue",
            text: "white",
            value: 10,
            count: 10
        },
        {
            color: "black",
            text: "white",
            value: 50,
            count: 5
        }
    ];
    generateHTML();
    displayValues();
    document.location.reload(true)
}

generateHTML();
function generateHTML() {
    chips.forEach(chip => {
        container.innerHTML += `
        <div class="chip" id="chip_${chip.color}">
                <div class="chip-image">
                    <img src="images/chip_${chip.color}.svg" id="chip_image_${chip.color}">
                    <p class="chip-value" id="chip-value_${chip.color}"></p>
                </div>
                <div class="chip-counter">
                    <button id="plus-btn_${chip.color}">
                        ${plsBtnSVG}
                    </button>
                    <h2 id="count_${chip.color}"></h2>
                    <button id="minus-btn_${chip.color}">
                        ${minBtnSVG}
                    </button>
                </div>
            </div>`
    });
}

displayValues();
function displayValues() {
    sum = 0;
    chips.forEach(chip => {
        const valueDisplay = document.getElementById(`chip-value_${chip.color}`);
        valueDisplay.style.color = chip.text;
        valueDisplay.innerText = `${chip.value}$`
        const countDisplay = document.getElementById(`count_${chip.color}`);
        countDisplay.innerText = chip.count;
        sum += chip.count*chip.value;
    });
    localStorage.setItem("chips", JSON.stringify(chips));
    sumDisplay.innerText = `${sum}$`;
}

chips.forEach(chip => {
    const plsBtn = document.getElementById(`plus-btn_${chip.color}`);
    plsBtn.addEventListener("click", function(){
        chip.count++;
        displayValues();
    });
    const minBtn = document.getElementById(`minus-btn_${chip.color}`);
    minBtn.addEventListener("click", function(){
        if (chip.count > 0) {
            chip.count--;
        };
        displayValues();
    });
});

function deleteChips() {
    chips.forEach(chip => {
        chip.count = 0;
    });
    displayValues();
    document.location.reload(true)
}

function defaultChipsPrompt() {
    document.querySelector(".reset-accept").style.display = "block";
}

function deleteChipsPrompt() {
    document.querySelector(".trash-accept").style.display = "block";
}

function cancel() {
    document.querySelector(".trash-accept").style.display = "none";
    document.querySelector(".reset-accept").style.display = "none";
}

window.onresize = resizeContainer;
window.onload = resizeContainer;
resizeContainer()
function resizeContainer() {
    container.style.Height = `calc(100vh - ${header.offsetHeight}px)`;
}