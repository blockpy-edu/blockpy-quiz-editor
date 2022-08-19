import React from "react";
import { Button } from "react-bootstrap";
import { Question } from "../models/questions";
import { useStateContext, useDispatchContext } from "../reducers/appContext";
import { QuizActions } from "../reducers/quizReducer";

export function QuizEditor(): JSX.Element {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    return (
        <div>
            {Object.values(state.quiz.questions).map((question: Question) => (
                <div key={question.id}>{question.title}</div>
            ))}
            <Button
                onClick={() =>
                    dispatch(
                        QuizActions.addQuestion(
                            "test" + Math.floor(Math.random() * 100)
                        )
                    )
                }
            >
                Add
            </Button>
        </div>
    );
}
