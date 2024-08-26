const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn1");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropDowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "EUR") {
            newOption.selected = true;
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    if (amount.value === "" || amount.value < 1) {
        amount.value = "1";
    }
    const fromCurrency = fromCurr.value.toLowerCase();
    const toCurrency = toCurr.value.toLowerCase();
    const URL = `${BASE_URL}/${fromCurrency}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurrency][toCurrency];
    let finalAmount = amount.value * rate;
    msg.innerHTML = `${amount.value} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    await updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

