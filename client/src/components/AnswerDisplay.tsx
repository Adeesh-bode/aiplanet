import React from 'react';

interface AnswerDisplayProps {
    answer: string;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ answer }) => {
    return (
        <div className='h-full w-full flex justify-center items-center'>
            <h3>Answer:</h3>
            <p>{answer}</p>
        </div>
    );
};

export default AnswerDisplay;
