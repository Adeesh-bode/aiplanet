import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import QuestionForm from '../components/QuestionForm';
import AnswerDisplay from '../components/AnswerDisplay';

const Home: React.FC = () => {
    const [answer, setAnswer] = useState<string>('');

    return (
        <div>
            <h1>PDF Q&A Application</h1>
            <FileUpload onUpload={(data) => console.log(data)} />
            <QuestionForm onAnswer={(data) => setAnswer(data)} />
            <AnswerDisplay answer={answer} />
        </div>
    );
};

export default Home;
