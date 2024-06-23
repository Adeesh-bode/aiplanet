import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import QuestionForm from '../components/QuestionForm';
import AnswerDisplay from '../components/AnswerDisplay';

const Home: React.FC = () => {
    const [pdfFilenames, setPdfFilenames] = useState<string[]>([]);
    const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);

    const handleFileUpload = (filenames: string[]) => {
        setPdfFilenames(filenames);
    };

    const handleQuestionSubmit = (userQuestion: string, botAnswer: string) => {
        setMessages([...messages, { user: userQuestion, bot: botAnswer }]);
    };

    return (
        <div className='h-screen flex flex-col'>
            <FileUpload onUpload={handleFileUpload} />
            <div className='flex-1 overflow-y-auto'>
                <AnswerDisplay messages={messages} />
            </div>
            {pdfFilenames.length > 0 && (
                <QuestionForm pdfFilename={pdfFilenames[pdfFilenames.length - 1]} onQuestionSubmit={handleQuestionSubmit} />
            )}
        </div>
    );
};

export default Home;
