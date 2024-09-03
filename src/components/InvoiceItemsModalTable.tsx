import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import { Invoice } from "../types"

interface InvoiceItemsModalTableProps {
    invoice: Invoice | null,
    show: boolean;
    onHide: () => void
}

const InvoiceItemsModalTable: React.FC<InvoiceItemsModalTableProps> = ({ invoice, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Detalji Racuna</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Kupac: {invoice?.member.fullName}</h4>
                <h4 className="mb-4">Ukupan iznos: {invoice?.totalAmount.toFixed(2)} RSD</h4>
                <Container style={{ height: invoice && invoice?.invoiceItems.length >= 3 ? '500px' : '300px', width: '800px', overflowY: 'auto' }}>
                    <h4>Stavke:</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Knjiga</th>
                                <th>ISBN</th>
                                <th>Cena</th>
                                <th>Kolicina</th>
                                <th>Ukupna cena</th>
                            </tr>
                        </thead>
                        {invoice &&
                            <tbody>
                                {invoice.invoiceItems.map((invoiceItem, i) => (
                                    <tr key={invoiceItem.invoiceItemId}>
                                        <td>{i + 1}</td>
                                        <td>{invoiceItem.bookCopy.bookFormat.book.title}</td>
                                        <td>{invoiceItem.bookCopy.bookFormat.isbn}</td>
                                        <td>{invoiceItem.bookCopy.bookFormat.price.toFixed(2)} RSD</td>
                                        <td>1</td>
                                        <td>{invoiceItem.bookCopy.bookFormat.price.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        }
                    </Table>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default InvoiceItemsModalTable