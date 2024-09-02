import { Button, Card, Col, Container, Row } from "react-bootstrap"
import ShoppingCartTable from "../components/ShoppingCartTable"
import { useCart } from "../context/CartContext"
import axios from "axios"

const ShoppingCartPage: React.FC = () => {

    const { cart, clearCart } = useCart()

    const handleCheckout = () => {

        const bookFormatQuantities = cart.reduce((map, item) => {
            map[item.bookFormatId] = item.quantity
            return map
        }
            , {} as { [key: string]: number })

        const data = {
            "memberId": 1,
            "bookFormatQuantities": bookFormatQuantities
        }

        axios.post('http://localhost:8080/api/invoices', data)
            .then(response => {
                alert('Invoice created')
                clearCart()
            })
            .catch(e => console.log(e))
    }


    return (
        <Container className="mt-4">
            <Row>
                <Col lg={10}>
                    <ShoppingCartTable />
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Vaša Porudžbina</Card.Title>
                            <Card.Text>
                                Ukupna cena:
                                {(cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)).toFixed(2)} RSD
                            </Card.Text>
                            <Button variant="primary" onClick={handleCheckout}>Kupi</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default ShoppingCartPage