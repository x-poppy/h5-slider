
// 分组能力
const GROUP_NAMES = ['知觉辨别', '类同比较', '比较推理', '系列关系', '抽象推理'];

// 正确答案
const RIGHT_ANSWERS = [
  //1    2    3    4    5    6    7    8    9   10    11  12 
  'D', 'E', 'A', 'B', 'F', 'C', 'F', 'B', 'A', 'C', 'D', 'E',
  //13   14   15   16   17   18   19   20   21  22    23  24 
  'B', 'F', 'A', 'B', 'A', 'C', 'E', 'F', 'D', 'C', 'D', 'E',
  //25   26   27   28   29   30   31   32   33  34    35  36 
  'H', 'B', 'C', 'H', 'G', 'D', 'E', 'A', 'G', 'F', 'A', 'B',
  //37   38   39   40   41   42   43   44   45  46    47  48 
  'C', 'D', 'C', 'G', 'H', 'F', 'E', 'D', 'A', 'B', 'E', 'F',
  //49   50   51   52   53   54   55   56   57  58    59  60 
  'G', 'F', 'H', 'B', 'A', 'E', 'A', 'F', 'C', 'B', 'D', 'E',
];

// 按分组划分的二维数组
const RIGHT_ANSWER_GROUPS = [];
RIGHT_ANSWER_GROUPS.push(RIGHT_ANSWERS.splice(0, 13));
RIGHT_ANSWER_GROUPS.push(RIGHT_ANSWERS.splice(13, 25));
RIGHT_ANSWER_GROUPS.push(RIGHT_ANSWERS.splice(25, 37));
RIGHT_ANSWER_GROUPS.push(RIGHT_ANSWERS.splice(37, 49));
RIGHT_ANSWER_GROUPS.push(RIGHT_ANSWERS.splice(49, 60));

// IQ智商得分算法
const IQ_SOURCE = [
    {
        min: 0, // >=
        max: 0.03, // <
        scoreRange: '0-69',
        levelText: '低能',
        levelType: 'A',
        formula: x => Math.floor(x / 0.03 * 70),
    },
    {
        min: 0.03, // >=
        max: 0.09, // <
        scoreRange: '70-79',
        levelText: '迟钝',
        levelType: 'B',
        formula: x => Math.floor(70 + (x - 0.03) / (0.09 - 0.03) * (79 - 70)),
    },
    {
        min: 0.09, // >=
        max: 0.25, // <
        scoreRange: '80-89',
        levelText: '中下',
        levelType: 'C',
        formula: x => Math.floor(80 + (x - 0.09) / (0.25 - 0.09) * (89 - 80)),
    },
    {
        min: 0.25, // >=
        max: 0.5, // <
        scoreRange: '90-109',
        levelText: '中等',
        levelType: 'D',
        formula: x => Math.floor(90 + (x - 0.25) / (0.5 - 0.25) * (109 - 90)),
    },
    {
        min: 0.5, // >=
        max: 0.75, // <
        scoreRange: '110-119',
        levelText: '中上',
        levelType: 'E',
        formula: x => Math.floor(110 + (x - 0.5) / (0.75 - 0.5) * (119 - 110)),
    },
    {
        min: 0.75, // >=
        max: 0.99, // <
        scoreRange: '120-129',
        levelText: '优秀',
        levelType: 'F',
        formula: x => Math.floor(120 + (x - 0.75) / (0.99 - 0.75) * (129 - 120)),
    },
    {
        min: 0.99, // >=
        max: 9, // < todo 这里要填一个大于1的值
        scoreRange: '130+',
        levelText: '超优',
        levelType: 'G',
        formula: () => `130+`,
    },
]

const getRightPercent = (x, y) => +(Math.floor(x / y * 100) / 100).toFixed(2)

const getSourceGrade = x => x >= 0 && x < 0.5 ? '差' : x >= 0.5 && x < 0.8 ? '中等' : '高'

const run = (data) => {
    // 格式答题
    const answers = Object
        .keys(data)
        .filter(k => k.startsWith(`Question_`))
        .map(k => {
            const [, q] = k.split('_');
            return { q: +q, a: data[k] }
        });

    // 阅卷
    const reviewAnswer = RIGHT_ANSWER_GROUPS.map(groups => groups.map(a => ({ a })));
    const totalRight = reviewAnswer.flat().filter((item, index) => {
        const answer = answers.find(item => item.q === index + 1);
        return item.r = answer ? answer.a === item.a : false
    }).length

    // 智商得分
    const score = (() => {
        const percent = getRightPercent(totalRight, reviewAnswer.flat().length)
        const { levelText, levelType, formula } = IQ_SOURCE.find(item => item.min <= percent && percent < item.max)
        const scoreText = formula(percent)
        return { levelText, levelType, scoreText }
    })()

    // 分组能力
    const groupScores = GROUP_NAMES.map((subject, index) => {
        const groups = reviewAnswer[index]
        const score = groups.filter(item => item.r).length
        const scorePercent = getRightPercent(score, groups.length)
        const grade = getSourceGrade(scorePercent)
        return {
            subject,
            scorePercent,
            score,
            scoreLevelDesc: `${subject}能力：${grade}`,
            scoreDesc: `${subject}: ${score}分 满分(${groups.length})分`
        }
    })

    return {
        score,
        groupScores,
        answers,
    }
}

function convertFenToYuanDesc(amount) {
  return "¥ " + (amount * 0.01).toFixed(2) + " 元";
}

window.slider.once('onStoreDataLoaded', (evt) => {
    const storeData = evt.detail;
    const report = run(JSON.parse(storeData.answer));
    storeData.levelText = report.score.levelText + "";
    storeData.scoreText = report.score.scoreText + "";
    storeData.levelType = report.score.levelType + "";

    storeData.radarData = report.groupScores;
    storeData.reportScoreGroup0Title = report.groupScores[0].scoreDesc;
    storeData.reportScoreGroup0Desc = report.groupScores[0].scoreLevelDesc;

    storeData.reportScoreGroup1Title = report.groupScores[1].scoreDesc;
    storeData.reportScoreGroup1Desc = report.groupScores[1].scoreLevelDesc;

    storeData.reportScoreGroup2Title = report.groupScores[2].scoreDesc;
    storeData.reportScoreGroup2Desc = report.groupScores[2].scoreLevelDesc;

    storeData.reportScoreGroup3Title = report.groupScores[3].scoreDesc;
    storeData.reportScoreGroup3Desc = report.groupScores[3].scoreLevelDesc;

    storeData.reportScoreGroup4Title = report.groupScores[4].scoreDesc;
    storeData.reportScoreGroup4Desc = report.groupScores[4].scoreLevelDesc;

    storeData.reportLock = storeData.payStatus !== "PAY_FINISH";

    // if (report.answers[0].a === 'E') {
      storeData.reportLock = false;
    // }

    storeData.paymentPriceText = convertFenToYuanDesc(storeData.amount);
    storeData.paymentPrice2Text = convertFenToYuanDesc(storeData.amount * 1.8);
});
