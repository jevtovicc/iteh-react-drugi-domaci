export interface Autor {
    autorId: number;
    imePrezime: string;
}

export interface Knjiga {
    knjigaId: number;
    naziv: string;
    isbn: string;
    cena: number;
    autor: Autor;
}