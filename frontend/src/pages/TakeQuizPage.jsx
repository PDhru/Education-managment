// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TakeQuizPage = ({ match }) => {
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [error, setError] = useState('');
//   const [result, setResult] = useState(null);

//   const quizId = match.params.quizId;

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`https://education-managment.onrender.com/api/quiz/${quizId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setQuiz(response.data);
//       } catch (error) {
//         console.error('Error fetching quiz:', error);
//         setError('Failed to load quiz.');
//       }
//     };

//     fetchQuiz();                                                       
//   }, [quizId]);

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post(
//         `https://education-managment.onrender.com/api/student/submit-quiz/${quizId}`,
//         { answers },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setResult(response.data);
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       setError('Failed to submit quiz.');
//     }
//   };

//   if (result) {
//     return (
//       <div>
//         <h1>Quiz Results</h1>
//         <p>
//           You scored {result.score} out of {result.totalQuestions}.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {error && <div className="alert alert-danger">{error}</div>}
//       {quiz ? (
//         <div>
//           <h1>{quiz.title}</h1>
//           {quiz.questions.map((q, index) => (
//             <div key={index}>
//               <p>{q.questionText}</p>
//               {q.options.map((option, i) => (
//                 <div key={i}>
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={i}
//                     onChange={() => setAnswers({ ...answers, [index]: i })}
//                   />
//                   {option}
//                 </div>
//               ))}
//             </div>
//           ))}
//           <button onClick={handleSubmit} className="btn btn-primary">
//             Submit Quiz
//           </button>
//         </div>
//       ) : (
//         <p>Loading quiz...</p>
//       )}
//     </div>
//   );
// };

// export default TakeQuizPage;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TakeQuizPage = () => {
  const { quizId } = useParams(); // Get the quizId from route params
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://education-managment.onrender.com/api/quiz/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setError('Failed to load quiz.');
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://education-managment.onrender.com/api/quiz/submit/${quizId}`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz.');
    }
  };

  if (result) {
    return (
      <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript: void(0)">Forms</a></li>
              <li className="breadcrumb-item" aria-current="page">Give Exam</li>
            </ul>
          </div>
        </div>
        <h1>Quiz Results</h1>
        <h5 className='font-normal'>
          You scored <span className='text-black font-bold'>{result.score}</span> out of <span className='text-black font-bold'>{result.totalQuestions}</span>.
        </h5>
      </div>
      </div>
    );
  }

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item"><a href="javascript: void(0)">Forms</a></li>
              <li className="breadcrumb-item" aria-current="page">Give Exam</li>
            </ul>
            <div className="page-header-title">
              <h2 className="mb-0">Quiz</h2>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {quiz ? (
          <div>
            <h1>{quiz.title}</h1>
            {quiz.questions.map((q, index) => (
              <div key={index}>
                <h3 className='mb-3'> <span className='me-2'>{index + 1 + "."}</span>{q.questionText}</h3>
                {q.options.map((option, i) => (
                  <div key={i} className='mb-1'>
                    <input type="radio" className='me-2' name={`question-${index}`}value={i} onChange={() => setAnswers({ ...answers, [index]: i })}/>
                    {option}
                  </div>
                ))}
              </div>
            ))}
            <button onClick={handleSubmit} className="btn btn-primary mt-3">Submit Quiz</button>
          </div>
        ) : (
          <p>Loading quiz...</p>
        )}
      </div>
    </div>
  );
};

export default TakeQuizPage;
