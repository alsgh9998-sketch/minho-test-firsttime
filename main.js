const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultEl = document.getElementById('result');
const resultDescriptionEl = document.getElementById('result-description');
const progressBar = document.querySelector('.progress');
const scoreValuesEl = document.getElementById('score-values');
const goodMatchEl = document.getElementById('good-match');
const badMatchEl = document.getElementById('bad-match');

const questions = [
    // E/I
    { statement: '연인과 함께하는 사교 모임에 나가는 것을 즐긴다.', trait: 'E' },
    { statement: '연인과 단둘이 보내는 시간이 더 소중하다.', trait: 'I' },
    { statement: '힘든 일이 있을 때, 연인과 대화하며 풀고 싶다.', trait: 'E' },
    { statement: '혼자만의 시간을 통해 재충전해야 연인에게 더 집중할 수 있다.', trait: 'I' },

    // S/N
    { statement: '연인과의 기념일은 구체적이고 실용적인 선물로 챙기고 싶다.', trait: 'S' },
    { statement: '연인에게 상상력을 자극하는 로맨틱한 데이트를 계획해주고 싶다.', trait: 'N' },
    { statement: '연인과의 대화에서 현실적인 문제 해결에 집중한다.', trait: 'S' },
    { statement: '연인과 미래에 대한 가능성과 꿈에 대해 이야기하는 것을 즐긴다.', trait: 'N' },

    // T/F
    { statement: '연인이 힘들어할 때, 감정적인 위로보다 실질적인 해결책을 제시한다.', trait: 'T' },
    { statement: '연인이 힘들어할 때, 먼저 그의 감정을 공감하고 위로해준다.', trait: 'F' },
    { statement: '연인과의 갈등 상황에서 논리적으로 잘잘못을 따지는 편이다.', trait: 'T' },
    { statement: '연인과의 관계에서 조화를 유지하는 것이 더 중요하다.', trait: 'F' },

    // J/P
    { statement: '연인과의 데이트는 미리 계획하고 예약하는 것을 선호한다.', trait: 'J' },
    { statement: '연인과 즉흥적으로 떠나는 여행이나 데이트를 즐긴다.', trait: 'P' },
    { statement: '연인과의 관계에서 예측 가능한 안정감을 중요하게 생각한다.', trait: 'J' },
    { statement: '상황에 따라 유연하게 계획을 변경하는 것을 즐긴다.', trait: 'P' }
];

const answerOptions = [
    { text: '전혀 그렇지 않다', value: 0 },
    { text: '그렇지 않다', value: 1 },
    { text: '보통이다', value: 2 },
    { text: '그렇다', value: 3 },
    { text: '매우 그렇다', value: 4 },
];

const personalityTypes = {
    ISTJ: {
        description: "당신은 연애에 있어 현실적이고 책임감이 강한 유형입니다. 안정적인 관계를 선호하며, 연인에게 헌신적인 모습을 보입니다. 말보다는 행동으로 사랑을 표현하는 편이며, 계획적인 데이트를 통해 안정감을 느낍니다.",
        good_match: {
            type: "ESFP",
            description: "활동적이고 즉흥적인 ESFP는 당신에게 새로운 즐거움을 선사하고, 당신의 계획적인 면모는 ESFP에게 안정감을 줄 수 있습니다."
        },
        bad_match: {
            type: "INFP",
            description: "이상적이고 감성적인 INFP와는 현실적인 가치관 차이로 갈등을 겪을 수 있습니다."
        }
    },
    ISFJ: {
        description: "따뜻하고 다정한 마음으로 연인을 보살피는 당신. 연인의 감정을 세심하게 살피고, 안정적인 관계에서 행복을 느낍니다. 연인을 위해 헌신하는 것을 기쁨으로 여기며, 조용하고 편안한 데이트를 즐깁니다.",
        good_match: {
            type: "ESTP",
            description: "모험을 즐기는 ESTP는 당신의 일상에 활력을 불어넣어 주고, 당신의 다정함은 ESTP에게 따뜻한 안식처가 될 수 있습니다."
        },
        bad_match: {
            type: "INTP",
            description: "논리적이고 무심한 INTP의 모습에 상처받을 수 있으며, 감정적인 교감을 중요시하는 당신과는 다른 소통 방식을 가지고 있습니다."
        }
    },
    INFJ: {
        description: "깊이 있고 의미 있는 관계를 추구하는 당신. 연인과 정신적인 교감을 중요하게 생각하며, 이상적인 사랑을 꿈꿉니다. 연인의 내면을 이해하고 지지해주며, 함께 성장하는 관계를 원합니다.",
        good_match: {
            type: "ENFP",
            description: "열정적이고 창의적인 ENFP와 함께 있으면 서로에게 영감을 주며, 끊임없이 새롭고 흥미로운 관계를 만들어갈 수 있습니다."
        },
        bad_match: {
            type: "ISTP",
            description: "즉흥적이고 현실적인 ISTP와는 깊은 관계 형성에 어려움을 느낄 수 있으며, 가치관의 차이가 클 수 있습니다."
        }
    },
    INTJ: {
        description: "지적인 대화를 즐기며, 연인과 함께 성장하는 관계를 원하는 당신. 독립적이면서도 연인에게는 깊은 신뢰를 보입니다. 논리적인 대화를 통해 서로를 알아가는 것을 즐기며, 감정 표현에는 다소 서툴 수 있습니다.",
        good_match: {
            type: "ENTP",
            description: "지적 호기심이 왕성한 ENTP와는 끝없는 토론과 아이디어 공유를 통해 서로의 지적 갈증을 해소시켜주는 최고의 파트너가 될 수 있습니다."
        },
        bad_match: {
            type: "ISFP",
            description: "감성적이고 즉흥적인 ISFP의 행동을 이해하기 어려울 수 있으며, 당신의 직설적인 화법이 상대방에게 상처를 줄 수 있습니다."
        }
    },
    ISTP: {
        description: "자유롭고 즉흥적인 연애를 즐기는 당신. 연인과 함께 새로운 경험을 하는 것을 좋아하며, 구속받는 것을 싫어합니다. 스릴 넘치는 활동이나 즉흥적인 여행을 통해 연인과 가까워지는 것을 즐깁니다.",
        good_match: {
            type: "ESFJ",
            description: "사교적이고 따뜻한 ESFJ는 당신의 자유로운 영혼을 이해해주고, 당신에게 필요한 사회적 관계를 맺는 데 도움을 줄 수 있습니다."
        },
        bad_match: {
            type: "INFJ",
            description: "깊고 의미 있는 관계를 추구하는 INFJ와는 관계의 깊이에 대한 의견 차이가 있을 수 있으며, 당신의 무심함이 상대에게 상처를 줄 수 있습니다."
        }
    },
    ISFP: {
        description: "섬세하고 감성적인 당신. 연인에게 다정하고 따뜻한 모습을 보이며, 현재의 감정에 충실한 연애를 합니다. 예술적인 활동이나 아름다운 풍경을 함께 즐기며, 감성적인 교감을 중요하게 생각합니다.",
        good_match: {
            type: "ENFJ",
            description: "당신의 예술적 감성을 이해하고 지지해주는 ENFJ와 함께라면 안정감과 행복을 느낄 수 있습니다. ENFJ의 따뜻한 리더십이 당신의 잠재력을 이끌어낼 수 있습니다."
        },
        bad_match: {
            type: "INTJ",
            description: "논리적이고 계획적인 INTJ의 모습에 거리감을 느낄 수 있으며, 당신의 감성적인 면을 이해받지 못한다고 느낄 수 있습니다."
        }
    },
    INFP: {
        description: "낭만적이고 이상적인 사랑을 꿈꾸는 당신. 연인과 깊은 유대감을 형성하고 싶어하며, 진실된 사랑을 중요하게 생각합니다. 영화나 소설 같은 사랑을 꿈꾸며, 연인에게 헌신적인 모습을 보입니다.",
        good_match: {
            type: "ENFJ",
            description: "따뜻하고 적극적인 ENFJ는 당신의 이상적인 사랑을 현실로 만들어 줄 수 있는 최고의 파트너입니다. 당신의 섬세한 감정을 이해하고 지지해 줄 것입니다."
        },
        bad_match: {
            type: "ESTJ",
            description: "현실적이고 직설적인 ESTJ와는 가치관 차이로 힘들 수 있습니다. 당신의 이상적인 가치관이 현실의 벽에 부딪힐 수 있습니다."
        }
    },
    INTP: {
        description: "지적인 호기심을 공유할 수 있는 연인을 찾는 당신. 솔직하고 논리적인 대화를 선호하며, 연인의 지적인 면에 매력을 느낍니다. 독특하고 창의적인 데이트를 즐기며, 서로의 아이디어를 공유하는 것을 좋아합니다.",
        good_match: {
            type: "ENTJ",
            description: "지적이고 야망 있는 ENTJ와는 서로의 성장을 돕는 이상적인 파트너가 될 수 있습니다. 끝없는 지적 토론을 통해 서로에게 영감을 줄 것입니다."
        },
        bad_match: {
            type: "ESFJ",
            description: "사교적이고 감정적인 ESFJ의 관심과 애정 표현이 부담스럽게 느껴질 수 있으며, 서로의 우선순위가 달라 갈등을 겪을 수 있습니다."
        }
    },
    ESTP: {
        description: "스릴 넘치고 활기찬 연애를 즐기는 당신. 연인과 함께 다양한 활동을 하는 것을 좋아하며, 지루한 것을 싫어합니다. 스포츠나 액티비티를 함께 즐기며, 에너지를 발산하는 데이트를 선호합니다.",
        good_match: {
            type: "ISFJ",
            description: "당신의 넘치는 에너지를 따뜻하게 감싸주는 ISFJ와 안정적인 관계를 만들어갈 수 있습니다. 당신의 모험에 든든한 지지자가 되어줄 것입니다."
        },
        bad_match: {
            type: "INFP",
            description: "섬세하고 이상적인 INFP의 감성을 이해하기 어려울 수 있으며, 당신의 직설적인 행동이 상대에게 상처를 줄 수 있습니다."
        }
    },
    ESFP: {
        description: "재치 있고 사교적인 당신. 연인에게 즐거움을 선사하며, 함께하는 모든 순간을 특별하게 만들고 싶어합니다. 파티나 모임에 함께 참여하며, 사람들과 어울리는 것을 즐깁니다.",
        good_match: {
            type: "ISTJ",
            description: "현실적이고 안정적인 ISTJ는 당신의 즉흥적인 에너지를 긍정적으로 이끌어주고, 함께 즐거운 현실을 만들어갈 수 있습니다."
        },
        bad_match: {
            type: "INFJ",
            description: "깊고 진지한 관계를 원하는 INFJ와는 관계의 깊이에 대한 생각 차이로 갈등이 생길 수 있습니다."
        }
    },
    ENFP: {
        description: "열정적이고 창의적인 당신. 연인에게 끊임없이 애정을 표현하고, 긍정적인 에너지를 불어넣어 줍니다. 새로운 아이디어를 함께 시도하고, 서로에게 영감을 주는 관계를 만들어갑니다.",
        good_match: {
            type: "INFJ",
            description: "당신의 무한한 상상력과 아이디어를 깊이 이해하고 공감해주는 INFJ와 함께라면 세상을 바꾸는 커플이 될 수도 있습니다."
        },
        bad_match: {
            type: "ISTJ",
            description: "현실적이고 계획적인 ISTJ의 모습에 답답함을 느낄 수 있으며, 당신의 즉흥적인 에너지가 무시당한다고 느낄 수 있습니다."
        }
    },
    ENTP: {
        description: "재치 있는 대화와 토론을 즐기는 당신. 연인과 지적인 자극을 주고받는 관계를 선호하며, 유머 감각이 뛰어납니다. 흥미로운 주제에 대해 이야기하며, 서로의 생각에 도전하는 것을 즐깁니다.",
        good_match: {
            type: "INTJ",
            description: "당신의 재치와 아이디어를 높이 평가하고 함께 지적인 탐구를 즐길 수 있는 INTJ는 최고의 파트너입니다."
        },
        bad_match: {
            type: "ISFJ",
            description: "따뜻하고 안정적인 관계를 중요시하는 ISFJ와는 잦은 의견 충돌이 있을 수 있으며, 당신의 장난스러운 도전을 이해하지 못할 수 있습니다."
        }
    },
    ESTJ: {
        description: "책임감이 강하고 계획적인 당신. 연인과의 관계를 안정적으로 이끌어가며, 신뢰를 중요하게 생각합니다. 목표를 함께 세우고 달성하며, 서로에게 든든한 버팀목이 되어주는 관계를 원합니다.",
        good_match: {
            type: "INTP",
            description: "지적이고 논리적인 INTP는 당신의 계획에 대한 훌륭한 조언자가 될 수 있으며, 당신은 INTP의 아이디어를 현실로 만들어 줄 수 있습니다."
        },
        bad_match: {
            type: "INFP",
            description: "감성적이고 이상적인 INFP의 가치관을 이해하기 힘들 수 있으며, 당신의 직설적인 조언이 상대에게 상처가 될 수 있습니다."
        }
    },
    ESFJ: {
        description: "친절하고 사교적인 당신. 연인의 필요를 먼저 생각하고, 주변 사람들에게도 연인을 자랑하고 싶어합니다. 따뜻하고 배려심 넘치는 모습으로 연인을 감동시키며, 안정적인 관계를 만들어갑니다.",
        good_match: {
            type: "ISFP",
            description: "섬세하고 감성적인 ISFP의 예술적 감각을 존중하고, 당신의 따뜻한 배려로 안정감을 줄 수 있습니다."
        },
        bad_match: {
            type: "INTP",
            description: "무심하고 독립적인 INTP의 모습에 서운함을 느낄 수 있으며, 당신의 사회적인 활동에 대한 필요성을 이해받지 못할 수 있습니다."
        }
    },
    ENFJ: {
        description: "따뜻한 마음으로 연인을 이끌어주는 당신. 연인의 성장을 돕고, 함께 더 나은 미래를 만들어가고 싶어합니다. 긍정적인 영향력을 통해 연인에게 영감을 주며, 의미 있는 관계를 만들어갑니다.",
        good_match: {
            type: "INFP",
            description: "당신의 따뜻한 리더십과 INFP의 풍부한 상상력이 만나면 서로에게 무한한 영감을 주는 이상적인 관계가 될 수 있습니다."
        },
        bad_match: {
            type: "ISTP",
            description: "즉흥적이고 개인주의적인 ISTP와는 관계의 방향성에 대한 의견 차이가 있을 수 있으며, 당신의 헌신을 이해하지 못할 수 있습니다."
        }
    },
    ENTJ: {
        description: "목표 지향적이고 자신감 넘치는 당신. 연인과 함께 미래를 계획하고, 서로에게 최고의 파트너가 되기를 원합니다. 서로의 성공을 응원하며, 함께 성장하고 발전하는 관계를 만들어갑니다.",
        good_match: {
            type: "INTP",
            description: "당신의 비전을 이해하고 함께 전략을 세워나갈 수 있는 INTP는 최고의 파트너입니다. 서로의 지적 능력에 감탄하게 될 것입니다."
        },
        bad_match: {
            type: "ISFP",
            description: "감성적이고 현재를 즐기는 ISFP와는 삶의 우선순위가 달라 갈등을 겪을 수 있으며, 당신의 야망을 이해받지 못할 수 있습니다."
        }
    }
};

let currentQuestionIndex = 0;
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

startBtn.addEventListener('click', startTest);

function startTest() {
    currentQuestionIndex = 0;
    scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
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
    scores[trait] += value;
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

    const traitPairs = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']];
    const percentages = {};
    
    traitPairs.forEach(pair => {
        const [trait1, trait2] = pair;
        // There are 2 questions per trait, and the max value for each is 4.
        // So the max score for a single trait (e.g., E) is 2 * 4 = 8.
        // The total max score for a pair (e.g., E + I) is 16.
        const totalScore = scores[trait1] + scores[trait2];
        if (totalScore === 0) {
            percentages[trait1] = 50;
            percentages[trait2] = 50;
        } else {
            percentages[trait1] = Math.round((scores[trait1] / totalScore) * 100);
            percentages[trait2] = 100 - percentages[trait1];
        }
    });

    let result = '';
    result += percentages.E >= 50 ? 'E' : 'I';
    result += percentages.S >= 50 ? 'S' : 'N';
    result += percentages.T >= 50 ? 'T' : 'F';
    result += percentages.J >= 50 ? 'J' : 'P';

    const personality = personalityTypes[result];

    resultEl.textContent = result;
    resultDescriptionEl.textContent = personality.description;
    goodMatchEl.innerHTML = `<h3>천생연분</h3><p><strong>${personality.good_match.type}</strong>: ${personality.good_match.description}</p>`;
    badMatchEl.innerHTML = `<h3>최악의 궁합</h3><p><strong>${personality.bad_match.type}</strong>: ${personality.bad_match.description}</p>`;

    displayScoreValues(percentages);
}

function displayScoreValues(percentages) {
    const traitNameMap = {
        E: '외향', I: '내향', S: '감각', N: '직관',
        T: '사고', F: '감정', J: '판단', P: '인식'
    };

    // Helper function to create a single score bar pair
    const createScoreBar = (trait1, trait2) => {
        const percent1 = percentages[trait1];
        const percent2 = percentages[trait2];

        // Only show percentage if bar is wide enough
        const label1 = percent1 > 15 ? `${percent1}%` : '';
        const label2 = percent2 > 15 ? `${percent2}%` : '';

        return `
            <div class="score-pair">
                <span class="trait-label">${traitNameMap[trait1]}</span>
                <div class="score-bar-container">
                    <div class="score-bar ${trait1.toLowerCase()}-bar" style="width: ${percent1}%">${label1}</div>
                    <div class="score-bar ${trait2.toLowerCase()}-bar" style="width: ${percent2}%">${label2}</div>
                </div>
                <span class="trait-label">${traitNameMap[trait2]}</span>
            </div>
        `;
    };

    let html = `
        ${createScoreBar('E', 'I')}
        ${createScoreBar('S', 'N')}
        ${createScoreBar('T', 'F')}
        ${createScoreBar('J', 'P')}
    `;

    scoreValuesEl.innerHTML = html;
}

function updateProgress() {
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}
