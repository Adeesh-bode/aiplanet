import React, { useState } from 'react';
import axios from 'axios';
import { CiPaperplane } from "react-icons/ci";


interface QuestionProps {
    pdfFilename: string;
    onQuestionSubmit: (userQuestion: string, botAnswer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ pdfFilename, onQuestionSubmit }) => {
    const [question, setQuestion] = useState<string>('');

    const handleQuestionSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/ask/', null, {
                params: {
                    pdf_filename: pdfFilename,
                    question: question
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onQuestionSubmit(question, response.data.answer);
            setQuestion('');
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div className='w-full mb-7  flex justify-center items-center'>
        <div className='relative w-4/5 flex justify-between items-center  border border-gray-300'>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                className='text-xl flex-1 px-4 py-2  mr-2 border border-gray-300 rounded focus:outline-none border-none text-black'
                >
            </input>
            <button onClick={handleQuestionSubmit} className='h-full absolute right-0 px-2  text-black rounded flex-center bg-white '>
            <CiPaperplane color='black' size={30} />
            </button>
        </div>
        </div>
    );
};

export default Question;
