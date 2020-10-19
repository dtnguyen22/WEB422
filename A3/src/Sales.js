import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';



function Sales(props) {
    const [sales, setSales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    function getData(page) {
        return new Promise(function (resolve, reject) {
            fetch(`https://a1taitai.herokuapp.com/api/sales/?page=${page}&perPage=10`)
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        resolve(result);
                    }
                })
        });
    }
    function previousPage() {
        if (currentPage > 1) {
            getData(currentPage - 1).then(result => {
                if (result) {
                    setSales(result);
                    setCurrentPage(currentPage - 1);
                }
            });
        }
    }

    function nextPage() {
        getData(currentPage + 1).then(result => {
            if (result) {
                console.log(result);
                setSales(result);
                setCurrentPage(currentPage + 1);
            }
        });
    }
    useEffect(() => {
        getData(currentPage).then(result => {
            if (result) {
                setSales(result);
            }
        });
    }, []);

    if (sales.length > 0) {
        return (
            <>
                <div>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Store Location</th>
                                <th>Number of Items</th>
                                <th>Sale Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) =>
                                <tr key={sale._id} onClick={()=>{props.history.push(`/Sale/${sale._id}`)}}>
                                    <td>{sale.customer.email}</td>
                                    <td>{sale.storeLocation}</td>
                                    <td>{sale.items.length}</td>
                                    <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={previousPage} />
                        <Pagination.Item>{currentPage}</Pagination.Item>
                        <Pagination.Next onClick={nextPage} />
                    </Pagination>
                </div>
            </>
        );
    } else {
        return null;
    }


}
export default withRouter(Sales);