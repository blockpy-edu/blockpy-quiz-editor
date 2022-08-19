export interface Model {
    id: number;
    date_modified: string;
    date_created: string;
}

export interface Assignment extends Model {
    id: number;
    name: string;
    url: string;

    type: string;
    instructions: string;
    reviewed: boolean;
    hidden: boolean;
    public: boolean;
    subordinate: boolean;
    ip_ranges: string;
    points: number;
    settings: string;

    on_run: string;
    on_change: string;
    on_eval: string;
    starting_code: string;
    extra_instructor_files: string;
    extra_starting_files: string;

    forked_id: number;
    forked_version: number;
    owner_id: number;
    course_id: number;
    version: number;
}
