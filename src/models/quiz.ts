import { Assignment } from "./assignment";
import { Submission } from "./submission";
import { subsetRandomly } from "../utilities/random";
import {
    Feedback,
    Question,
    SQUARE_BRACKETS,
    matchKeyInBrackets
} from "./questions";

export enum QuizMode {
    ATTEMPTING = "ATTEMPTING",
    COMPLETED = "COMPLETED",
    READY = "READY"
}

export enum QuizFeedbackType {
    // TODO: Support other kinds besides immediate
    IMMEDIATE = "IMMEDIATE",
    NONE = "NONE",
    SUMMARY = "SUMMARY"
}

export enum QuizPoolRandomness {
    ATTEMPT = "ATTEMPT",
    SEED = "SEED",
    NONE = "NONE"
}

export interface QuestionPool {
    questions: string[];
    amount: number;
    name: string;
}

export interface QuizInstructionsSettings {
    /** How many times you can attempt a quiz; -1 is infinite attempts */
    attemptLimit?: number;
    /** How many minutes you must wait between attempts; -1 is no minutes */
    coolDown?: number;
    /** What type of feedback this is **/
    feedbackType?: QuizFeedbackType;
    /** How many questions to show on each "page"; -1 is all questions on one page */
    questionsPerPage?: number;
    /** What to use when choose the pool, for consistency */
    poolRandomness?: QuizPoolRandomness;
    /** The URL or ID of the reading to use as preamble, if there is one */
    readingId?: number | null;
}

export interface QuizInstructions {
    questions: Record<string, Question>;
    settings: QuizInstructionsSettings;
    pools: QuestionPool[];
}

export const EMPTY_QUIZ_INSTRUCTIONS_STRING = JSON.stringify({
    questions: {},
    settings: {
        attemptLimit: -1,
        coolDown: -1,
        feedbackType: QuizFeedbackType.IMMEDIATE,
        questionsPerPage: -1,
        poolRandomness: QuizPoolRandomness.SEED,
        readingId: null
    },
    pools: []
});

export function fillInMissingQuizInstructionFields(
    quizInstructions: Partial<QuizInstructions>
) {
    if (!("questions" in quizInstructions)) {
        quizInstructions.questions = {};
    }
    if (!("settings" in quizInstructions)) {
        quizInstructions.settings = {};
    }
    if (!("pools" in quizInstructions)) {
        quizInstructions.pools = [];
    }
    if (quizInstructions.settings) {
        quizInstructions.settings.attemptLimit ??= -1;
        quizInstructions.settings.coolDown ??= -1;
        quizInstructions.settings.feedbackType ??= QuizFeedbackType.IMMEDIATE;
        quizInstructions.settings.questionsPerPage ??= -1;
        quizInstructions.settings.poolRandomness ??= QuizPoolRandomness.ATTEMPT;
        quizInstructions.settings.readingId ??= null;
    }
}
