let index = 0;
let attempts = 0;
const answer = "APPLE";

const appStart = () => {
  const gameover = () => {
    const div = document.createElement("div");
    div.innerHTML = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:45vw;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) {
      return gameover();
    }
    attempts += 1;
    index = 0;
  };
  const handleEnter = () => {
    good = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const inputText = block.innerHTML;
      const answerText = answer[i];
      console.log(`입력글자 ${inputText} : 정답글자 ${answerText}`);
      if (inputText === answerText) {
        good += 1;
        block.style.background = "red";
      } else if (answer.includes(inputText)) {
        block.style.background = "yellow";
      } else {
        block.style.background = "gray";
      }
    }
    if (good === 5) {
      gameover();
    }
    nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const prevBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );

      prevBlock.innerHTML = "";
    }
    if (index !== 0) {
      index -= 1;
    }
  };
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (e.key === "Backspace") {
      handleBackspace();
    } else if (index === 5) {
      if (e.key === "Enter") {
        handleEnter();
      } else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerHTML = key;
      index += 1;
    }
  };
  //   const startTimer = () => {
  //     const nowTime = new Date();
  //     const subTime = new Date(nowTime - startTime);
  //     const min = subTime.getMinutes().toString().padStart(2, "0");
  //     const sec = subTime.getSeconds().toString().padStart(2, "0");
  //     const timeH1 = document.querySelector("#time");
  //     timeH1.innerHTML = `${min}:${sec}`;
  //   };
  //   setInterVal(startTimer, 1000);
  window.addEventListener("keydown", handleKeydown);
};

appStart();
