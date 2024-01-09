const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button")
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg =  document.querySelector(".msg");

for(let select of dropdown){
    for (code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && code === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

const updatechangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval=== "" || amtval <1){
        amtval =1;
        amount.value = "1";
    }
    const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    const response = await fetch(url);
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    let finalamt = Math.floor(amtval * rate);
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value} `;
}

window.addEventListener("load", ()=>{
    updatechangeRate();
})

button.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updatechangeRate(); 
}) 
