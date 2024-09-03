export interface Author {
    authorId: number;
    fullName: string;
    description: string
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

export interface Genre {
    genreId: number;
    name: string;
}

export interface Member {
    memberId: number;
    fullName: string;
    email: string
}

export interface BookCopy {
    bookCopyId: number;
    status: string;
    bookFormat: BookFormat;
    store: Store;
}

export interface InvoiceItem {
    invoiceItemId: number;
    bookCopy: BookCopy;
    price: number
}

export interface Invoice {
    invoiceId: number;
    member: Member
    totalAmount: number;
    invoiceItems: InvoiceItem[]
}