import React from 'react';

interface AnswerDisplayProps {
    messages: { user: string, bot: string }[];
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ messages }) => {
    return (
        <div className='h-full w-full p-4 flex flex-col gap-4 overflow-y-auto text-black'>
            {messages?.map((message, index) => (
                <div key={index} className='flex flex-col'>
                    <div className='self-end bg-blue-200 rounded-lg p-2 mb-1 max-w-xs'>
                        <p className='text-right'>{message.user}</p>
                    </div>
                    <div className='self-start bg-green-200 rounded-lg p-2 max-w-xs'>
                        <p>{message.bot}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnswerDisplay;
