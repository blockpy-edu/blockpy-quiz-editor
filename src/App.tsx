import React from "react";
import "./App.css";
import { DeletedQuestions } from "./components/DeletedQuestions";
import { QuizEditor } from "./components/QuizEditor";
import { RawQuiz } from "./components/RawQuiz";
import { DispatchProvider, StateProvider } from "./reducers/appContext";
import {
    DEFAULT_STATE,
    QuizActions,
    quizReducerFunction
} from "./reducers/quizReducer";

function App(): JSX.Element {
    const [state, dispatch] = React.useReducer(
        quizReducerFunction,
        DEFAULT_STATE
    );

    return (
        <StateProvider value={state}>
            <DispatchProvider value={dispatch}>
                <div className="App">
                    <header className="App-header">BlockPy Quiz Editor</header>
                    <QuizEditor></QuizEditor>
                    <RawQuiz></RawQuiz>
                    <DeletedQuestions></DeletedQuestions>
                </div>
            </DispatchProvider>
        </StateProvider>
    );
}

export default App;
