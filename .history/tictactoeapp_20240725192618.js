let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newBtn = document.querySelector(".newGame");
let msgC = document.querySelector(".msg");

let turnO = true;
const resetGame = () => {
     turnO = true;
    enableBoxes();
    msgC.classList.add("hide");
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
            turnO = false;
        }
        else{
            box.innerText = "X";
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
const showWinner = (winner) => {
    msgC.innerText = ` Congratulations 🎉 Winner is : ${winner}`;
    msgC.classList.remove("hide");
    newBtn.classList.remove("hide");
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
