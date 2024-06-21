import React, { useState } from 'react';
import axios from 'axios';

interface QuestionFormProps {
    onAnswer: (data: string) => void; // Expect a string, not an object
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onAnswer }) => {
    const [pdfFilename, setPdfFilename] = useState<string>('');
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
            onAnswer(response.data.answer); // Pass only the answer text
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={pdfFilename}
                onChange={(e) => setPdfFilename(e.target.value)}
                placeholder="Enter PDF filename"
            />
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
            />
            <button onClick={handleQuestionSubmit}>Ask Question</button>
        </div>
    );
};

export default QuestionForm;
