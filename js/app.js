let screenInput = document.getElementById('screen_input');
let screenProgress = document.getElementById('screen_progess');
const keyList = document.getElementsByClassName('key');
const operationList = document.getElementsByClassName('operation');
const equalKey = document.getElementsByClassName('equal')[0];
const resetList = document.getElementsByClassName('reset');
const keyComa = document.getElementsByClassName('keyComa')[0];
const keyPercent = document.getElementsByClassName('keyPercent')[0];

function calculate(screenInput, screenProgress){
    const number1 = Number(screenProgress.split(" ")[0]);
    const number2 = Number(screenInput);
    const operation = screenProgress.split(" ")[1];
    let result;
    if (operation === "+") {
        result = number1 + number2
    } else if(operation === "-") {
        result = number1 - number2
    } else if (operation === "*") {
        result = number1 * number2
    } else if (operation === "/") {
        result = number1 / number2
    }

    return result
}

function calculateWithOpe(number1, number2, operation) {
    let result;
    number1 = Number(number1)
    number2 = Number(number2)
    if (operation === "+") {
        result = number1 + number2
    } else if(operation === "-") {
        result = number1 - number2
    } else if (operation === "*") {
        result = number1 * number2
    } else if (operation === "/") {
        result = number1 / number2
    }
    return result
}

function resetProgress() {
    screenProgress.classList.remove('showProgress')
    screenProgress.classList.add('hideProgress')
    screenProgress.innerText = ""
}

Array.prototype.forEach.call(keyList, (item) => {
    item.addEventListener('click', (e) => {
        if(screenInput.innerText === "0"){
            screenInput.innerText = ""
        }
        screenInput.innerText += e.target.innerText;
        console.log(e.target.innerText + " a été touché")
    })
})

Array.prototype.forEach.call(operationList, (item) => {
    item.addEventListener('click', (e) => {
        if(screenInput.innerText.charAt(screenInput.innerText.length-1) === "."){
            console.log(screenInput.innerText.charAt(screenInput.innerText.length-1))
            screenInput.innerText = screenInput.innerText.slice(0, screenInput.innerText.length -1)          
        }

        if(screenProgress.innerText === ""){
            screenProgress.innerText = screenInput.innerText + " " + e.target.innerText;
            screenInput.innerText = "0";
        } else if(screenProgress.innerText.includes("=")) {
            screenProgress.innerText = screenInput.innerText + " " + e.target.innerText;
            screenInput.innerText = "0"
        } else {
            screenProgress.innerText = calculate(screenInput.innerText, screenProgress.innerText) + " " + e.target.innerText
            screenInput.innerText = "0";
        }

        screenProgress.classList.remove('hideProgress');
        screenProgress.classList.add('showProgress')
    })
})

Array.prototype.forEach.call(resetList, (item) => {
    item.addEventListener('click', (e) => {
        if(e.target.innerText === "CE") {
            if(screenProgress.innerText.includes("=")) {
                resetProgress()
                screenInput.innerText = "0"
            } else {
                screenInput.innerText = "0"
            }
            
        } else if(e.target.innerText === "C") {
            resetProgress()
            screenInput.innerText = "0"
        } else if(e.target.innerText === "Re") {
            if(screenProgress.innerText.includes("=")) {
                resetProgress()
            } else if(screenInput.innerText === "0") 
                screenInput.innerText = "0"
            else if(screenInput.innerText.length === 1) {
                screenInput.innerText = "0"
            } else {
                screenInput.innerText = screenInput.innerText.slice(0, screenInput.innerText.length -1)
            }
        } 
    })
})

equalKey.addEventListener('click', () => {
    if(screenProgress.innerText === ""){
        console.log("Nope equal")
    } else if(screenProgress.innerText.includes("=")){
        let tempNum1 = screenProgress.innerText.split(" ")[0]
        let tempNum2 = screenProgress.innerText.split(" ")[2]
        let tempOpe = screenProgress.innerText.split(" ")[1]
        let res = calculateWithOpe(tempNum1, tempNum2, tempOpe)

        console.log(tempNum1)
        console.log(tempNum2)
        console.log(tempOpe)

        screenInput.innerText = calculateWithOpe(res, tempNum2, tempOpe)
        screenProgress.innerText = res + " " + tempOpe + " " + tempNum2 + " = "
        console.log("cas 2 equal")
    } else {
        let temp = screenProgress.innerText
        screenProgress.innerText = temp + " " + screenInput.innerText + " = "
        screenInput.innerText = calculate(screenInput.innerText, temp)
        console.log("cas 3 equal")
    }
})

keyComa.addEventListener('click', () => {
    if(screenProgress.innerText.includes("=")){
        resetProgress()
        screenInput.innerText = "0."
    } else {
        if(screenInput.innerText.includes('.')) {
            console.log("Nope coma")
        } else {
            screenInput.innerText += "."
        }
    }
})

keyPercent.addEventListener('click', () => {
    if(screenProgress.innerText === "" || screenProgress.innerText === "0") { //progress = vide OU progress = 0
        if(screenInput.innerText === "" || screenInput.innerText === "0"){ //input = vide OU input = 0
            resetProgress()
            screenInput.innerText = "0"
            console.log("premier cas")
        } else if (screenInput.innerText !== "" || screenInput.innerText !== "0") { //input < 0 OU input > 0
            resetProgress()
            screenInput.innerText = "0"
            console.log("second cas")
        }
    } else if(screenProgress.innerText !== "" || screenProgress.innerText !== "0") { //progress pas vide OU pas 0
        if(screenInput.innerText === "" || screenInput.innerText === "0"){
            resetProgress()
            screenInput.innerText ="0"
        } else if(screenInput.innerText !== "" || screenInput.innerText !== "0") {
            let tempNumber1 = screenProgress.innerText.split(" ")[0]
            let tempNumber2 = screenInput.innerText
            let tempOperation = screenProgress.innerText.split(" ")[1]
            let percent = ((calculateWithOpe(tempNumber1, tempNumber2, "*")) / 100).toString();
            
            screenProgress.innerText = tempNumber1 + " " + tempOperation ;
            screenInput.innerText = percent

            console.log("quatrième cas")
        }
    }
})
