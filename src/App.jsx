import React, { useState } from "react";

const App = () => {
  const [questions, setQuestions] = useState([
    {
      questionId: 1,
      type: "MCQ",
      questionText: "",
      options: ["", ""],
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionId: questions.length + 1,
        type: "MCQ",
        questionText: "",
        options: ["", ""],
      },
    ]);
  };

  const handleQuestionTypeChange = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    if (type === "MCQ") {
      updatedQuestions[index].options = ["", ""]; 
    } else {
      updatedQuestions[index].options = []; 
    }
    setQuestions(updatedQuestions);
  };

  const handleQuestionTextChange = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[index].options.length < 8) {
      updatedQuestions[index].options.push("");
      setQuestions(updatedQuestions);
    }
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    const filledQuestions = questions.filter(
      (q) =>
        q.questionText &&
        (q.type === "Text Area" ||
          (q.type === "MCQ" && q.options.filter((opt) => opt).length >= 2))
    );
    return filledQuestions.length >= 2;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formOutput = {
        formTitle: "Untitled Form",
        questions: questions.map((q) => ({
          questionId: q.questionId,
          type: q.type,
          questionText: q.questionText,
          options:
            q.type === "MCQ"
              ? q.options
                  .filter((opt) => opt)
                  .map((opt, idx) => ({ optionId: idx + 1, optionText: opt }))
              : undefined,
          textLimit: q.type === "Text Area" ? 2000 : undefined,
        })),
      };
      console.log(JSON.stringify(formOutput, null, 2));
      alert("Form submitted! Check the console for JSON output.");
    } else {
      alert("Please complete at least two questions before submitting.");
    }
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-100 rounded-lg max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Untitled Form</h2>
      {questions.map((question, index) => (
        <div key={index} className="mb-6 border-b pb-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-bold mb-2">Question {index + 1}</h3>
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            )}
          </div>

          <input
            type="text"
            value={question.questionText}
            onChange={(e) => handleQuestionTextChange(index, e.target.value)}
            placeholder="Enter your question"
            className="w-full mb-2 p-2 border rounded"
          />
          <select
            value={question.type}
            onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="MCQ">Multiple Choice (MCQ)</option>
            <option value="Text Area">Text Area</option>
          </select>
          {question.type === "MCQ" && (
            <div>
              {question.options.map((option, optIdx) => (
                <div key={optIdx} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optIdx, e.target.value)
                    }
                    placeholder={`Option ${optIdx + 1}`}
                    className="w-full p-2 border rounded"
                  />
                  {question.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index, optIdx)}
                      className="ml-2 text-red-500 hover:text-red-800"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              {question.options.length < 8 && (
                <button
                  type="button"
                  onClick={() => handleAddOption(index)}
                  className="text-blue-500 mt-2"
                >
                  Add Option
                </button>
              )}
            </div>
          )}
          {question.type === "Text Area" && (
            <textarea
              maxLength="2000"
              placeholder="Answer here..."
              className="w-full p-2 border rounded mt-2"
            />
          )}
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded mb-"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          Submit Form
        </button>
      </div>
    </form>
  );
};

export default App;
