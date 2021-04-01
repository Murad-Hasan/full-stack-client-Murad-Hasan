import React, { useEffect, useState } from 'react';
import { Button, Form, FormControl, Spinner } from 'react-bootstrap';
import BookCollection from '../BookCollection/BookCollection';

const Home = () => {
    const [showBook , setShowBook] = useState([]);
    useEffect(()=>{
        fetch('https://apricot-custard-46493.herokuapp.com/books')
        .then(res => res.json())
        .then(data => setShowBook(data))
    },[])
    return (
        <div className='background'>
            <div className="container">
            <h2 className="my-4 text-center">ALL PROGRAMMING BOOK IS HERE</h2>
                <div className="my-5 d-flex justify-content-center">
                    <Form inline>
                        <FormControl type="text" placeholder="Search...." />
                        <Button className="ml-2" variant="primary">Search</Button>
                    </Form>
                </div>
                <div className="row justify-content-center"> 
                {
                    showBook.length === 0 && <Spinner animation="grow" variant="success" />
                }  
                {
                    showBook.map( book => <BookCollection  key = {book._id} book={book}></BookCollection> )
                }
                </div>
                </div>
        </div>
    );
};

export default Home;