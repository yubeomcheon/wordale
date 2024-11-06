const 정답 = "APPLE";

let index = 0;  // 칸
let attempts = 0; // 줄
let timer;

function appStart() {
    const displayGameover = () => {
        const div = document.createElement('div');
        div.innerText = "Game Over"
        div.style = "display:flex; justify-content: center; align-items: center;position:absolute;top:50%;left:39.5vw; background-color:white;width:200px; height:100px;";
        document.body.appendChild(div); // body 에 div삽입
    };

    const nextLine = () => {    // 다음줄 이동
        if (attempts  === 6) return gameover();
        attempts += 1;
        index = 0;
    };   
 
    const gameover = () => {
        window.removeEventListener("keydown",handleKeydown); // 키 입력 x
        displayGameover();
        clearInterval(timer); // setInterval시간을 timer를 저장해놨다가 게임종료될때 초기화 시켜줌
    };

    const handleEnterKey = () => {
        // 정답확인코드
        let 맞은_블록 = 0;                     
        for (let i = 0; i < 5; i++) {
            const blockin = document.querySelector(`.board-column[data-index='${attempts}${i}']`);
            const inputLetter = blockin.innerText;
            const answerLetter = 정답[i];

            const updateKeyboard = (letter, color) => {
                const keyboard = document.querySelector(`.keboard-column[data-value='${letter}']`);
                keyboard.style.backgroundColor = color;  
            };
            
            
            if (inputLetter === answerLetter) {
                맞은_블록 += 1;
                blockin.style.backgroundColor = "#6AAA64";  
                updateKeyboard(inputLetter,"#6AAA64");
            } else if (answerLetter.includes(inputLetter)) {
                blockin.style.backgroundColor = "#C9B458";
                updateKeyboard(inputLetter,"#C9B458");
            } 
            else {
                blockin.style.backgroundColor = "#787C7E";
                updateKeyboard(inputLetter,"#787C7E");
            } 

            blockin.style.color = "white";
        };

        
       
        if(맞은_블록 === 5) gameover(); 
        else nextLine();
    };
    

    const handleBackspace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-column[data-index='${attempts}${index-1}']`);
            preBlock.innerText = "";
        }
        
        if (index !== 0) index -= 1;
    };

    
    const handleKeydown = (event) => {
        
        const key = event.key.toUpperCase(); // 대문자만 들어가게 지정
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
        
        if (event.key === 'Backspace') handleBackspace();
    
        else if (index === 5) {
            if (event.key === 'Enter')  handleEnterKey();
            else return;
        }else if (65 <= keyCode && keyCode <= 90) {  //알파벳만 입력되기 위해 조건문 씀
            thisBlock.innerText = key;
            index += 1; // 다음칸으로 이동
        } 
        
    };

    const keyboardmousedown = (event) =>  {
        const key = event.target.dataset.key;  
        const asciiKey = key.charCodeAt(0); 

        console.log(key);
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
        
        if (key === "Backspace") handleBackspace();
    
        else if (index === 5) {
            if (key === 'Enter')  handleEnterKey();
            else return;
        }else if (65 <= asciiKey && asciiKey <= 90)  {             
            thisBlock.innerText = key;
            index += 1; // 다음칸으로 이동
        } 
       
    };         
    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const minutes = 흐른_시간.getMinutes().toString().padStart(2,"0");
            const seconds = 흐른_시간.getSeconds().toString().padStart(2,"0");
            const timeDiv = document.querySelector('#time');
            timeDiv.innerText = `${minutes}:${seconds}`;
        }
         timer = setInterval(setTime,1000);
    };

    
    
    startTimer();
    window.addEventListener("keydown",handleKeydown); // 키를 눌렀을때 이벤트 발생
    window.addEventListener("mousedown",keyboardmousedown);
}

appStart();