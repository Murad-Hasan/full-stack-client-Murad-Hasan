import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import grid from '../../icons/grid 1.png'
import plus from '../../icons/plus 1.png'
import edit from '../../icons/edit 1.png'
import remove from '../../icons/Group 33150.png'
import update from '../../icons/Group 307.png'


const ManageBook = () => {
    const [manageBook, setManageBook] = useState([])
       
    useEffect(()=>{
        fetch('https://apricot-custard-46493.herokuapp.com/manageBook')
        .then(res => res.json())
        .then(data => setManageBook(data))
    },[])

   const deleteBook = (id) =>{
    fetch(`https://apricot-custard-46493.herokuapp.com/delete/${id}`,{
        method: "DELETE"
    })
    .then(res => alert('Deleted successfully'))
   }

    return (
        <Container className='d-flex'>
        <div className="col-xl-3 col-lg-3 col-md-3 min-vh-100 pt-5" style={{backgroundColor:"#19103F"}}>
            <div className="d-flex flex-column text-xl-left text-lg-left text-mb-left ml-xl-5 ml-lg-4 ml-md-2">
                <Link to="manageBook" className="admin-navLink my-2 font-weight-bold">
                    <img src={grid} alt=""  width='25px'/>
                    <span className='text-white ml-2'>Manage Books</span>
                </Link>
                <Link to="addBook" className="admin-navLink my-2 font-weight-bold">
                    <img src={plus} alt=""  width='25px'/>
                    <span className='text-white ml-2'>Add Book</span>
                </Link>
                <Link to="#" className="admin-navLink my-2 font-weight-bold">
                    <img src={edit} alt="" width='25px'/>
                    <span className='text-white ml-2'>Update Book</span>
                </Link>
            </div>
            </div>
          <div className="col-xl-9 col-lg-9 col-md-9 ml-2">
                        <h5 className="my-4  font-weight-bold text-left">Add Book</h5>
                            <Table striped bordered hover variant="secondary">
                                <thead>
                                  <tr>
                                    <th>Book Name</th>
                                    <th>Author Name</th>
                                    <th>Price</th>
                                    <th>Manage</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  
                                  {
                                      manageBook.map(book => <tr key={book._id}>
                                        <td>{book.bookName}</td>
                                        <td>{book.authorName}</td>
                                        <td>${book.bookPrice}</td>
                                        <td className='text-center'>
                                        <img style={{cursor:'pointer'}} className='mr-2' src={update} width='25px' alt=""/>
                                        <img style={{cursor:'pointer'}} onClick={() => deleteBook(book._id)} width='25px' src={remove} alt=""/>
                                        </td>
                                      </tr>)
                                  }
                                </tbody>
                              </Table>
                    </div>
    </Container>
    );
};

export default ManageBook;