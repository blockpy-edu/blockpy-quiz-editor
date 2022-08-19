import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Question } from "../models/questions";
import { QuestionPool } from "../models/quiz";
import { useStateContext, useDispatchContext } from "../reducers/appContext";
import { QuizActions } from "../reducers/quizReducer";
import { PoolEditor } from "./PoolEditor";
import { QuestionEditor } from "./QuestionEditor";

export interface PooledQuestions {
    pool: QuestionPool;
    questions: Array<[string, Question]>;
}

export type QuestionPoolList = Array<
    [string, "QUESTION", Question] | [string, "POOL", PooledQuestions]
>;

function clusterPools(
    questions: Record<string, Question>,
    pools: QuestionPool[]
): QuestionPoolList {
    const foundPools: Record<string, QuestionPool> = {};
    const addedPools: Record<string, PooledQuestions> = {};
    const result: QuestionPoolList = [];
    pools.forEach((pool: QuestionPool) => {
        pool.questions.forEach((questionId: string) => {
            foundPools[questionId] = pool;
        });
    });
    Object.entries(questions).forEach(([id, question]: [string, Question]) => {
        if (id in foundPools) {
            const pool = foundPools[id];
            if (pool.name in addedPools) {
                addedPools[pool.name].questions.push([id, question]);
            } else {
                const newPool: PooledQuestions = {
                    pool,
                    questions: [[id, question]]
                };
                addedPools[pool.name] = newPool;
                result.push([pool.name, "POOL", newPool]);
            }
        } else {
            result.push([id, "QUESTION", question]);
        }
    });
    return result;
}

export function QuizEditor(): JSX.Element {
    const state = useStateContext();
    const dispatch = useDispatchContext();

    return (
        <Row style={{ minHeight: "300px" }}>
            <Col>
                {clusterPools(state.quiz.questions, state.quiz.pools).map(
                    ([id, qpType, question]:
                        | [string, "POOL", PooledQuestions]
                        | [string, "QUESTION", Question]) =>
                        qpType === "POOL" ? (
                            <PoolEditor
                                key={"POOL-" + id}
                                id={id}
                                pool={question as PooledQuestions}
                            ></PoolEditor>
                        ) : (
                            <QuestionEditor
                                key={"QUESTION-" + id}
                                id={id}
                                question={question as Question}
                            ></QuestionEditor>
                        )
                )}
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
            </Col>
        </Row>
    );
}
