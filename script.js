const startButton = document.querySelector(".startButton")
const body = document.querySelector("body")
const start = document.querySelector(".start")
const howToPlay = document.querySelector(".howToPlay")
const startGameButton = document.querySelector(".startGame")
const game = document.querySelector(".game")
const gameContainer = document.querySelector(".game-container");
const scoreCount = document.querySelector(".scoreCount")
const timerCount = document.querySelector(".time")
const popUp = document.querySelector(".popUp");
const information = document.querySelector(".information");
const close = document.querySelector(".close");
const final = document.querySelector(".final");
const finalTitle = document.querySelector(".title-final");
const icon = document.querySelector(".icon");
const text = document.querySelector(".text");
const more = document.querySelector(".More");
const restart = document.querySelector(".restart");

let border

let scoreinterval
let timeinterval

let movingRight
let movingLeft
let spawnOnce
let startGame = false;
let player = {step: 2, right:9}
let time;
let right;
let score;

var objects = [ "aluminium", "bamboo","brick", "concrete", "cork", "lead", "paper","plastic","steel", "steel1", "wood"]

var nonSustainable = [
    {image: "./img/concrete.png",info:"Steel is not sustainable. Steel production and waste contribute large amounts of greenhouse gases into water and air. Recycled steel is more sustainable as lesser energy is used to produce it."},
    {image: "./img/lead.png", info:"Lead is not sustainable. Exposure to lead and improper lead waste management can result in serious health problems and harm the growth and reproduction of plants and animals."},
    {image: "./img/steel1.png", info:"Steel is not a sustainable building material. Steel production and waste contributes large amounts of greenhouse gases in water and air. Recycled steel is more sustainable as lesser energy is used to produce new materials."}
]

var sustainable = [
    {image: "./img/aluminium.png", info:"Recycled aluminium is infinitely recyclable, lightweight and strong. Recycled materials help to reduce energy and carbon emissions."},
    {image: "./img/bamboo.png", info:"Bamboo is renewable, offering great flexibility, rigidity and strength as an alternative construction material."},
    {image: "./img/brick.png", info:"Reclaimed bricks help to reduce emissions, landfill waste and needless production of new materials."},
    {image: "./img/cork.png", info:"Cork is sustainably harvested, naturally biodegradable  and offsets carbon dioxide emissions with oxygen production."},
    {image: "./img/paper.png", info:"Paper insulation is composed of up to 85% recycled materials and uses less energy than other insulation products.  "},
    {image: "./img/plastic.png", info:"The same piece of plastic can only be recycled about 2-3 times before its quality decreases to the point where it can no longer be used."},
    {image: "./img/steel.png", info:"It takes up to 75% less energy to produce recycled steel compared with new steel. The use of recycled steel helps reduce the amount of energy and waste in steel production."},
    {image: "./img/wood.png", info:"Wood is completely renewable and biodegradable, with large adaptability in production and recyclability."}
]

startButton.addEventListener("click", () => {
    start.classList.add("hide")
    howToPlay.classList.remove("hide")
    body.style.backgroundColor = "#E7F7F5"
})

startGameButton.addEventListener("click", () => {
    howToPlay.classList.add("hide")
    began()
})

close.addEventListener("click", () => {
    popUp.classList.add("hide")
    startGame = true
    fallingObject()
})

restart.addEventListener("click", () => {
    final.classList.add("hide")
    began()
  })

function began(){
    game.classList.remove("hide")
    body.style.backgroundColor = ""
    body.style.backgroundImage = `url("./img/background.png")`
    startGame = true
    score = 0
    time = 45
    movingLeft = false
    movingRight = false
    spawnOnce = false
    timerCount.innerHTML = `${time}s`;
    scoreinterval =  setInterval(updateScore, 1)
    timeinterval = setInterval(updateCountDown, 1000)
    spawnObject()
    fallingObject()
}

function spawnObject(){
    border = gameContainer.getBoundingClientRect();
    let object = document.createElement("div");
    var index = Math.floor(Math.random() * Math.floor(objects.length))
    console.log(index)
    console.log(objects.length)
    console.log(border.width)
    object.classList.add(objects[index])
    object.y = 0;
    object.style.top = object.y + 'px';
    let random = Math.floor(Math.random() * 2)
    if(random == 0){
        object.x = 25
    }
    else{
        object.x = border.width - 150
    }
    object.style.left = object.x + 'px';
    gameContainer.appendChild(object);
    function noMark(){
        object.classList.add("wrong")
    }
    function addMove(){
        object.addEventListener("click", () => {
            object.classList.add("move")
        })
    }
    if(objects[index] == "aluminium"){
        addMove();
    }
    if(objects[index] == "bamboo"){
        addMove();
    }
    if(objects[index] == "brick"){
        addMove();
    }
    if(objects[index] == "concrete"){
        noMark();
        addMove();
    }
    if(objects[index] == "cork"){
        addMove();
    }
    if(objects[index] == "lead"){
        noMark();
        addMove();
    }
    if(objects[index] == "paper"){
        addMove();
    }
    if(objects[index] == "plastic"){
        addMove();
    }
    if(objects[index] == "steel"){
        addMove();
    }
    if(objects[index] == "steel1"){
        noMark();
        addMove();
    }
    if(objects[index] == "wood"){
        addMove();
    }
}

function fallingObject(){
    if(startGame){
        moveObject()
        window.requestAnimationFrame(fallingObject);
    }
}
function moveObject(){
    let aluminium = document.querySelectorAll(".aluminium");
    let bamboo = document.querySelectorAll(".bamboo");
    let brick = document.querySelectorAll(".brick");
    let concrete = document.querySelectorAll(".concrete");
    let cork = document.querySelectorAll(".cork");
    let lead = document.querySelectorAll(".lead");
    let paper = document.querySelectorAll(".paper");
    let plastic = document.querySelectorAll(".plastic");
    let steel = document.querySelectorAll(".steel");
    let steel1 = document.querySelectorAll(".steel1");
    let wood = document.querySelectorAll(".wood");
    let border = gameContainer.getBoundingClientRect();

    let spwanTime = border.height / 4

    function spawnItem(item){

        if(item.y >= spwanTime && item.y < (spwanTime + 3) && spawnOnce == false){
            spawnObject();
            spawnOnce = true
        }
        if(item.y >= (spwanTime + 3) && item.y < (spwanTime + 6)){
            spawnOnce = false
        }
        if(item.classList.contains("move")){
            if(item.y > (border.height - 200)){
                item.classList.remove("move")
            }
            if(item.x > 40 && movingLeft == false && movingRight == false){
                movingLeft = true
            }
            if(item.x < 40 && movingLeft == false && movingRight == false){
                movingRight = true
            }

            if(movingLeft == true){
                item.x = item.x - player.right;
                item.style.left = item.x +"px";
                if(item.x < 20){
                    item.classList.remove("move")
                    movingLeft = false
                }
                return
            }
            if(movingRight == true){
                item.x = item.x + player.right;
                item.style.left = item.x +"px";
                if(item.x > border.width - 200){
                    item.classList.remove("move")
                    movingRight = false
                }
                return
            }
        }
        if(item.y > border.height){
            if(!item.classList.contains("wrong")){
                startGame = false
                if(item.classList.contains("aluminium")){
                    information.innerHTML =`
                    <img src="${sustainable[0].image}">
                    <p>${sustainable[0].info}</p>`
                }
                if(item.classList.contains("bamboo")){
                    information.innerHTML =`
                    <img src="${sustainable[1].image}">
                    <p>${sustainable[1].info}</p>`
                }
                if(item.classList.contains("brick")){
                    information.innerHTML =`
                    <img src="${sustainable[2].image}">
                    <p>${sustainable[2].info}</p>`
                }
                if(item.classList.contains("cork")){
                    information.innerHTML =`
                    <img src="${sustainable[3].image}">
                    <p>${sustainable[3].info}</p>`
                }
                if(item.classList.contains("paper")){
                    information.innerHTML =`
                    <img src="${sustainable[4].image}">
                    <p>${sustainable[4].info}</p>`
                }
                if(item.classList.contains("plastic")){
                    information.innerHTML =`
                    <img src="${sustainable[5].image}">
                    <p>${sustainable[5].info}</p>`
                }
                if(item.classList.contains("steel")){
                    information.innerHTML =`
                    <img src="${sustainable[6].image}">
                    <p>${sustainable[6].info}</p>`
                }
                if(item.classList.contains("wood")){
                    information.innerHTML =`
                    <img src="${sustainable[7].image}">
                    <p>${sustainable[7].info}</p>`
                }
                popUp.classList.remove("hide")
            }
            gameContainer.removeChild(item);
        }
        if(item.y > (border.height - 150) && item.y < (border.height - 100) && 
        item.x > -5 && item.x < 100){
            if(!item.classList.contains("wrong")){
                score += 1
                gameContainer.removeChild(item);
                return
            }
            else{
                startGame = false
                if(item.classList.contains("concrete")){
                    information.innerHTML =`
                    <img src="${nonSustainable[0].image}">
                    <p>${nonSustainable[0].info}</p>`
                }
                if(item.classList.contains("lead")){
                    information.innerHTML =`
                    <img src="${nonSustainable[1].image}">
                    <p>${nonSustainable[1].info}</p>`
                }
                if(item.classList.contains("steel1")){
                    information.innerHTML =`
                    <img src="${nonSustainable[2].image}">
                    <p>${nonSustainable[2].info}</p>`
                }
                popUp.classList.remove("hide")
                gameContainer.removeChild(item);
            }
        }
        item.y = item.y + player.step;
        item.style.top = item.y +"px";
    }
    aluminium.forEach(function(item){
        spawnItem(item);
    })
    bamboo.forEach(function(item){
        spawnItem(item);
    })
    brick.forEach(function(item){
        spawnItem(item);
    })
    concrete.forEach(function(item){
        spawnItem(item);
    })
    cork.forEach(function(item){
        spawnItem(item);
    })
    lead.forEach(function(item){
        spawnItem(item);
    })
    paper.forEach(function(item){
        spawnItem(item);
    })
    plastic.forEach(function(item){
        spawnItem(item);
    })
    steel.forEach(function(item){
        spawnItem(item);
    })
    steel1.forEach(function(item){
        spawnItem(item);
    })
    wood.forEach(function(item){
        spawnItem(item);
    })
}

function updateScore(){
    if(startGame == true){
        scoreCount.innerHTML = `${score} pt`;

        if(score == 20){
            console.log("stop")
            let delay = setTimeout(() => {
                startGame = false
                remove()
                game.classList.add("hide")
                final.classList.remove("hide")
                body.style.backgroundColor = ""
                final.style.backgroundColor = ""
                icon.style.color = "#7CB254"
                text.style.backgroundColor = "#7CB254"
                text.style.color = "white"
                more.style.backgroundColor = "#7CB254"
                more.style.color = "white"
                restart.style.color = "black"
                finalTitle.src = "./img/title.png"
                icon.innerHTML = `
                <img src="./img/awesome.png">
                <p>Awesome!</p>`;
                more.innerHTML = `
                <p class="Moretext">Find out how to 
                <br>get green mark</p>
                <img src="./img/arrow.png" class="arrowHead">`
                restart.innerHTML = `
                <img src="./img/black.png">
                <p>RESTART</p>`
                clearInterval(scoreinterval);
                clearInterval(timeinterval);
              }, 200);
        }
    }
}

function updateCountDown(){
    console.log(startGame)
      if(startGame == true){
          if(time == 0){
            startGame = false
            remove()
            game.classList.add("hide")
            final.classList.remove("hide")
            body.style.backgroundImage = "none"
            body.style.backgroundColor = "#474747"
            final.style.backgroundColor = "#474747"
            icon.style.color = "white"
            text.style.backgroundColor = "grey"
            text.style.color = "white"
            more.style.backgroundColor = "white"
            more.style.color = "#474747"
            restart.style.color = "white"
            finalTitle.src = "./img/lose.png"
            icon.innerHTML = `
            <img src="./img/timeout.png">
            <p>Timeout</p>`;
            more.innerHTML =`            
            <p class="Moretext">Find out how to 
            <br>get green mark</p>
            <img src="./img/black-arrow.png" class="arrowHead">`
            restart.innerHTML = `
            <img src="./img/white.png">
            <p>RESTART</p>`
            clearInterval(scoreinterval);
            clearInterval(timeinterval);
              return
          }
          time--;
          timerCount.innerHTML = `${time}s`;
      }
  }

function remove(){
    let aluminium = document.querySelectorAll(".aluminium");
    let bamboo = document.querySelectorAll(".bamboo");
    let brick = document.querySelectorAll(".brick");
    let concrete = document.querySelectorAll(".concrete");
    let cork = document.querySelectorAll(".cork");
    let lead = document.querySelectorAll(".lead");
    let paper = document.querySelectorAll(".paper");
    let plastic = document.querySelectorAll(".plastic");
    let steel = document.querySelectorAll(".steel");
    let steel1 = document.querySelectorAll(".steel1");
    let wood = document.querySelectorAll(".wood");
    
    aluminium.forEach(function(item){
        gameContainer.removeChild(item);
    })
    bamboo.forEach(function(item){
        gameContainer.removeChild(item);
    })
    brick.forEach(function(item){
        gameContainer.removeChild(item);
    })
    concrete.forEach(function(item){
        gameContainer.removeChild(item);
    })
    cork.forEach(function(item){
        gameContainer.removeChild(item);
    })
    lead.forEach(function(item){
        gameContainer.removeChild(item);
    })
    paper.forEach(function(item){
        gameContainer.removeChild(item);
    })
    plastic.forEach(function(item){
        gameContainer.removeChild(item);
    })
    steel.forEach(function(item){
        gameContainer.removeChild(item);
    })
    steel1.forEach(function(item){
        gameContainer.removeChild(item);
    })
    wood.forEach(function(item){
        gameContainer.removeChild(item);
    })
}