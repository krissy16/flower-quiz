//array of objects to store questions, answers, correct answer, and image to display
const STORE = [
    {
        question: 'For a cat, lilies are which of the following?',
        options: ['A healthy part of their diet','A delicious treat','Toxic'],
        answer: 'Toxic',
        image: 'images/lily.jpg'
    },
    {
        question: 'The Titan Arum is the world’s tallest flower. How high can it grow?',
        options: ['5 feet','10 feet','15 feet'],
        answer: '10 feet',
        image: 'images/titan-arum.jpg'
    },
    {
        question: 'What happens after the Agave blooms?',
        options: ['It changes colors','It dies','It splits in two'],
        answer: 'It dies',
        image: 'images/agave.jpg'
    },
    {
        question: 'Which is the world’s smallest flowering plant?',
        options: ['Mimosa Pudica','Rafflesia arnoldii','Wolffia globose'],
        answer: 'Wolffia globose',
        image: 'images/wolffia-globose.jpg'
    },
    {
        question: 'Which common food is actually a flower?',
        options: ['Apple','Broccoli','Blueberry'],
        answer: 'Broccoli',
        image: 'images/broccoli.jpg'
    },
    {
        question: 'Which of these can be used in place of an onion in cooking?',
        options: ['Tulip Bulb','Rose Stem','Lily Leaf'],
        answer: 'Tulip Bulb',
        image: 'images/tulip.jpg'
    },
    {
        question: 'What flower has the world’s largest bloom?',
        options: ['Rafflesia arnoldii','Wolffia globose','Mimosa Pudica'],
        answer: 'Rafflesia arnoldii',
        image: 'images/rafflesia-arnoldii.jpg'
    },
    {
        question: 'In America, about 60% of fresh cut flowers come from where?',
        options: ['Wyoming','Florida ','California'],
        answer: 'California',
        image: 'images/poppy.jpg'
    },
    {
        question: 'The Titan Arum is also known as the corpse flower due to it smelling like rotten flesh. What advantage does this have for the flower?',
        options: ['It attracts pollinators','It deters predators','It attracts a mate'],
        answer: 'It attracts pollinators',
        image: 'images/titan-arum.jpg'
    },
    {
        question: 'What happens when you touch the Mimosa Pudica?',
        options: ['You get a rash','It folds up its leaves','It releases an odor'],
        answer: 'It folds up its leaves',
        image: 'images/mimosa-pudica.jpg'
    },
];


let score = 0;
let questionNum = 0;

//when start button is hit, start screen is hidden, question screen is shown, and question is generated
function handleStart(){
    $('.start-btn').on('click', function(event){
        $('.start-screen').addClass('hidden');
        $('.question-screen').removeClass('hidden');
        $('.progress').removeClass('hidden');
        populateQuestion();
    });
}

//populates form with next question data
function populateQuestion(){
    let currentQuestion = STORE[questionNum];
    let currentOptions = currentQuestion.options;
    let currentOptionsHtml = [];

    //required not working
    for(let i=0; i<currentOptions.length; i++){
        currentOptionsHtml.push(`<input type="radio" required name="option" id="option-${i+1}" value="${currentOptions[i]}">\
                                 <label for="option-${i+1}">${currentOptions[i]}</label><br />`);
    }

    $('.question').text(currentQuestion.question);
    $('.options').html(currentOptionsHtml);

}


function handleSubmit(){
    $('.submit-btn').on('click', function(event){
        event.preventDefault();
        $('.question-screen').addClass('hidden');
        $('.answer-screen').removeClass('hidden');
        populateAnswer($('input[name=option]:checked').val());
    });
}

function populateAnswer(answerChoice){
    let currentQuestion = STORE[questionNum];
    console.log(currentQuestion.answer);
    if(currentQuestion.answer === answerChoice) {
        $('.answer-result').text('Correct!');
        updateScore();
    }
    else $('.answer-result').text('Wrong!');
    $('.answer-image').attr('src',currentQuestion.image);
    $('.answer-image').attr('alt',currentQuestion.image.slice(7, currentQuestion.image.length-3));
    $('.answer-text').text(currentQuestion.answer);
}

function handleNext(){
    $('.next-btn').on('click', function(event){
        $('.answer-screen').addClass('hidden');
        if(questionNum==9){
            showResult();
        }
        else{
            updateQuestionNum()
            $('.question-screen').removeClass('hidden');
            populateQuestion();
        }
        
    });
}

function showResult(){
    $('.result-screen').removeClass('hidden');
    $('.progress').addClass('hidden');
    $('.final-score').text(`${score}/10`)
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
        $('.result-screen').addClass('hidden');
        $('.start-screen').removeClass('hidden');
        resetQuiz();
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