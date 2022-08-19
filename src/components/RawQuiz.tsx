import React, { useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { useDispatchContext, useStateContext } from "../reducers/appContext";
import { QuizActions } from "../reducers/quizReducer";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";

export function RawQuiz(): JSX.Element {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    const [raw, setRaw] = useState(state.quiz);

    return (
        <Row>
            <Col>
                <Button
                    variant="primary"
                    onClick={() => dispatch(QuizActions.setFromRaw(raw))}
                >
                    Load from raw
                </Button>
                <div>{Object.values(state.quiz.questions).length}</div>
                <Editor
                    ace={ace}
                    theme="ace/theme/github"
                    value={raw}
                    onChange={(e: any) => setRaw(e)}
                    allowedModes={["tree", "code", "text"]}
                />
                {JSON.stringify(state.quiz) !== JSON.stringify(raw) && (
                    <Alert variant="danger">
                        Raw not up-to-date!
                        <Button
                            variant="danger"
                            onClick={() => setRaw(state.quiz)}
                        >
                            Update?
                        </Button>
                    </Alert>
                )}
            </Col>
        </Row>
    );
}
