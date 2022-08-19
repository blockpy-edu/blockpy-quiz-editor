import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Question } from "../models/questions";
import ReactMarkdown from "react-markdown";

export function QuestionEditor({
    id,
    question
}: {
    id: string;
    question: Question;
}): JSX.Element {
    return (
        <Card style={{ width: "60rem" }}>
            <Card.Body>
                <Card.Title>{id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Points: {question.points}
                </Card.Subtitle>
                <ReactMarkdown>{question.body}</ReactMarkdown>
            </Card.Body>
        </Card>
    );
}
