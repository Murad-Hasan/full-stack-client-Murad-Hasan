import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Order.css";

const Order = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [showOrder, setShowOrder] = useState([]);
  useEffect(() => {
    fetch("https://apricot-custard-46493.herokuapp.com/showorder?email=" + loggedInUser.email)
      .then((res) => res.json())
      .then((data) => setShowOrder(data));
  }, [loggedInUser.email]);
  return (
    <div>
      <div className="productinfo">
        <h4> Your order: {showOrder.length}</h4>
            <Table responsive className=" table table-bordered border-primary ">
           {showOrder.length !== 0 &&  <thead className='table-info'>
                <tr>
                <th>Book Review</th>
                <th>Book Name</th>
                <th>Book Author</th>
                <th className='text-center'>Qty</th>
                <th className='text-center'>Cost</th>
                <th className='text-center'>Purchase Date</th>
                <th className='text-center'>Delivery Status</th>
                </tr>
            </thead>}
            <tbody>
                 {showOrder.map((order) => 
                 
                 <tr key={order._id} style={{backgroundColor:'#d0d1ff'}}>
                      <td className='text-center'><img height='80px' src={order.imageURL} alt=".."/></td>
                      <td className='align-middle'>{order.bookName}</td>
                      <td className='align-middle'>{order.authorName}</td>
                      <td className='text-center align-middle'>1</td>
                      <td className='text-center align-middle'>${order.bookPrice}</td>
                      <td className='text-center align-middle'>{order.date} </td>
                      <td className='text-center align-middle text-danger'>Paddings..</td>
                 </tr>

                 )}
            </tbody>
            <Button className="d-inline-block float-left mb-2"  variant='warning' as={Link} to={'/'}>Back To Home</Button>
            </Table>
        </div>
    </div>
  );
};

export default Order;
