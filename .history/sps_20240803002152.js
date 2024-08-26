let userScore = 0;
let compScore = 0;
const choicesS = document.querySelectorAll(".choices");
choicesS.forEach((choice) => {
    choice.addEventListener("click" , () => {
        const choiceID = choice.getAttribute("id")
        console.log("choice was clicked",choiceID);
    })
})