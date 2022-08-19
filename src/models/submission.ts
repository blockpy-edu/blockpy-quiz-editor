import { Model } from "./assignment";

export enum SubmissionStatus {
    // Not yet begun - the value if the submission does not exist
    INITIALIZED = "Initialized",
    // Started -> not yet run
    STARTED = "Started",
    // inProgress -> Run, but not yet marked formally as "submitted"
    IN_PROGRESS = "inProgress",
    // Submitted -> formally marked
    SUBMITTED = "Submitted",
    // Completed -> Either formally Submitted and FullyGraded, or auto graded as "correct"
    COMPLETED = "Completed"
}

export enum GradingStatus {
    FULLY_GRADED = "FullyGraded",
    PENDING = "Pending",
    PENDING_MANUAL = "PendingManual",
    FAILED = "Failed",
    NOT_READY = "NotReady"
}

export interface Submission extends Model {
    code: string;
    extra_files: string;
    url: string;
    endpoint: string;
    score: number;
    correct: boolean;
    submission_status: SubmissionStatus;
    grading_status: GradingStatus;
    assignment_id: number | null;
    assignment_group_id: number | null;
    assignment_version: number;
    course_id: number | null;
    user_id: number | null;
    version: number;
}
