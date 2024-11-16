let URL =
  "https://v6.exchangerate-api.com/v6/5867074a0c9762fc0c4a8199/latest/USD";
let inputValue = document.querySelector("#amount");
let selection1 = document.querySelector("#select1");
let selection2 = document.querySelector("#select2");
let button = document.querySelector("button");
let inputValueDisplay = document.querySelector(".displayCurrency span");
let leftSelectDisplay = inputValueDisplay.nextElementSibling;
let FinalValueDisplay = leftSelectDisplay.nextElementSibling;
let rightSelectDisplay = FinalValueDisplay.nextElementSibling;

let AllData = {
  InputData: 1,
  leftData: "USD",
  rightCalData: 84.4553,
  rightData: "INR",
};
inputValue.addEventListener("input", (e) => {
  AllData.InputData = Number(e.target.value);
});

function OptionCreating(Data) {
  for (const key in Data) {
    let OptionCreated = document.createElement("option");
    OptionCreated.value = key;
    OptionCreated.innerText = key;
    OptionCreated.id = Data[key];
    let copyed = OptionCreated.cloneNode(true);
    selection1.appendChild(OptionCreated);
    selection2.appendChild(copyed);
  }
}

const fetchingData = async () => {
  try {
    let Data = await fetch(URL);
    if (!Data.ok) {
      throw new Error("404");
    }
    let JsonData = await Data.json();
    OptionCreating(JsonData.conversion_rates);
    selection2.children[64].defaultSelected = true;
  } catch (err) {
    console.log(err);
    inputValueDisplay.innerHTML = `Can't fetch the data ${err}`;
    inputValueDisplay.style.color = " rgb(127, 1, 1)";
    inputValueDisplay.style.textShadow = " #ff0a0a 0px 0px 8px";
  }
};
fetchingData();

selection1.addEventListener("change", (e) => {
  AllData.leftData = e.target.value;
});

selection2.addEventListener("change", (e) => {
  AllData.rightData = e.target.value;
  AllData.rightCalData = e.target.options[e.target.selectedIndex].id;
});

button.addEventListener("click", async (e) => {
  e.preventDefault();
  inputValueDisplay.innerText = AllData.InputData;
  leftSelectDisplay.innerHTML = AllData.leftData + " = ";
  rightSelectDisplay.innerHTML = AllData.rightData;
  let CalculatedData = AllData.InputData * AllData.rightCalData;
  FinalValueDisplay.innerHTML = CalculatedData.toFixed(2);
  console.log(AllData.rightCalData);

  inputValueDisplay.parentElement.classList.add("AllColor-JS");
});
