import { getQuizHistory } from "@/lib/utils";
import Layout from "@/Layout";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function QuizHistory() {
  const [quizHistory, setQuizHistory] = useState<
    { date: string; score: number; total: number }[]
  >([]);
  useEffect(() => {
    getQuizHistory()
      .then((history) => setQuizHistory(history))
      .catch((error) => console.error("Error fetching quiz history:", error));
  }, []);
  return (
    <Layout>
      <div className="container mx-auto mt-6 px-4">
        <h3 className="text-2xl font-bold mb-4 text-center"> Quiz History</h3>
        {quizHistory.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizHistory.map((attempt, index) => (
              <Card key={index} className="shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle>Attempt: {index + 1}</CardTitle>
                  <CardTitle className="text-lg font-semibold">
                    {attempt.date}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-md font-medium">
                    Score: <span className="font-bold">{attempt.score}</span> /{" "}
                    {attempt.total}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">
            No quiz history available.
          </p>
        )}
      </div>
    </Layout>
  );
}
