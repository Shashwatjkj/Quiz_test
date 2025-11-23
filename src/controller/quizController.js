import fs from "fs";
import path from "path";

const serveQuiz = (req, res) => {
  try {
    const jsonPath = path.join(process.cwd(), "src", "data", "quiz.json");
    const quizData = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    return res.status(200).json({
      status: "success",
      timer: "00:00",
      quiz_id: quizData.quiz_id,
      questions: quizData.questions
    });

  } catch (error) {
    console.error("Error loading quiz JSON:", error);
    return res.status(500).json({
      status: "error",
      message: "Unable to load quiz data"
    });
  }
};



const submitQuiz = (req, res) => {
  try {
    const { student_id, quiz_id, answers, focus_minutes } = req.body;

    // Validate request body
    if (!student_id || !quiz_id || !answers || focus_minutes === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields"
      });
    }

    // Load quiz questions JSON
    const questionsPath = path.join(process.cwd(), "src", "data", "quiz.json");
    const quizData = JSON.parse(fs.readFileSync(questionsPath, "utf8"));

    if (quizData.quiz_id !== quiz_id) {
      return res.status(404).json({
        status: "error",
        message: "Quiz not found"
      });
    }

    // Load correct answers JSON
    const correctPath = path.join(process.cwd(), "src", "data", "correctAnswers.json");
    const correctData = JSON.parse(fs.readFileSync(correctPath, "utf8"));
    const correctAnswers = correctData.correct_answers;

    // Calculate score
    let score = 0;
    answers.forEach((submitted) => {
      const correctEntry = correctAnswers.find(q => q.question_id === submitted.question_id);
      if (correctEntry && correctEntry.correct === submitted.answer) {
        score++;
      }
    });

    const totalQuestions = correctAnswers.length;

    // === RULE IMPLEMENTATION ===
    let evaluation = "";
    if (score > 5 && focus_minutes <= 30) {
      evaluation = "success";
    } else {
      evaluation = "fail";
    }

    // Final response
    return res.status(200).json({
      status: evaluation,
      message: evaluation === "success" ? "Performance satisfactory" : "Performance low",
      student_id,
      quiz_id,
      score,
      total: totalQuestions,
      focus_minutes
    });

  } catch (error) {
    console.error("Error evaluating quiz:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};



export{
    serveQuiz,
    submitQuiz
}