import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Author } from "../types"

interface AdminAuthorsTableProps {
    authors: Author[]
}

const AdminAuthorsTable: React.FC<AdminAuthorsTableProps> = ({ authors }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Sifra</th>
                    <th>Naziv</th>
                    <th>Opis</th>
                </tr>
            </thead>
            <tbody>
                {authors.map((a, i) => (
                    <tr key={a.authorId}>
                        <td>{i + 1}</td>
                        <td>{a.authorId}</td>
                        <td>{a.fullName}</td>
                        <td>
                            {a.description}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default AdminAuthorsTable