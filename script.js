const header = document.getElementsByTagName("header");
const sumDisplay = document.getElementById("sum");
const container = document.getElementById("container");
var sum = 0;

function resizeContainer() {
    container.style.height = `calc(100vh - ${header.offsetHeight + 10}px)`;
}

window.onresize = resizeContainer;
window.onload = resizeContainer;

chips = JSON.parse(localStorage.getItem("chips") || "[]");

if (chips == "") {
    defaultChips();
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
    displayValues();
    document.location.reload(true)
}

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