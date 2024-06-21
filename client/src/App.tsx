import { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import QuestionForm from './components/QuestionForm';
import AnswerDisplay from './components/AnswerDisplay';

function App() {
    const [answer, setAnswer] = useState<string>('');

    return (
        <div className="App">
            <h1>PDF Q&A Application</h1>
            <FileUpload onUpload={(data) => console.log(data)} />
            <QuestionForm onAnswer={setAnswer} />
            <AnswerDisplay answer={answer} />
        </div>
    );
}

export default App;
