import { Button, Container, Row, Table } from "react-bootstrap";

const ListPurchase = ({ userPurchase }) => {
  console.log(userPurchase);
  return (
    <Container fluid className="container-products-page">
      <Row>
        <div className="product-list animate__animated animate__slideInDown">
          {userPurchase.map((product, index) => {
            return (
              <Table striped bordered hover key={index}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                    <th>Ciudad</th>
                    <th>Fecha de compra</th>
                    <th>Cantidad de productos comprados</th>
                    <th>Precio abonado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{product.phone}</td>
                    <td>{product.city}</td>
                    <td>{product.date.getDate}</td>
                    <td>{product.countItems}</td>
                    <td>${product.price}</td>
                  </tr>
                </tbody>
              </Table>
            );
          })}
        </div>
      </Row>
    </Container>
  );
};

export default ListPurchase;
