/*    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";

    const firebaseConfig = {
    apiKey: "AIzaSyDVSJgFVFg_LucTiCsV-yT8kjqIJjytutY",
    authDomain: "quiz-98a34.firebaseapp.com",
    databaseURL: "https://quiz-98a34-default-rtdb.firebaseio.com",
    projectId: "quiz-98a34",
    storageBucket: "quiz-98a34.appspot.com",
    messagingSenderId: "679764665347",
    appId: "1:679764665347:web:0d67b22b531eda36419a36"
    };

    const app = initializeApp(firebaseConfig);
    import {getDatabase, ref, child, get, set, update, remove} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";

    const db = getDatabase;
    */
//constants & variables
let username;
const submitBtn = document.getElementById("submitBtn");
const myform = document.getElementById("myForm");
const chquiz = document.querySelector(".choosen-quiz");
const quiz_app = document.querySelector(".quiz-app");
const questionArea = document.querySelector(".question_area");
const answersArea = document.querySelector(".answers_area");
let countSpan = document.querySelector(".question-info .count span");
let category = document.querySelector(".question-info .category span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizSubmitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countDown = document.querySelector(".countdown");

//settings
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;
//first form
submitBtn.addEventListener("click", () => {
  username = document.getElementById("username").value;
  if (!/[A-Za-z]/ig.test(username)) {
    alert("Please enter your username");
  } else {
    chquiz.classList.remove(`hide`);
    myform.classList.add(`hide`);
  }
});
[
  ...document.querySelectorAll(
    ".STARTEXAMELEMENTVERYSECRETCLASSTHATNOONECANACCESORPREDICTCAUSEITISSOHARDTOBEPREDICTED"
  ),
].map((language) => {
  const questions = [];
  //Ajax call for json files
  language.addEventListener("click", () => {
    let myRequest = new XMLHttpRequest();
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let questionObject = JSON.parse(this.responseText);
        let questionCount = 3;
        //create bullets & set question number & category
        createBullets(questionCount);
        category.innerHTML = language.id;

        // adding questions data
        // check if question was choosen
        let randQuestion = randomQuestions(questionObject);
        while (questions.includes(randQuestion)) {
          randQuestion = randomQuestions(questionObject);
        }
        questions.push(randQuestion);
        addData(randQuestion, questionCount);

        //countdown
        countdown(300, questionCount);

        //functioning the submit button
        quizSubmitButton.onclick = () => {
          //get answer
          let answer = questions.filter(
            (item) => item.question == document.querySelector("h4").innerText
          )[0].answer;
          currentIndex++;
          //check the answer
          checkAnswer(answer, questionCount);
          questionArea.innerHTML = "";
          // adding questions data
          // check if question was choosen
          let randQuestion = randomQuestions(questionObject);
          while (questions.includes(randQuestion)) {
            randQuestion = randomQuestions(questionObject);
          }
          questions.push(randQuestion);
          addData(randQuestion, questionCount);
          // Handle bullets class (hanlwn ;))
          handleBullets();
          // Show results
          showResults(questionCount);
        };
      }
    };
    myRequest.open("GET", `json_files/${language.id}.json`, true);
    myRequest.send();
    chquiz.classList.add("hide");
    quiz_app.classList.remove("hide");
  });
  ////////////////////
  // css.addEventListener('click', () =>{
  //     let myRequest = new XMLHttpRequest();
  //     myRequest.onreadystatechange = function () {
  //         if(this.readyState === 4 && this.status === 200){
  //             let questionObject = JSON.parse(this.responseText);
  //             console.log(questionObject);
  //     }
  // };
  //     myRequest.open("GET", "json_files/css.json", true);
  //     myRequest.send();
  //     chquiz.classList.add('hide');
  //     quiz_app.classList.remove('hide');
  // })
  // ////////////////////
  // js.addEventListener('click', () =>{
  //     let myRequest = new XMLHttpRequest();
  //     myRequest.onreadystatechange = function () {
  //         if(this.readyState === 4 && this.status === 200){
  //             let questionObject = JSON.parse(this.responseText);
  //             console.log(questionObject);
  //     }
  // };
  //     myRequest.open("GET", "json_files/js.json", true);
  //     myRequest.send();
  //     chquiz.classList.add('hide');
  //     quiz_app.classList.remove('hide');
  // })
  // ////////////////////
  // java.addEventListener('click', () =>{
  //     let myRequest = new XMLHttpRequest();
  //     myRequest.onreadystatechange = function () {
  //         if(this.readyState === 4 && this.status === 200){
  //             let questionObject = JSON.parse(this.responseText);
  //             console.log(questionObject);
  //     }
  // };
  //     myRequest.open("GET", "json_files/java.json", true);
  //     myRequest.send();
  //     chquiz.classList.add('hide');
  //     quiz_app.classList.remove('hide');
  // })
  // ////////////////////
  // python.addEventListener('click', () =>{
  //     let myRequest = new XMLHttpRequest();
  //     myRequest.onreadystatechange = function () {
  //         if(this.readyState === 4 && this.status === 200){
  //             let questionObject = JSON.parse(this.responseText);
  //             console.log(questionObject);
  //     }
  // };
  //     myRequest.open("GET", "json_files/python.json", true);
  //     myRequest.send();
  //     chquiz.classList.add('hide');
  //     quiz_app.classList.remove('hide');
  // })
  // ////////////////////
  // cpp.addEventListener('click', () =>{
  //     let myRequest = new XMLHttpRequest();
  //     myRequest.onreadystatechange = function () {
  //         if(this.readyState === 4 && this.status === 200){
  //             let questionObject = JSON.parse(this.responseText);
  //             console.log(questionObject);
  //     }
  // };
  //     myRequest.open("GET", "json_files/cpp.json", true);
  //     myRequest.send();
  //     chquiz.classList.add('hide');
  //     quiz_app.classList.remove('hide');
  // })
  // ////////////////////
  // c.addEventListener('click', () =>{
  //     let myRequest = new XMLHttpRequest();
  //     myRequest.onreadystatechange = function () {
  //         if(this.readyState === 4 && this.status === 200){
  //             let questionObject = JSON.parse(this.responseText);
  //             console.log(questionObject);
  //     }
  // };
  //     myRequest.open("GET", "json_files/c.json", true);
  //     myRequest.send();
  //     chquiz.classList.add('hide');
  //     quiz_app.classList.remove('hide');
  // })

  function createBullets(num) {
    countSpan.innerHTML = num;
    // create Spans for the number of questions
    for (let i = 0; i < num; i++) {
      //create bullets
      let theBullet = document.createElement("span");
      // check the span
      if (i === 0) {
        theBullet.className = "on";
      }
      //append bullets to main bullet container
      bulletsSpanContainer.appendChild(theBullet);
    }
  }
  function addData(obj, count) {
    if (currentIndex < count) {
      //creating h2 title
      let questionTitle = document.createElement("h4");
      // question text
      let questionText = document.createTextNode(obj.question);
      // append
      questionTitle.appendChild(questionText);
      questionArea.appendChild(questionTitle);
      //answers
      answersArea.innerHTML = "";
      for (let i = 1; i <= 4; i++) {
        // create the main div
        let mainDiv = document.createElement("div");
        mainDiv.className = "answer";
        //radio button
        let radioInput = document.createElement("input");
        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `option_${i}`;
        radioInput.dataset.answer = obj[`option_${i}`];
        //first option selected
        // when you do the css access this
        if (i === 1) {
          radioInput.checked = true;
        }
        // create label
        let radioLabel = document.createElement("label");
        radioLabel.htmlFor = `option_${i}`;
        let radioLabelText = document.createTextNode(obj[`option_${i}`]);
        radioLabel.appendChild(radioLabelText);
        // apend in the main div
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(radioLabel);
        // answers area
        answersArea.appendChild(mainDiv);
        //
      }
    }
  }

  function randomQuestions(obj) {
    // get random question from the array from json
    return obj[Math.floor(Math.random() * obj.length)];
  }

  function checkAnswer(rAnswer, count) {
    let choosenAnswer = document.querySelector(
      "input[name=question]:checked + label"
    ).innerText;
    console.log(choosenAnswer, rAnswer, choosenAnswer === rAnswer);
    if (rAnswer === choosenAnswer) {
      rightAnswers++;
    }
  }
  function handleBullets() {
    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {
      if (currentIndex === index) {
        span.className = "on";
      }
    });
    //lwna :)
  }
  function showResults(count) {
    let theResults;
    if (currentIndex === count) {
      questionArea.remove();
      answersArea.remove();
      quizSubmitButton.remove();
      bullets.remove();
      let h1 = document.getElementById("h1");
      h1.innerHTML = `Dear ${username.split(" ")[0]}, here is your Results`;
      // will be styled with css
      if (rightAnswers > count / 2 && rightAnswers < count) {
        theResults = `<span class="good results">Good</span>, ${rightAnswers} From ${count}`;
      } else if (rightAnswers === count) {
        theResults = `<span class="perfect results">Perfect</span>, All Answers Is Good`;
      } else {
        theResults = `<span class="bad results">Bad</span>, ${rightAnswers} From ${count}`;
      }

      resultsContainer.innerHTML = theResults;
    }
  }

  function endQuiz(count) {
    let theResults;
    questionArea.remove();
    answersArea.remove();
    quizSubmitButton.remove();
    bullets.remove();
    let h1 = document.getElementById("h1");
    h1.innerHTML = "Your Results";
    // will be styled with css
    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good results">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect results">Perfect</span>, All Answers are right `;
    } else {
      theResults = `<span class="bad results">Bad</span>, ${rightAnswers} From ${count}`;
    }
    resultsContainer.innerHTML = theResults;
  }
  function countdown(duration, count) {
    if (currentIndex < count) {
      let minutes, seconds;
      countDownInterval = setInterval(function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        countDown.innerHTML = `${minutes} : ${seconds}`;

        if (--duration < 0) {
          clearInterval(countDownInterval);
          endQuiz(count);
        }
      }, 1000);
    }
  }
});
