export interface Result {
    uid: string;
    name: string;
    url: string;
}

export interface RootObject {
    message: string;
    totalRecords: number;
    totalPages: number;
    previous?: string | null;
    next?: string | null;
    results: Result[];
}

