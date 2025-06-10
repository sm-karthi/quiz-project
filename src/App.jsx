import { useEffect, useState } from "react";
import "./App.css";
import ScorePage from "./ScorePage";
import logo from "./assets/images/fav-icon.png"

function App() {
  let [timeLeft, setTimeLeft] = useState(300);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [userAnswers, setUserAnswers] = useState({});
  let [showScorePage, setShowScorePage] = useState(false);


  let questions = [
    {
      id: 1,
      type: "MCQ",
      question: "Which language is used to style web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      answer: "CSS",
      mark: 5
    },
    {
      id: 2,
      type: "MSQ",
      question: "Which of the following are JavaScript data types?",
      options: ["String", "Boolean", "Integer", "Document"],
      answer: ["String", "Boolean"],
      mark: 10
    },
    {
      id: 3,
      type: "MCQ",
      question: "Which tag is used to define a JavaScript code?",
      options: ["<script>", "<js>", "<code>", "<javascript>"],
      answer: "<script>",
      mark: 5
    },
    {
      id: 4,
      type: "MSQ",
      question: "Which of the following are looping structures in JavaScript?",
      options: ["for", "while", "repeat", "loop"],
      answer: ["for", "while"],
      mark: 10
    },
    {
      id: 5,
      type: "MCQ",
      question: "Which of the following is not a programming language?",
      options: ["Python", "HTML", "Java", "C++"],
      answer: "HTML",
      mark: 5
    },
    {
      id: 6,
      type: "MSQ",
      question: "Which are valid variable names in JavaScript?",
      options: ["1name", "_name", "name$", "var-name"],
      answer: ["_name", "name$"],
      mark: 10
    },
    {
      id: 7,
      type: "MCQ",
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["#", "//", "/*", "<!--"],
      answer: "//",
      mark: 5
    },
    {
      id: 8,
      type: "MSQ",
      question: "Which of these are JavaScript frameworks/libraries?",
      options: ["React", "Vue", "Flask", "Angular"],
      answer: ["React", "Vue", "Angular"],
      mark: 10
    },
    {
      id: 9,
      type: "MCQ",
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["int", "var", "let", "define"],
      answer: "var",
      mark: 5
    },
    {
      id: 10,
      type: "MSQ",
      question: "Which of the following are valid boolean values in JavaScript?",
      options: ["yes", "true", "false", "no"],
      answer: ["true", "false"],
      mark: 10
    }
  ];

  useEffect(() => {

    if (timeLeft === 0) {
      setShowScorePage(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

  }, [timeLeft]);


  let formatTime = (sec) => {
    let m = Math.floor(sec / 60).toString().padStart(2, "0");
    let s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  let handleMCQChange = (selectedOption) => {
    let updated = { ...userAnswers, [currentIndex]: [selectedOption] };
    setUserAnswers(updated);

  };



  let handleMSQChange = (selectedOption) => {
    let prevAnswers = userAnswers[currentIndex] || [];
    let isSelected = prevAnswers.includes(selectedOption);
    let updated = isSelected
      ? prevAnswers.filter(opt => opt !== selectedOption)
      : [...prevAnswers, selectedOption];
    setUserAnswers({ ...userAnswers, [currentIndex]: updated });
  };

  let currentQ = questions[currentIndex];
  let selected = userAnswers[currentIndex] || [];


  if (showScorePage) {
    return <ScorePage questions={questions} userAnswers={userAnswers} />;
  }



  return (
    <>
      <div className="w-full bg-gray-50 h-16 border-b border-b-gray-300 flex items-center justify-between px-4 sm:px-6 md:px-10 shadow">

        <img src={logo} alt="logo" className="w-10 h-10" draggable="false" />

        <div className="flex gap-2 items-center">

          <h4 className="text-sm sm:text-base text-gray-600">Timer</h4>

          <div
            className={`shadow-md rounded px-3 py-1 text-sm sm:text-base
            ${timeLeft <= 5 ?
                "border border-red-800 text-red-800" :
                timeLeft <= 10 ?
                  "border border-red-600 text-red-600" :
                  timeLeft <= 15 ?
                    "border border-red-300 text-red-400" :
                    "border border-gray-400 text-gray-700"}`}>

            {formatTime(timeLeft)}

          </div>

        </div>

      </div>

      <div className="flex gap-2 justify-center flex-wrap mt-6 px-2">

        {questions.map((ques, idx) => (

          <button
            onClick={() => setCurrentIndex(idx)}
            className={`px-3 py-1 mb-2 rounded-2xl text-sm font-semibold cursor-pointer text-white
            ${currentIndex === idx ? "bg-green-700" : "bg-green-400 hover:bg-green-500"}`}>
            {idx + 1}
          </button>

        ))}

      </div>

      <div className="mt-10 px-4 flex flex-col items-center">

        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-4 text-center">
          Q{currentQ.id}. {currentQ.question}
        </h2>

        <div className="space-y-3 w-full max-w-md">

          {currentQ.options.map((opt) => (

            <label
              className="flex items-center py-2 px-3 border border-gray-400 rounded-md cursor-pointer hover:bg-blue-50 shadow-md bg-white">

              <input
                type={currentQ.type === "MCQ" ? "radio" : "checkbox"}
                checked={selected.includes(opt)}
                onChange={() =>
                  currentQ.type === "MCQ"
                    ? handleMCQChange(opt)
                    : handleMSQChange(opt)
                }
                className="mr-3 accent-blue-500"
              />

              <span className="text-gray-700">{opt}</span>

            </label>

          ))}

        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-md gap-4 mt-10">

          <div className="flex gap-4 w-full sm:w-auto justify-center">

            <button
              onClick={() => {

                setCurrentIndex(currentIndex - 1);

              }}
              disabled={currentIndex === 0}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
              Previous
            </button>

            <button
              onClick={() => {

                setCurrentIndex(currentIndex + 1);

              }}
              disabled={currentIndex === questions.length - 1}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed">
              Next
            </button>


          </div>

          <button onClick={() => setShowScorePage(true)}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold cursor-pointer rounded-lg shadow-lg">
            Finish
          </button>

        </div>

      </div>

    </>

  );

}

export default App;
