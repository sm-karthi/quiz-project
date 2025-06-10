import React from "react";

function ScorePage({ questions, userAnswers }) {
    document.title = "Quiz - Result";

    let total = 0;
    let totalScore = 0;


    let results = questions.map((ques, index) => {
        let userAns = userAnswers[index] || [];
        let correctAns = Array.isArray(ques.answer) ? ques.answer : [ques.answer];

        totalScore += ques.mark;
        let isCorrect = false;
        let marksAwarded = 0;

        if (Array.isArray(ques.answer)) {
            let correctSelected = userAns.filter(ans => correctAns.includes(ans));
            let incorrectSelected = userAns.filter(ans => !correctAns.includes(ans));

            if (correctSelected.length && !incorrectSelected.length) {
                marksAwarded = Math.round((correctSelected.length / correctAns.length) * ques.mark);
                total += marksAwarded;
                isCorrect = correctSelected.length === correctAns.length;
            }
        } else {
            isCorrect = userAns[0] === correctAns[0];
            if (isCorrect) {
                marksAwarded = ques.mark;
                total += marksAwarded;
            }
        }

        return { ...ques, isCorrect, userAns, marksAwarded };
    });



    return (
        <div className="p-6 md:px-32">
            <h2 className="text-2xl text-green-500 font-bold mb-4">
                Your Score: {total} / {totalScore}
            </h2>

            <ul className="space-y-4">
                {results.map((q, idx) => (
                    <li className="border border-gray-300 p-4 rounded-md shadow-md">
                        <h3 className="font-semibold">Q{idx + 1}. {q.question}</h3>

                        <p className="mt-1">
                            Your Answer: {q.userAns.length ? q.userAns.join(", ") : "Not Answered"}
                        </p>

                        <p className="mt-1">
                            Correct Answer: {Array.isArray(q.answer) ? q.answer.join(", ") : q.answer}
                        </p>

                        <p className={`mt-1 font-bold ${q.marksAwarded ?
                            "text-green-600" : "text-red-600"}`}>
                            {q.marksAwarded
                                ? `Correct (+${q.marksAwarded} / ${q.mark})`
                                : `Incorrect (0 / ${q.mark})`}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScorePage;
