const readlineSync = require("readline-sync");
const kuler = require("kuler"); // ✅ Fixed import

// Ask user name
let userName = readlineSync.question("What's your name? ");
console.log(kuler(\n`Hello ${userName}, welcome to Quizify!`, "#dc2626")); // ✅ Fixed case

console.log(`\nLet's start the quiz, ${userName}!\n`);

const database = {
  data: [
    {
      question:
        "let a = {}, b = {};\nconsole.log(a == b);\nconsole.log(a === b);",
      options: {
        a: "false false",
        b: "true false",
        c: "false true",
        d: "true true",
      },
      correctAnswer: "a",
    },
    {
      question: "object.assign(target, source) creates which type of copy?",
      options: {
        a: "deep copy",
        b: "shallow copy",
        c: "no copy",
        d: "new copy",
      },
      correctAnswer: "b",
    },
    {
      question: "Is method chaining possible with forEach method?",
      options: {
        a: "yes",
        b: "no",
      },
      correctAnswer: "b",
    },
  ],
};

const leaderboard = {
  data: [
    {
      name: "Ankur Kumar Singh",
      score: 2,
    },
    {
      name: "Rahul Kumar",
      score: 3,
    },
    {
      name: "Rajesh Kumar",
      score: 2,
    },
  ],
};

function playgame(userAnswer, correctAnswer) {
  return userAnswer === correctAnswer;
}

function showQuestionAndOptions(database) {
  let score = 0;

  for (let i = 0; i < database.data.length; i++) {
    const item = database.data[i];
    console.log(`\nQ${i + 1}. ${item.question}\n`);

    for (let key in item.options) {
      console.log(`   ${key}: ${item.options[key]}`);
    }

    let userAnswer = readlineSync
      .question("\nEnter your answer (a/b/c/d): ")
      .toLowerCase();

    if (playgame(userAnswer, item.correctAnswer)) {
      console.log(kuler("✅ Correct!\n", "#22c55e"));
      score++;
    } else {
      console.log(
        kuler(
          `❌ Wrong. Correct answer is '${item.correctAnswer}'\n`,
          "#f87171",
        ),
      );
    }
  }

  console.log(
    kuler(`Your final score: ${score}/${database.data.length}`, "#0ea5e9"),
  );
  updateLeaderboard(userName, score);
}

function updateLeaderboard(name, score) {
  leaderboard.data.push({ name: name, score: score });

  // Optional: sort leaderboard in descending order
  leaderboard.data.sort((a, b) => b.score - a.score);

  console.log(kuler("\n🏆 Leaderboard:", "#facc15"));
  leaderboard.data.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.name} - ${entry.score}`);
  });
}

showQuestionAndOptions(database);
