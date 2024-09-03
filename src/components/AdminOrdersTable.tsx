import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Invoice } from "../types"
import { useState } from "react"
import InvoiceItemsModalTable from "./InvoiceItemsModalTable"

interface AdminOrdersTableProps {
    invoices: Invoice[]
}

const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({ invoices }) => {

    const [showInvoiceDetailsModal, setShowInvoiceDetailsModal] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)


    const handleShowInvoiceDetailsModal = (invoice: Invoice) => {
        setSelectedInvoice(invoice)
        setShowInvoiceDetailsModal(true)
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sifra</th>
                        <th>Kupac</th>
                        <th>Iznos</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice, i) => (
                        <tr key={invoice.invoiceId}>
                            <td>{i + 1}</td>
                            <td>{invoice.invoiceId}</td>
                            <td>{invoice.member.fullName}</td>
                            <td>{invoice.totalAmount.toFixed(2)} RSD</td>
                            <td>
                                <Button onClick={() => handleShowInvoiceDetailsModal(invoice)}>
                                    Vidi detalje
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <InvoiceItemsModalTable
                show={showInvoiceDetailsModal}
                onHide={() => setShowInvoiceDetailsModal(false)}
                invoice={selectedInvoice} />
        </>
    )
}

export default AdminOrdersTable