const header = document.querySelector("header");
const sumDisplay = document.getElementById("sum");
const container = document.getElementById("container");
const settingsModal = document.getElementById("settings");
const settingsDisplay = document.getElementById("settings-display");
const btnSize = 2;
const plsBtnSVG = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1551322312294" viewBox="0 0 1024 1024" version="1.1" pId="10297" height="${btnSize}rem" width="${btnSize}rem" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z" pId="10298"></path><path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z" pId="10299"></path></svg>`
const minBtnSVG = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="${btnSize}rem" width="${btnSize}rem" xmlns="http://www.w3.org/2000/svg"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>`
const muteBtn = document.getElementById("mute");
const muteSVG = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path></svg>`
const unmuteSVG = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="3rem" width="3rem" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 8.02c0 1.09-.45 2.09-1.17 2.83l-.67-.67c.55-.56.89-1.31.89-2.16 0-.85-.34-1.61-.89-2.16l.67-.67A3.99 3.99 0 0 1 12 8.02zM7.72 2.28L4 6H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2l3.72 3.72c.47.47 1.28.14 1.28-.53V2.81c0-.67-.81-1-1.28-.53zm5.94.08l-.67.67a6.996 6.996 0 0 1 2.06 4.98c0 1.94-.78 3.7-2.06 4.98l.67.67A7.973 7.973 0 0 0 16 8c0-2.22-.89-4.22-2.34-5.66v.02zm-1.41 1.41l-.69.67a5.05 5.05 0 0 1 1.48 3.58c0 1.39-.56 2.66-1.48 3.56l.69.67A5.971 5.971 0 0 0 14 8.02c0-1.65-.67-3.16-1.75-4.25z"></path></svg>`
var sum = 0;
mute = localStorage.getItem('mute') || 0;

toggleMuteBtn();
function toggleMuteBtn() {
    if (mute == 0)  {
        muteBtn.innerHTML = unmuteSVG;
    } else if (mute == 1) {
        muteBtn.innerHTML = muteSVG;
    }
}

muteBtn.addEventListener("click", function() {
    if (mute == 0) {
        mute = 1;
    } else if (mute == 1) {
        mute = 0;
    }
    localStorage.setItem('mute', mute);
    toggleMuteBtn();
});

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
    document.querySelector(".reset-accept").style.display = "none";
    generateHTML();
    displayValues();
    document.location.reload(true);
}

generateHTML();
function generateHTML() {
    chips = chips.sort((a,b) => (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0));
    container.innerHTML = "";
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
        if (mute == 0) {
            new Audio('sound/chip.mp3').play();
        }
        chip.count++;
        displayValues();
    });
    const minBtn = document.getElementById(`minus-btn_${chip.color}`);
    minBtn.addEventListener("click", function(){
        if (chip.count > 0) {
            if (mute == 0) {
                new Audio('sound/chip.mp3').play();
            }
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
    document.querySelector(".trash-accept").style.display = "none";
    document.location.reload(true);
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

function openSettings() {
    settingsModal.style.display = "flex";
    settingsDisplay.innerHTML = "";
    chips.forEach(chip => {
        settingsDisplay.innerHTML += `
            <div class="settings_chip">
                <h3 style="color: ${chip.color};">${chip.color}:</h3>
                <div class="settings_input">
                    <label for="input_value_${chips.indexOf(chip)}">value:</label>
                    <input type="number" value="${chip.value}" name="input_value_${chips.indexOf(chip)}" id="input_value_${chips.indexOf(chip)}" min="1" max="500">
                    <label for="input_count_${chips.indexOf(chip)}">stack:</label>
                    <input type="number" value="${chip.count}" name="input_count_${chips.indexOf(chip)}" id="input_count_${chips.indexOf(chip)}" min="1" max="500">
                </div>
            </div>
        `
    });
}

function closeSettings() {
    settingsModal.style.display = "none";
    settingsDisplay.innerHTML = "";
}

function saveSettings() {
    chips.forEach(chip => {
        const inputValue = document.getElementById(`input_value_${chips.indexOf(chip)}`);
        const inputCount = document.getElementById(`input_count_${chips.indexOf(chip)}`);
        if (inputValue.value > 0 && inputCount.value > 0) {
            chip.value = parseInt(inputValue.value);
            chip.count = parseInt(inputCount.value);
        }
    });
    closeSettings();
    generateHTML();
    displayValues();
    document.location.reload(true);
}