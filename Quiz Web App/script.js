document.addEventListener("DOMContentLoaded", function () {
    const quizQuestions = [
        // index 0
        {
            question: "What is the capital of France?",
            answer: [
                // index 0
                {
                    text: "Paris", current: true
                },
                // index 1
                {
                    text: "London", current: false
                },
                // index 2
                {
                    text: "Berlin", current: false
                },
                // index 3
                {
                    text: "Macao", current: false
                }
            ]
        },

        // index 1
        {
            question: "What is the capital of Germany?",
            answer: [
                // index 0 
                {
                    text: "Berlin", current: true
                },
                // index 1
                {
                    text: "Paris", current: false
                },
                // index 2
                {
                    text: "London", current: false
                },
                // index 3
                {
                    text: "Macao", current: false
                }
            ]
        },

    ];

    const quizQuestion = document.getElementById('Question');

    const quizAnswers = document.getElementById('gpBtn');
    const nextBtn = document.querySelector('#btnNext');
    let countOfQue = 0;
    let score = 0;

    function start() {
        countOfQue = 0;
        score = 0;
        nextBtn.textContent = "NEXT";
        showQue();
    }

    function showQue() {
        resetState();
        let currentQue = quizQuestions[countOfQue];
        let queNo = countOfQue + 1;
        quizQuestion.innerText = `${queNo}. ${currentQue.question}`;

        currentQue.answer.forEach(ans => {
            let btn = document.createElement('button');
            btn.innerHTML = ans.text;
            btn.classList.add('btn');
            quizAnswers.appendChild(btn);

            if (ans.current) {
                btn.dataset.current = ans.current;

            }

            btn.addEventListener('click', selectAns);

        });
    }

    function resetState() {
        let count = 0;
        nextBtn.style.display = 'none';
        while (quizAnswers.firstChild) {
            console.log(++count);
            quizAnswers.removeChild(quizAnswers.firstChild);
        }
    }

    function selectAns(e) {
        const selectbtn = e.target;
        const iscurrect = selectbtn.dataset.current === 'true';
        if (iscurrect) {
            // selectbtn.style.background = "#9ababc";
            selectbtn.classList.add("correct");
            score++;
        } else {
            // selectbtn.style.background = "#ff9393";
            selectbtn.classList.add("incorrect");
        }

        Array.from(quizAnswers.children).forEach(button => {
            if (button.dataset.current === 'true') {
                button.classList.add("correct");
                // button.style.background = "#9ababc";
            }
            button.disabled = 'true';
        });
        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        if (countOfQue < quizQuestions.length) {
            handleNextBtn();
        } else {
            start();
        }
    })

    function handleNextBtn() {
        countOfQue++;
        if (countOfQue < quizQuestions.length) {
            showQue();
        } else {
            showScore();
        }
    }

    function showScore() {

        resetState();
        quizQuestion.innerHTML = `Your score is ${score} out of ${quizQuestions.length}`;
        nextBtn.innerHTML = "Play Again";
        nextBtn.style.display = "block";
    }

    start();
});