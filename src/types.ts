export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Author {
    id: number;
    name: string;
    bio: string
}

export interface Publisher {
    id: number;
    name: string
}

export interface Store {
    id: number,
    name: string
    location: string
}

export interface Book {
    id: number;
    title: string;
    description: string;
    price: number;
    cover_image_path: string;
    page_count: number;
    format: string;
    author: Author;
    publisher: Publisher;
    genres: Genre[];
    stores: Store[],
    available: boolean;
    isbn: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Order {
    id: number;
    status: string;
    total_amount: number;
    user: User
}

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    book: Book;
    order: Order
}