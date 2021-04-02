import React, { useContext, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import './CheckOut.css'

const CheckOut = () => {
  const { id } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [book, setBook] = useState({});
  useEffect(() => {
    fetch("https://apricot-custard-46493.herokuapp.com/singlebook/"+ id)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

const handlePlaceOrder = () => {
  let today = new Date();
  let dateFormate=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
 
    const confirmOrder = {...book, ...loggedInUser, date: dateFormate}
        fetch('https://apricot-custard-46493.herokuapp.com/addorder', {
          method: 'POST' ,
          headers: {
              'content-type' : 'application/json'
          },
          body: JSON.stringify(confirmOrder)
      })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if (data) {
          alert('Order Placed')
        }
    })
}

  return (
    <div className="table-container">
      <Table striped bordered hover className='table table-striped table-responsive-md'>
          <thead className="table-success">
          <tr>
            <th className="text-center">Book Cover Page</th>
            <th className="text-center">Book Name</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center"><img src={book.imageURL || 'Book Cover'} alt="Book Cover" height="300px" width="200px"/></td>
            <td className='align-middle text-center'><h3>{book.bookName || "Nothing Add"}</h3> </td>
            {book.bookName ? <td className="text-center align-middle">1</td>:<td className="text-center align-middle">0</td>}
            <td className="text-center align-middle">${book.bookPrice || 0}</td>
          </tr>
          <tr className="table-success">
            <td colSpan="3">Total</td>
            <td className="text-center">${book.bookPrice || 0} </td>
          </tr>
        </tbody>
      </Table>

    {
      book.bookName && <Button className="d-inline-block float-right" onClick={handlePlaceOrder}>Place Order</Button>
    }
    <Button className="d-inline-block float-left mb-2"  variant='danger' as={Link} to={'/'}>Cancel</Button>
      
    </div>
  );
};

export default CheckOut;
