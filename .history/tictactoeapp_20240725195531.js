let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newBtn = document.querySelector(".newGame");
let msgC = document.querySelector(".msg");

let turnO = true;
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgC.classList.add("hide");
    newBtn.classList.add("hide");
}
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        console.log("Box was clicked");
        if(turnO){
            box.innerText = "O";
            box.style.color = "black";
            turnO = false;
        }
        else{
            box.innerText = "X";
            box.style.color = "grey";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        
    });
});
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner,pattern) => {
    msgC.innerText = ` Congratulations 🎉 Winner is : ${winner}`;
    msgC.classList.remove("hide");
    newBtn.classList.remove("hide");
    if (pattern) {
        const [a, b, c] = pattern;
        let lineClass = '';

        if (a === 0 && b === 1 && c === 2) lineClass = 'horizontal';
        if (a === 3 && b === 4 && c === 5) lineClass = 'horizontal';
        if (a === 6 && b === 7 && c === 8) lineClass = 'horizontal';

        if (a === 0 && b === 3 && c === 6) lineClass = 'vertical';
        if (a === 1 && b === 4 && c === 7) lineClass = 'vertical';
        if (a === 2 && b === 5 && c === 8) lineClass = 'vertical';

        if (a === 0 && b === 4 && c === 8) lineClass = 'diagonal1';
        if (a === 2 && b === 4 && c === 6) lineClass = 'diagonal2';

        const lineElement = document.createElement('div');
        lineElement.classList.add('line', lineClass);

        boxes[a].appendChild(lineElement.cloneNode());
        boxes[b].appendChild(lineElement.cloneNode());
        boxes[c].appendChild(lineElement.cloneNode());
    }
    disableBoxes();
};
const checkWinner = () => {
    for(let pattern of winPatterns){
        
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if(pos1 != "" && pos2 != "" && pos3 != "")
    {
        if(pos1 === pos2 && pos2 === pos3){
            console.log("Winner",pos1);
            showWinner(pos1);
        }
    }
    }
};
newBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
