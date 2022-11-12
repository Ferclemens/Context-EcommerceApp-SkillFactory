import { Button, Container, Row, Table } from "react-bootstrap";
import "../styles/ProductsCount.css"

const ListPurchase = ({ userPurchase }) => {
  console.log(userPurchase);
  return (
    <Container fluid >
      <Row>
      <div className="table-history-products">
              <Table striped bordered hover >
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
                      {userPurchase.map((product, index) => {
                        return (
                
                      <tr  key={index} >
                        <td>{product.name}</td>
                        <td>{product.email}</td>
                        <td>{product.phone}</td>
                        <td>{product.city}</td>
                        <td>{product.datePurchase}</td>
                        <td>{product.countItems}</td>
                        <td>${product.price}</td>
                      </tr>
                  
                        );
                      })}
             </tbody>
           </Table>
         </div>  
      </Row>
    </Container>
  );
};

export default ListPurchase;
