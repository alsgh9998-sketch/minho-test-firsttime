const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const resultDescriptionEl = document.getElementById('result-description');
const characterImageEl = document.getElementById('character-image');
const characterNameEl = document.getElementById('character-name');
const progressBar = document.querySelector('.progress');

const questions = [
    // E/I
    { statement: '연인과 함께하는 사교 모임에 나가는 것을 즐긴다.', trait: 'E' },
    { statement: '연인과 단둘이 보내는 시간이 더 소중하다.', trait: 'I' },
    { statement: '힘든 일이 있을 때, 연인과 대화하며 풀고 싶다.', trait: 'E' },
    { statement: '혼자만의 시간을 통해 재충전해야 연인에게 더 집중할 수 있다.', trait: 'I' },
    { statement: '연인과 함께 새로운 사람들을 만나는 데 에너지를 얻는다.', trait: 'E' },
    { statement: '갈등이 생겼을 때, 바로 대화하기보다 혼자 생각할 시간이 필요하다.', trait: 'I' },

    // S/N
    { statement: '연인과의 기념일은 구체적이고 실용적인 선물로 챙기고 싶다.', trait: 'S' },
    { statement: '연인에게 상상력을 자극하는 로맨틱한 데이트를 계획해주고 싶다.', trait: 'N' },
    { statement: '연인과의 대화에서 현실적인 문제 해결에 집중한다.', trait: 'S' },
    { statement: '연인과 미래에 대한 가능성과 꿈에 대해 이야기하는 것을 즐긴다.', trait: 'N' },
    { statement: '연인의 말을 있는 그대로 받아들인다.', trait: 'S' },
    { statement: '연인의 말에 숨겨진 의미나 감정을 파악하려고 노력한다.', trait: 'N' },

    // T/F
    { statement: '연인이 힘들어할 때, 감정적인 위로보다 실질적인 해결책을 제시한다.', trait: 'T' },
    { statement: '연인이 힘들어할 때, 먼저 그의 감정을 공감하고 위로해준다.', trait: 'F' },
    { statement: '연인과의 갈등 상황에서 논리적으로 잘잘못을 따지는 편이다.', trait: 'T' },
    { statement: '연인과의 관계에서 조화를 유지하는 것이 더 중요하다.', trait: 'F' },
    { statement: '연인에게 객관적인 사실에 근거하여 조언한다.', trait: 'T' },
    { statement: '연인의 기분을 상하게 할 수 있는 말은 피하는 편이다.', trait: 'F' },

    // J/P
    { statement: '연인과의 데이트는 미리 계획하고 예약하는 것을 선호한다.', trait: 'J' },
    { statement: '연인과 즉흥적으로 떠나는 여행이나 데이트를 즐긴다.', trait: 'P' },
    { statement: '연인과의 관계에서 예측 가능한 안정감을 중요하게 생각한다.', trait: 'J' },
    { statement: '상황에 따라 유연하게 계획을 변경하는 것을 즐긴다.', trait: 'P' },
    { statement: '연인과의 약속 시간과 계획을 철저하게 지키는 편이다.', trait: 'J' },
    { statement: '정해진 계획 없이 연인과 자유롭게 시간을 보내는 것을 좋아한다.', trait: 'P' },
    { statement: '나는 연인과의 관계에서 주도권을 갖는 편이다.', trait: 'J' }
];

const answerOptions = [
    { text: '매우 그렇지 않다', value: -2 },
    { text: '그렇지 않다', value: -1 },
    { text: '보통이다', value: 0 },
    { text: '그렇다', value: 1 },
    { text: '매우 그렇다', value: 2 },
];

const personalityTypes = {
    ISTJ: { description: '연애에서도 현실적이고 책임감이 강한 당신. 안정적인 관계를 선호하며, 연인에게 헌신적인 모습을 보입니다.', character: '캡틴 아메리카', image: 'https://source.unsplash.com/random/200x200/?hero,leader' },
    ISFJ: { description: '따뜻하고 다정한 마음으로 연인을 보살피는 당신. 연인의 감정을 세심하게 살피고, 안정적인 관계에서 행복을 느낍니다.', character: '샘와이즈 갬지', image: 'https://source.unsplash.com/random/200x200/?loyal,friend' },
    INFJ: { description: '깊이 있고 의미 있는 관계를 추구하는 당신. 연인과 정신적인 교감을 중요하게 생각하며, 이상적인 사랑을 꿈꿉니다.', character: '엘사', image: 'https://source.unsplash.com/random/200x200/?queen,snow' },
    INTJ: { description: '지적인 대화를 즐기며, 연인과 함께 성장하는 관계를 원하는 당신. 독립적이면서도 연인에게는 깊은 신뢰를 보입니다.', character: '타노스', image: 'https://source.unsplash.com/random/200x200/?villain,powerful' },
    ISTP: { description: '자유롭고 즉흥적인 연애를 즐기는 당신. 연인과 함께 새로운 경험을 하는 것을 좋아하며, 구속받는 것을 싫어합니다.', character: '블랙 위도우', image: 'https://source.unsplash.com/random/200x200/?spy,assassin' },
    ISFP: { description: '섬세하고 감성적인 당신. 연인에게 다정하고 따뜻한 모습을 보이며, 현재의 감정에 충실한 연애를 합니다.', character: '벨', image: 'https://source.unsplash.com/random/200x200/?princess,book' },
    INFP: { description: '낭만적이고 이상적인 사랑을 꿈꾸는 당신. 연인과 깊은 유대감을 형성하고 싶어하며, 진실된 사랑을 중요하게 생각합니다.', character: '에리얼', image: 'https://source.unsplash.com/random/200x200/?mermaid,dreamer' },
    INTP: { description: '지적인 호기심을 공유할 수 있는 연인을 찾는 당신. 솔직하고 논리적인 대화를 선호하며, 연인의 지적인 면에 매력을 느낍니다.', character: '셜록 홈즈', image: 'https://source.unsplash.com/random/200x200/?detective,mystery' },
    ESTP: { description: '스릴 넘치고 활기찬 연애를 즐기는 당신. 연인과 함께 다양한 활동을 하는 것을 좋아하며, 지루한 것을 싫어합니다.', character: '토니 스타크', image: 'https://source.unsplash.com/random/200x200/?billionaire,hero' },
    ESFP: { description: '재치 있고 사교적인 당신. 연인에게 즐거움을 선사하며, 함께하는 모든 순간을 특별하게 만들고 싶어합니다.', character: '지니', image: 'https://source.unsplash.com/random/200x200/?magic,lamp' },
    ENFP: { description: '열정적이고 창의적인 당신. 연인에게 끊임없이 애정을 표현하고, 긍정적인 에너지를 불어넣어 줍니다.', character: '스파이더맨', image: 'https://source.unsplash.com/random/200x200/?superhero,web' },
    ENTP: { description: '재치 있는 대화와 토론을 즐기는 당신. 연인과 지적인 자극을 주고받는 관계를 선호하며, 유머 감각이 뛰어납니다.', character: '조커', image: 'https://source.unsplash.com/random/200x200/?clown,villain' },
    ESTJ: { description: '책임감이 강하고 계획적인 당신. 연인과의 관계를 안정적으로 이끌어가며, 신뢰를 중요하게 생각합니다.', character: '헤르미온느', image: 'https://source.unsplash.com/random/200x200/?student,magic' },
    ESFJ: { description: '친절하고 사교적인 당신. 연인의 필요를 먼저 생각하고, 주변 사람들에게도 연인을 자랑하고 싶어합니다.', character: '신데렐라', image: 'https://source.unsplash.com/random/200x200/?princess,cinderella' },
    ENFJ: { description: '따뜻한 마음으로 연인을 이끌어주는 당신. 연인의 성장을 돕고, 함께 더 나은 미래를 만들어가고 싶어합니다.', character: '모아나', image: 'https://source.unsplash.com/random/200x200/?voyager,ocean' },
    ENTJ: { description: '목표 지향적이고 자신감 넘치는 당신. 연인과 함께 미래를 계획하고, 서로에게 최고의 파트너가 되기를 원합니다.', character: '닉 퓨리', image: 'https://source.unsplash.com/random/200x200/?director,agent' },
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
    updateProgress();
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

    const personality = personalityTypes[result];

    resultEl.textContent = result;
    resultDescriptionEl.textContent = personality.description;
    characterImageEl.src = personality.image;
    characterImageEl.alt = personality.character;
    characterNameEl.textContent = personality.character;
}

function updateProgress() {
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}
