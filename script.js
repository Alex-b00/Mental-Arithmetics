$(document).ready(function () {

    let maxNum = 100; // Maximum number possible in the random pick
    let maxTime = 60; // Game length in seconds 

    let answer = "";
    let num1;
    let num2;
    let rightAnswer = num1 + num2;

    let theNum1 = document.querySelector('#num1');
    let theNum2 = document.querySelector('#num2');
    let score = document.querySelector('#score');
    let highScore = document.querySelector('.highscore');
    let clock = document.querySelector('#time');
    let higher = JSON.parse(localStorage.getItem('highscore'));

    let curScore = 0;
    score.textContent = 0;
    highScore.textContent = higher;

    let timeLeft = maxTime;
    clock.textContent = timeLeft;

    let stateStart = 0;

    /* Start Game */
    $('.start').on('click', function () {
        this.blur();

        if (stateStart === 0) {

            stateStart++;
            this.textContent = 'Reset';

            numberGeneration();

            /* Populates the answer area */
            $('.btn-pad').on('click', function () {
                answer += this.textContent;
                updateAnswer();
            });

            /* Clear answer */
            $('#btn-clear').on('click', function () {
                answer = "";
                updateAnswer();
            });

            $('body').keyup(function (e) {
                e.preventDefault();
                if (e.keyCode == 8) {
                    $('#btn-clear').click();
                } else if (e.keyCode == 13) {
                    $('#btn-submit').click();
                } else if (e.keyCode > 95 && e.keyCode < 106) {
                    answer += e.key;
                    updateAnswer();
                }
            });

            /* Submit answer */
            $('#btn-submit').on('click', function () {
                checkAnswer();
                answer = ''
                updateAnswer();
            });

            /*  Clock  */
            // Game over when reaches 0 or 'reset' is pressed.
            timeTicker = setInterval(timeTick, 1000); // timeTicker only holds the ticking calls.
            $('.element8').css("animation", "rotate-tri ease-in-out infinite")
            $('.element8').css("animation-duration", maxTime + "s");



        } else if (stateStart === 1) {
            timeTicker = clearInterval(timeTicker);
            this.textContent = 'Start';
            $('.element8').css({ "animation": "" });


            $('body').off();
            $('.btn-pad').off();

            timeLeft = maxTime;
            clock.textContent = timeLeft;

            theNum1.textContent = '';
            theNum2.textContent = '';

            answer = '';
            updateAnswer();

            if (score.textContent > highScore.textContent) {
                highScore.textContent = score.textContent;
                localStorage.setItem('highscore', JSON.stringify(highScore.textContent));

            };
            curScore = 0;
            score.textContent = 0;
            stateStart--;
        };
    });




    /*  FUNCTIONS  */
    function numberGeneration() {
        // generates and displays the 2 random numbers
        num1 = Math.floor(Math.random() * maxNum);
        num2 = Math.floor(Math.random() * maxNum);
        theNum1.textContent = num1;
        theNum2.textContent = num2;
    };


    function updateAnswer() {
        $('#answer').attr('value', answer)
    }


    function checkAnswer() {
        rightAnswer = num1 + num2;
        if (rightAnswer === Number(answer.slice(0, answer.length - 1))) {
            curScore += 1;
            score.textContent = curScore;
            numberGeneration()
        };
    };


    function timeTick() {
        timeLeft--;
        clock.textContent = timeLeft;
        if (timeLeft === 0) { setTimeout(change, 980); }
    };

    function change() {
        $('.start').click()
    };
});






