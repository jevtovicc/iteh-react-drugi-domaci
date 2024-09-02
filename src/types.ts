export interface Author {
    authorId: number;
    fullName: string;
}

export interface Publisher {
    publisherId: number;
    publisherName: string
}

export interface Book {
    bookId: number;
    title: string;
    description: string;
    author: Author;
}

export interface Store {
    storeId: number,
    name: string
    location: string
}

export interface BookFormat {
    bookFormatId: number;
    format: string;
    isbn: string;
    price: number;
    available: boolean;
    coverImagePath: string;
    book: Book;
}