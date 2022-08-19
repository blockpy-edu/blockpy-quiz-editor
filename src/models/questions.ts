export const matchKeyInBrackets = (key: string) =>
    new RegExp(`(?<!\\))(\\[${key}\\])(?!\\()`);
export const SQUARE_BRACKETS = /(?<!\\)(\[.*?\]\]?)(?!\()/;

export enum QuizQuestionTypes {
    multiple_choice_question = "multiple_choice_question",
    multiple_answers_question = "multiple_answers_question",
    true_false_question = "true_false_question",
    text_only_question = "text_only_question",
    matching_question = "matching_question",
    multiple_dropdowns_question = "multiple_dropdowns_question",
    short_answer_question = "short_answer_question",
    fill_in_multiple_blanks_question = "fill_in_multiple_blanks_question",

    calculated_question = "calculated_question",
    essay_question = "essay_question",
    file_upload_question = "file_upload_question",

    numerical_question = "numerical_question"
}

export const getBracketed = (body: string): string[] => {
    return body
        .split(SQUARE_BRACKETS)
        .filter(
            (part: string) => !(part.startsWith("[[") && part.endsWith("]]"))
        )
        .filter((part: string) => part.startsWith("[") && part.endsWith("]"))
        .map((part: string) => part.slice(1, -1));
};

export interface Feedback {
    correct: boolean;
    score: number;
    message: string;
    status: string;
}

export interface Question {
    body: string;
    id: string;
    title: string;
    type: string;
    points: number;
    answers?: string[] | { [key: string]: string[] };
    statements?: string[];
    retainOrder?: boolean;
}
