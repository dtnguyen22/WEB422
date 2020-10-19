import React, { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';


function Sale(props) {
    const [sale, setSale] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://a1taitai.herokuapp.com/api/sales/${props.id}`)
            .then(res => res.json())
            .then(result => {
                if (result) {
                    setSale(result);
                    if (result._id) {
                        props.viewedSale(result._id);
                    }
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            })

    }, [props.id]);

    function calculateTotal(){
        let sum = 0;
        for(let i =0;i< sale.items.length; i++){
            sum+=sale.items[i].price * sale.items[i].quantity;
        } 
        return sum;
    }

    if (loading) {
        return null;
    } else {
        if (sale._id) {
            return (
                <div>
                    <h1>Sale: {sale._id}</h1>
                    <h2>Customer</h2>
                    <ListGroup>
                        <ListGroupItem><strong>email:</strong> {sale.customer.email} </ListGroupItem>
                        <ListGroupItem><strong>age:</strong> {sale.customer.age}</ListGroupItem>
                        <ListGroupItem><strong>satisfaction:</strong> {sale.customer.satisfaction} </ListGroupItem>
                    </ListGroup>
            <h2> Items: ${calculateTotal().toFixed(2)}</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            {sale.items.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                </tr>
                            )}

                        </thead>
                        <tbody>

                        </tbody>
                    </Table>
                </div>
            );
        } else {
            return <div><h1>Unable to find Sale</h1><p>id: {props.id}</p></div>;
        }
    }
}

export default Sale;