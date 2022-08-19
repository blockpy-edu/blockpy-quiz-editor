import {
    createActionCreators,
    createReducerFunction,
    ImmerReducer
} from "immer-reducer";
import { Question, QuizQuestionTypes } from "../models/questions";
import { QuizInstructions } from "../models/quiz";

export interface QuizApplication {
    quiz: QuizInstructions;
    deletedQuestions: Question[];
}

const LS_DELETED_QUESTION_KEY = "bpy-quiz-editor-deleted";
function loadLocalStorage(): Question[] {
    return JSON.parse(localStorage.getItem(LS_DELETED_QUESTION_KEY) || "[]");
}

export const DEFAULT_STATE: QuizApplication = {
    quiz: {
        questions: {},
        settings: {},
        pools: []
    },
    deletedQuestions: loadLocalStorage()
};

export class QuizReducer extends ImmerReducer<QuizApplication> {
    setFromRaw(contents: QuizInstructions) {
        this.draftState.quiz = contents;
    }

    addQuestion(id: string) {
        this.draftState.quiz.questions[id] = {
            body: "",
            id: id,
            points: 1,
            title: "NewQuestion",
            type: QuizQuestionTypes.multiple_choice_question
        };
    }

    deleteQuestion(id: string) {
        this.draftState.deletedQuestions.push(
            this.draftState.quiz.questions[id]
        );
        delete this.draftState.quiz.questions[id];
        localStorage.setItem(
            LS_DELETED_QUESTION_KEY,
            JSON.stringify(this.draftState.quiz.questions)
        );
    }
}

export const QuizActions = createActionCreators(QuizReducer);
export const quizReducerFunction = createReducerFunction(QuizReducer);
