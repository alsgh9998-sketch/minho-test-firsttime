const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const resultDescriptionEl = document.getElementById('result-description');

const questions = [
    {
        question: 'You are at a party. You...',
        answers: [
            { text: 'Interact with many, including strangers', type: 'E' },
            { text: 'Interact with a few, known to you', type: 'I' },
        ],
    },
    {
        question: 'You are more...',
        answers: [
            { text: 'Realistic than speculative', type: 'S' },
            { text: 'Speculative than realistic', type: 'N' },
        ],
    },
    {
        question: 'You tend to be more...',
        answers: [
            { text: 'Tender-hearted than tough-minded', type: 'F' },
            { text: 'Tough-minded than tender-hearted', type: 'T' },
        ],
    },
    {
        question: 'You prefer to...',
        answers: [
            { text: 'Make decisions quickly', type: 'J' },
            { text: 'Postpone making decisions', type: 'P' },
        ],
    },
        {
        question: 'When you are with a group of people, you...',
        answers: [
            { text: 'Tend to talk more', type: 'E' },
            { text: 'Tend to listen more', type: 'I' },
        ],
    },
    {
        question: 'You are more interested in...',
        answers: [
            { text: 'What is actual', type: 'S' },
            { text: 'What is possible', type: 'N' },
        ],
    },
    {
        question: 'In making judgments, you more often trust...',
        answers: [
            { text: 'Your heart', type: 'F' },
            { text: 'Your head', type: 'T' },
        ],
    },
    {
        question: 'You are more comfortable with...',
        answers: [
            { text: 'A finished product', type: 'J' },
            { text: 'A work in progress', type: 'P' },
        ],
    },
    {
        question: 'You are...',
        answers: [
            { text: 'Easy to get to know', type: 'E' },
            { text: 'Hard to get to know', type: 'I' },
        ],
    },
    {
        question: 'You prefer to talk about...',
        answers: [
            { text: 'Specifics', type: 'S' },
            { text: 'Concepts', type: 'N' },
        ],
    },
    {
        question: 'You are more convinced by...',
        answers: [
            { text: 'A touching appeal', type: 'F' },
            { text: 'A logical argument', type: 'T' },
        ],
    },
    {
        question: 'You prefer to have...',
        answers: [
            { text: 'Things settled and decided', type: 'J' },
            { text: 'Things open to change', type: 'P' },
        ],
    },
];

const personalityTypes = {
    ISTJ: 'The Inspector: Reserved and practical, they tend to be loyal, orderly, and traditional.',
    ISFJ: 'The Protector: Warm-hearted and dedicated, they are always ready to protect the people they care about.',
    INFJ: 'The Advocate: Quiet and mystical, yet very inspiring and tireless idealists.',
    INTJ: 'The Architect: Imaginative and strategic thinkers, with a plan for everything.',
    ISTP: 'The Crafter: Bold and practical experimenters, masters of all kinds of tools.',
    ISFP: 'The Artist: Flexible and charming, always ready to explore and experience something new.',
    INFP: 'The Mediator: Poetic, kind, and altruistic people, always eager to help a good cause.',
    INTP: 'The Thinker: Innovative inventors with an unquenchable thirst for knowledge.',
    ESTP: 'The Persuader: Smart, energetic, and very perceptive people, who truly enjoy living on the edge.',
    ESFP: 'The Entertainer: Spontaneous, energetic, and enthusiastic people - life is never boring around them.',
    ENFP: 'The Champion: Enthusiastic, creative, and sociable free spirits, who can always find a reason to smile.',
    ENTP: 'The Debater: Smart and curious thinkers who cannot resist an intellectual challenge.',
    ESTJ: 'The Director: Excellent administrators, unsurpassed at managing things - or people.',
    ESFJ: 'The Caregiver: Extraordinarily caring, social, and popular people, always eager to help.',
    ENFJ: 'The Giver: Charismatic and inspiring leaders, able to mesmerize their listeners.',
    ENTJ: 'The Commander: Bold, imaginative and strong-willed leaders, always finding a way - or making one.',
};

let currentQuestionIndex = 0;
let answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

startBtn.addEventListener('click', startTest);

function startTest() {
    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    answersEl.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = answer.text;
        button.addEventListener('click', () => selectAnswer(answer.type));
        answersEl.appendChild(button);
    });
}

function selectAnswer(type) {
    answers[type]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionScreen.classList.remove('active');
    resultScreen.classList.add('active');

    let result = '';
    result += answers.E > answers.I ? 'E' : 'I';
    result += answers.S > answers.N ? 'S' : 'N';
    result += answers.T > answers.F ? 'T' : 'F';
    result += answers.J > answers.P ? 'J' : 'P';

    resultEl.textContent = result;
    resultDescriptionEl.textContent = personalityTypes[result];
}
