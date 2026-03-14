const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const resultDescriptionEl = document.getElementById('result-description');

// 질문을 서술문으로 변경하고, 각 질문이 어떤 특성을 측정하는지 표시합니다.
const questions = [
    { statement: '나는 파티에서 낯선 사람들과도 쉽게 어울린다.', trait: 'E' },
    { statement: '나는 현실적인 문제 해결에 더 집중하는 편이다.', trait: 'S' },
    { statement: '나는 결정을 내릴 때 감정적인 측면을 중요하게 생각한다.', trait: 'F' },
    { statement: '나는 계획을 세우고 그에 따라 행동하는 것을 선호한다.', trait: 'J' },
    { statement: '나는 대화할 때 주로 듣는 쪽이다.', trait: 'I' },
    { statement: '나는 미래의 가능성과 추상적인 아이디어에 더 끌린다.', trait: 'N' },
    { statement: '나는 논리적이고 객관적인 분석을 통해 결정을 내린다.', trait: 'T' },
    { statement: '나는 즉흥적이고 유연하게 상황에 대처하는 것을 즐긴다.', trait: 'P' },
    { statement: '나는 새로운 사람들을 만나는 것을 즐긴다.', trait: 'E' },
    { statement: '나는 구체적인 사실과 경험에 대해 이야기하는 것을 좋아한다.', trait: 'S' },
    { statement: '나는 다른 사람의 감정에 공감하고 그들의 입장을 고려하려 노력한다.', trait: 'F' },
    { statement: '나는 일을 시작하기 전에 여러 가능성을 열어두는 편이다.', trait: 'P' }
];

// 5가지 선택지와 각 선택지에 대한 점수
const answerOptions = [
    { text: '매우 그렇지 않다', value: -2 },
    { text: '그렇지 않다', value: -1 },
    { text: '보통이다', value: 0 },
    { text: '그렇다', value: 1 },
    { text: '매우 그렇다', value: 2 },
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
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
const opposites = { E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J' };

startBtn.addEventListener('click', startTest);

function startTest() {
    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.statement;
    answersEl.innerHTML = '';

    answerOptions.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = option.text;
        button.addEventListener('click', () => selectAnswer(question.trait, option.value));
        answersEl.appendChild(button);
    });
}

function selectAnswer(trait, value) {
    if (value > 0) {
        scores[trait] += value;
    } else if (value < 0) {
        scores[opposites[trait]] += Math.abs(value);
    }

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
    result += scores.E > scores.I ? 'E' : 'I';
    result += scores.S > scores.N ? 'S' : 'N';
    result += scores.T > scores.F ? 'T' : 'F';
    result += scores.J > scores.P ? 'J' : 'P';

    resultEl.textContent = result;
    resultDescriptionEl.textContent = personalityTypes[result];
}
