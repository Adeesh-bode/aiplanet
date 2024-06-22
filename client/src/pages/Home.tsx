import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import QuestionForm from '../components/QuestionForm';
import AnswerDisplay from '../components/AnswerDisplay';
 
const Home: React.FC = () => {
    const [answer, setAnswer] = useState<string>('');
    return (
        <div className='h-screen flex flex-col justify-start '>
            <FileUpload onUpload={(data) => console.log(data)} />
            <AnswerDisplay answer={answer} /> 
            <QuestionForm onAnswer={(data) => setAnswer(data)} />
        </div>
    );
};

export default Home;



    
