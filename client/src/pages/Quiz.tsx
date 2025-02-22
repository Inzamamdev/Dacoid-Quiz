import { useEffect, useState } from "react";
import Layout from "@/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { saveQuizResult } from "@/lib/utils";

export default function Quiz() {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(
    null
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showScoreboard, setShowScoreboard] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/quiz/quizzes`
        );
        const data = await res.json();
        if (res.ok) {
          setQuizzes(data);
        } else {
          console.error("Failed to fetch quizzes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (!quizzes.length) return;
    setTimeLeft(30);
  }, [currentIndex, quizzes.length]);

  useEffect(() => {
    if (!quizzes.length || showScoreboard) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // If time runs out, treat as no answer selected and move to next question.
      handleNextQuestion();
    }
  }, [timeLeft, quizzes.length, showScoreboard]);

  const currentQuestion = quizzes[currentIndex];

  const handleAnswerClick = (answer: string | number) => {
    if (!currentQuestion) return;

    setSelectedAnswer(answer);
    if (answer === currentQuestion.correctAnswer) {
      setFeedback("✅ Correct!");
      setScore(score + 1);
      console.log("answerClick", score);
    } else {
      setFeedback("❌ Incorrect!");
    }
    // Wait a short delay to show feedback then move on.
    const timer = setTimeout(() => handleNextQuestion(), 1000);
    return () => clearTimeout(timer);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizzes.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setFeedback(null);
      setTimeLeft(30);
    } else {
      saveQuizResult(score + 1, quizzes.length);
      setShowScoreboard(true);

      console.log("next qusetion", score);
    }
  };

  if (!quizzes.length) {
    return (
      <Layout>
        <div className="container mx-5 py-10">
          <h1 className="text-3xl font-bold mb-6">My Quizzes</h1>
          <p>Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-5 py-10">
        <h1 className="text-3xl font-bold mb-6">My Quizzes</h1>
        {showScoreboard ? (
          <div className="container mx-5 py-10 text-center">
            <h1 className="text-3xl font-bold mb-6">Quiz Completed!</h1>
            <Card className="max-w-lg mx-auto p-6">
              <CardContent>
                <h2 className="text-2xl font-semibold">Your Score</h2>
                <p className="text-xl font-bold my-4">
                  {score} / {quizzes.length}
                </p>
                <Button
                  onClick={() => window.location.reload()}
                  className="mt-4"
                >
                  Restart Quiz
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto p-6 space-y-6">
            <Card className="p-4">
              <CardContent>
                <h2 className="text-xl font-bold text-center">
                  {currentQuestion.type == "MCQ"
                    ? "Multiple-Choice Questions"
                    : "Integer-Type Questions"}
                </h2>
                <p className="text-center font-medium">
                  Question {currentIndex + 1} of {quizzes.length}
                </p>

                {/* Timer Bar */}
                <Progress value={(timeLeft / 30) * 100} className="mt-4" />
                <p className="text-center text-sm font-medium">
                  Time Left: {timeLeft}s
                </p>

                {/* Question */}
                <p className="mt-4 font-semibold">{currentQuestion.question}</p>

                {/* MCQ Options */}
                {currentQuestion.type === "MCQ" && (
                  <div className="mt-3 space-y-2">
                    {currentQuestion.options.map(
                      (option: string, i: number) => (
                        <Button
                          key={i}
                          variant={
                            selectedAnswer === option ? "secondary" : "outline"
                          }
                          className="w-full"
                          onClick={() => handleAnswerClick(option)}
                        >
                          {String.fromCharCode(65 + i)}. {option}
                        </Button>
                      )
                    )}
                  </div>
                )}

                {/* Integer Type Question */}
                {currentQuestion.type === "Integer" && (
                  <>
                    <input
                      type="number"
                      placeholder="Your Answer"
                      className="w-full p-2 border rounded-md mt-3"
                      onChange={(e) =>
                        setSelectedAnswer(Number(e.target.value))
                      }
                      value={selectedAnswer !== null ? selectedAnswer : ""}
                    />
                    <Button
                      className="mt-3 w-full"
                      onClick={() => {
                        if (selectedAnswer !== null) {
                          handleAnswerClick(selectedAnswer);
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </>
                )}

                {/* Feedback */}
                {feedback && (
                  <p className="mt-3 font-medium text-center">{feedback}</p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
