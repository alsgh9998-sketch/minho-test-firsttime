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
        question: '파티에 갔을 때 당신은...',
        answers: [
            { text: '낯선 사람을 포함하여 많은 사람들과 교류합니다', type: 'E' },
            { text: '알고 지내는 몇몇 사람들과 교류합니다', type: 'I' },
        ],
    },
    {
        question: '당신은 더...',
        answers: [
            { text: '현실적이기보다는 사색적입니다', type: 'S' },
            { text: '사색적이기보다는 현실적입니다', type: 'N' },
        ],
    },
    {
        question: '당신은 더...',
        answers: [
            { text: '냉철하기보다는 다정합니다', type: 'F' },
            { text: '다정하기보다는 냉철합니다', type: 'T' },
        ],
    },
    {
        question: '당신은 ...을 선호합니다',
        answers: [
            { text: '빠른 결정을 내리는 것', type: 'J' },
            { text: '결정을 미루는 것', type: 'P' },
        ],
    },
        {
        question: '여러 사람들과 함께 있을 때 당신은...',
        answers: [
            { text: '말을 더 많이 하는 경향이 있습니다', type: 'E' },
            { text: '더 많이 듣는 경향이 있습니다', type: 'I' },
        ],
    },
    {
        question: '당신은 ...에 더 관심이 있습니다',
        answers: [
            { text: '실제적인 것', type: 'S' },
            { text: '가능성 있는 것', type: 'N' },
        ],
    },
    {
        question: '판단을 내릴 때 당신은 더 자주 ...에 의존합니다',
        answers: [
            { text: '당신의 마음', type: 'F' },
            { text: '당신의 머리', type: 'T' },
        ],
    },
    {
        question: '당신은 ...에 더 편안함을 느낍니다',
        answers: [
            { text: '완성된 제품', type: 'J' },
            { text: '진행 중인 작업', type: 'P' },
        ],
    },
    {
        question: '당신은...',
        answers: [
            { text: '알아가기 쉬운 사람입니다', type: 'E' },
            { text: '알아가기 어려운 사람입니다', type: 'I' },
        ],
    },
    {
        question: '당신은 ...에 대해 이야기하는 것을 선호합니다',
        answers: [
            { text: '구체적인 것', type: 'S' },
            { text: '개념적인 것', type: 'N' },
        ],
    },
    {
        question: '당신은 ...에 더 설득됩니다',
        answers: [
            { text: '감동적인 호소', type: 'F' },
            { text: '논리적인 주장', type: 'T' },
        ],
    },
    {
        question: '당신은 ...을 선호합니다',
        answers: [
            { text: '정해지고 결정된 것', type: 'J' },
            { text: '변화에 열려 있는 것', type: 'P' },
        ],
    },
];

const personalityTypes = {
    ISTJ: '청렴결백한 논리주의자: 내향적이고 현실적이며, 충실하고 질서정然하며 전통을 중시하는 경향이 있습니다.',
    ISFJ: '용감한 수호자: 따뜻한 마음과 헌신적인 태도로, 자신이 아끼는 사람들을 항상 보호할 준비가 되어 있습니다.',
    INFJ: '선의의 옹호자: 조용하고 신비로우면서도, 매우 영감을 주고 지칠 줄 모르는 이상주의자입니다.',
    INTJ: '용의주도한 전략가: 상상력이 풍부하고 전략적인 사상가로, 모든 것에 대한 계획을 가지고 있습니다.',
    ISTP: '만능 재주꾼: 대담하고 현실적인 실험가로, 모든 종류의 도구에 능숙합니다.',
    ISFP: '호기심 많은 예술가: 유연하고 매력적이며, 항상 새로운 것을 탐험하고 경험할 준비가 되어 있습니다.',
    INFP: '열정적인 중재자: 시적이고 친절하며 이타적인 사람들로, 항상 좋은 명분을 돕고 싶어합니다.',
    INTP: '논리적인 사색가: 지식에 대한 갈증이 끊이지 않는 혁신적인 발명가입니다.',
    ESTP: '모험을 즐기는 사업가: 똑똑하고 활기차며 매우 통찰력 있는 사람들로, 벼랑 끝에서 사는 것을 진정으로 즐깁니다.',
    ESFP: '자유로운 영혼의 연예인: 즉흥적이고 활기차며 열정적인 사람들 - 그들 주변의 삶은 결코 지루하지 않습니다.',
    ENFP: '재기발랄한 활동가: 열정적이고 창의적이며 사교적인 자유로운 영혼으로, 항상 웃을 이유를 찾을 수 있습니다.',
    ENTP: '뜨거운 논쟁을 즐기는 변론가: 지적 도전을 거부할 수 없는 똑똑하고 호기심 많은 사상가입니다.',
    ESTJ: '엄격한 관리자: 뛰어난 관리자로, 사물이나 사람을 관리하는 데 있어 타의 추종을 불허합니다.',
    ESFJ: '사교적인 외교관: 유난히 배려심이 많고 사교적이며 인기가 많은 사람들로, 항상 기꺼이 돕습니다.',
    ENFJ: '정의로운 사회운동가: 카리스마 있고 영감을 주는 리더로, 청중을 매료시킬 수 있습니다.',
    ENTJ: '대담한 통솔자: 대담하고 상상력이 풍부하며 의지가 강한 리더로, 항상 길을 찾거나 만들어냅니다.',
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
