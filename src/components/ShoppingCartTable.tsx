import Table from 'react-bootstrap/Table';
import { useCart } from '../context/CartContext';
import { Button, Col, Container, Row } from 'react-bootstrap';


const ShoppingCartTable: React.FC = () => {

    const { cart, increaseQuantity, decreaseQuantity } = useCart()

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Proizvod</th>
                    <th>Cena</th>
                    <th>Količina</th>
                    <th>Ukupno</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((cartItem, i) => (
                    <tr key={cartItem.bookFormatId}>
                        <td>{i + 1}</td>
                        <td>{cartItem.book.title}</td>
                        <td>{(cartItem.price).toFixed(2)} RSD</td>
                        <td>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        {cartItem.quantity}
                                    </Col>
                                    <Col>
                                        <Button className='mr-2' onClick={() => increaseQuantity(cartItem.bookFormatId)}>+</Button>
                                        <Button onClick={() => decreaseQuantity(cartItem.bookFormatId)}>-</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </td>
                        <td>{(cartItem.price * cartItem.quantity).toFixed(2)} RSD</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default ShoppingCartTable;