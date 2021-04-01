import React from 'react';
import { Link } from 'react-router-dom';
import './BookCollection.css'

const BookCollection = (props) => {
    const { _id, authorName, imageURL, bookPrice,bookName } = props.book;



  return (
    <div className="col-xl-3 col-lg-4 col-md-5 single-activity my-3">
        <img src={imageURL} alt="" className="img-fluid max-width: 50% height: 50%" />
        <h5>{bookName}</h5>
        <p>{authorName}</p>
        <div className="d-flex justify-content-between align-items-center">
        <h4 style={{color: '#6946F4'}}>${bookPrice}</h4> 
       <Link to ={`/checkout/${_id}`} ><button  className="snip0040 red"><span>Buy Now</span><i className="ion-ios-cart"></i></button></Link> 
        </div>
        </div>
  );
};

export default BookCollection;