export interface Movie{
    id: number;
    title: string;
    director: string;
    year: number;
}

export interface NewMovie extends Movie {}