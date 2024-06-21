import React, { useState } from 'react';
import axios from 'axios';

interface QuestionFormProps {
    onAnswer: (answer: string) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onAnswer }) => {
    const [pdfFilename, setPdfFilename] = useState<string>('');
    const [question, setQuestion] = useState<string>('');

    const handleQuestionSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8000/ask/', {
                pdf_filename: pdfFilename,
                question: question
            });
            onAnswer(response.data.answer);
        } catch (error) {
            console.error('Error asking question:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="PDF Filename"
                value={pdfFilename}
                onChange={(e) => setPdfFilename(e.target.value)}
            />
            <input
                type="text"
                placeholder="Your Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleQuestionSubmit}>Ask Question</button>
        </div>
    );
};

export default QuestionForm;
