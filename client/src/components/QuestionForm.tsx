import React, { useState } from 'react';
import axios from 'axios';
import { IoPaperPlaneOutline } from "react-icons/io5";


interface QuestionFormProps {
    pdfFilename: string;
    onQuestionSubmit: (userQuestion: string, botAnswer: string) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ pdfFilename, onQuestionSubmit }) => {
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
        <div className='flex items-center p-4 border-t border-gray-300'>
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                className='flex-1 p-2 mr-2 border border-gray-300 rounded'
            />
            <button onClick={handleQuestionSubmit} className='bg-blue-500 text-white p-2 rounded'>
                <IoPaperPlaneOutline />
            </button>
        </div>
    );
};

export default QuestionForm;
