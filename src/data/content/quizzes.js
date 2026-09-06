export const quizzes = [
  {
    id: "quiz_water_01",
    grade: 3,
    subjectId: "evs",
    chapterId: "water",
    title: {
      en: "Water Quiz",
      hi: "जल प्रश्नोत्तरी",
      sat: "Water Quiz"
    },
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: {
          en: "Which of these is a source of water?",
          hi: "इनमें से जल का स्रोत कौन सा है?",
          sat: "Which is a source of water?"
        },
        options: [
          {
            id: "a",
            text: {
              en: "River",
              hi: "नदी",
              sat: "River"
            }
          },
          {
            id: "b",
            text: {
              en: "Chair",
              hi: "कुर्सी",
              sat: "Chair"
            }
          }
        ],
        correctAnswer: "a"
      }
    ]
  }
];
