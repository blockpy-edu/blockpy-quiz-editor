import React from "react";
import { Button, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Question } from "../models/questions";
import { QuestionEditor } from "./QuestionEditor";
import { PooledQuestions } from "./QuizEditor";

export function PoolEditor({
    id,
    pool
}: {
    id: string;
    pool: PooledQuestions;
}): JSX.Element {
    return (
        <Tabs defaultActiveKey={pool.questions[0][0]} id={id} className="mb-3">
            {pool.questions.map(([id, question]: [string, Question]) => (
                <Tab eventKey={id} title={id} key={id}>
                    <QuestionEditor
                        id={id}
                        question={question}
                    ></QuestionEditor>
                </Tab>
            ))}
        </Tabs>
    );
}
