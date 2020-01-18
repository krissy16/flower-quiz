//array of objects to store questions, answers, correct answer, and image to display
const STORE = [
    {
        question: 'For a cat, lilies are which of the following?',
        options: ['A healthy part of their diet','A delicious treat','Toxic','A safe chew toy'],
        answer: 'Toxic',
        image: 'images/lily.jpg'
    },
    {
        question: 'The Titan Arum is the world’s tallest flower. How high can it grow?',
        options: ['5 feet','10 feet','15 feet','20 feet'],
        answer: '10 feet',
        image: 'images/titan-arum.jpg'
    },
    {
        question: 'What happens after the Agave blooms?',
        options: ['It changes colors','It dies','It splits in two','Nothing'],
        answer: 'It dies',
        image: 'images/agave.jpg'
    },
    {
        question: 'Which is the world’s smallest flowering plant?',
        options: ['Mimosa Pudica','Rafflesia arnoldii','Wolffia globose','Grass'],
        answer: 'Wolffia globose',
        image: 'images/wolffia-globose.jpg'
    },
    {
        question: 'Which common food is actually a flower?',
        options: ['Apple','Broccoli','Blueberry','Pear'],
        answer: 'Broccoli',
        image: 'images/broccoli.jpg'
    },
    {
        question: 'Which of these can be used in place of an onion in cooking?',
        options: ['Tulip Bulb','Rose Stem','Grass','Lily Leaf'],
        answer: 'Tulip Bulb',
        image: 'images/tulip.jpg'
    },
    {
        question: 'What flower has the world’s largest bloom?',
        options: ['Rafflesia arnoldii','Wolffia globose','Mimosa Pudica','Tulip'],
        answer: 'Rafflesia arnoldii',
        image: 'images/rafflesia-arnoldii.jpg'
    },
    {
        question: 'In America, about 60% of fresh cut flowers come from where?',
        options: ['Wyoming','Florida ','California','New York'],
        answer: 'California',
        image: 'images/poppy.jpg'
    },
    {
        question: 'The Titan Arum smells like rotten flesh. What advantage does this have for the flower?',
        options: ['It attracts pollinators','It deters predators','It attracts a mate','It helps the plant grow'],
        answer: 'It attracts pollinators',
        image: 'images/titan-arum.jpg'
    },
    {
        question: 'What happens when you touch the Mimosa Pudica?',
        options: ['You get a rash','It folds up its leaves','It changes color','It releases an odor'],
        answer: 'It folds up its leaves',
        image: 'images/mimosa-pudica.jpg'
    },
];


let score = 0;
let questionNum = 0;

function handleStart(){
    $('.start-btn').on('click', function(event){
        populateQuestion();
        $('.start-screen').addClass('hidden');
        $('.question-screen').removeClass('hidden');
        $('.progress').removeClass('hidden');
    });
}

function populateQuestion(){
    let currentQuestion = STORE[questionNum];
    let currentOptions = currentQuestion.options;
    let currentOptionsHtml = [];

    for(let i=0; i<currentOptions.length; i++){
        currentOptionsHtml.push(`<input type="radio" name="option" class="option" id="option-${i+1}" value="${currentOptions[i]}"\
                                    role="radio" aria-checked="false" tabindex="${i+1}" required>\
                                 <label for="option-${i+1}">${currentOptions[i]}</label><br />`);
    }

    $('.question').text(currentQuestion.question);
    $('.options').html(currentOptionsHtml);

}


function handleSubmit(){
    $('form').on('submit', function(event){
        event.preventDefault();
        let choice = $('input[name=option]:checked').val();
        populateAnswer(choice);
        $('.question-screen').addClass('hidden');
        $('.answer-screen').removeClass('hidden');
    });
}

function populateAnswer(answerChoice){
    let currentQuestion = STORE[questionNum];
    if(currentQuestion.answer === answerChoice) {
        $('.answer-result').text('Correct!');
        changeBackgroundColor('green');
        updateScore();
    }
    else{
        $('.answer-result').text('Wrong!');
        changeBackgroundColor('red');
    } 
    $('.answer-image').attr('src',currentQuestion.image);
    $('.answer-image').attr('alt',currentQuestion.image.slice(7, currentQuestion.image.length-4));
    $('.answer-text').text(`The correct answer is: ${currentQuestion.answer}`);
}

function changeBackgroundColor(color){
   $('main').addClass(color)
}
function resetBackgroundColor(){
    $('main').removeClass(); 
}

function handleNext(){
    $('.next-btn').on('click', function(event){
        $('.answer-screen').addClass('hidden');
        resetBackgroundColor();
        if(questionNum==9){
            showResult();
        }
        else{
            nextQuestion();
        }
    });
}

function showResult(){
    $('.result-screen').removeClass('hidden');
    $('.progress').addClass('hidden');
    $('.final-score').text(`${score}/10`)
}

function nextQuestion(){
    updateQuestionNum()
    populateQuestion();
    $('.question-screen').removeClass('hidden');
}

function updateScore(){
    score++;
    $('.score').text(`Score: ${score}`);
}

function updateQuestionNum(){
    questionNum++;
    $('.question-num').text(`Question: ${questionNum+1}/10`);
}

function handleRestartQuiz(){
    $('.restart-btn').on('click', function(event){
        resetQuiz();
        $('.result-screen').addClass('hidden');
        $('.start-screen').removeClass('hidden');
    });
}

function resetQuiz(){
    questionNum = 0;
    score = 0;
    $('.question-num').text('Question: 1/10');
    $('.score').text('Score: 0');
}

function handleQuizApp() {
    handleStart();
    handleSubmit();
    handleNext();
    handleRestartQuiz();
  }
  
  $(handleQuizApp);