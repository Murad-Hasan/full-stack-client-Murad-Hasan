import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import grid from '../../icons/grid 1.png'
import plus from '../../icons/plus 1.png'
import edit from '../../icons/edit 1.png'
import axios from 'axios';

const AddBook = () => {
    const { register, handleSubmit, errors } = useForm();
    
    const [imageURL, setImageURL] = useState(null)
  const onSubmit = (data) => {
      const eventData = {
          bookName: data.bookName,
          authorName: data.authorName,
          bookPrice: data.price,
          imageURL: imageURL
      }

 const url = `https://apricot-custard-46493.herokuapp.com/addBook`
      fetch(url, {
          method: 'POST' ,
          headers: {
              'content-type' : 'application/json'
          },
          body: JSON.stringify(eventData)
      })
      .then(res => {
        alert('Add Successfully')
      })
      .catch(err => console.log(err))
  };
 
  

  const handleImageUpload = e => {
    const imageData = new FormData();
    imageData.set('key', 'a7830263a82f0da54bd53c2554320a79');
    imageData.append('image', e.target.files[0])
   //axios 
    axios.post('https://api.imgbb.com/1/upload', imageData)
    .then(res=> {
        setImageURL(res.data.data.url)
        console.log('image Uploaded Successfully', res.data.data.url)
    })
    .catch(err => console.log(err))
  }

    return (
        <Container className='d-flex'>
            <div className="col-xl-3 col-lg-3 col-md-3 min-vh-100 pt-5" style={{backgroundColor:"#19103F"}}>
                <div className="d-flex flex-column text-xl-left text-lg-left text-mb-left ml-xl-5 ml-lg-4 ml-md-2">
                    <Link to="managebook" className="admin-navLink my-2 font-weight-bold">
                        <img src={grid} alt=""  width='25px'/>
                        <span className='text-white ml-2'>Manage Books</span>
                    </Link>
                    <Link to="#" className="admin-navLink my-2 font-weight-bold">
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                <label htmlFor="bookName">Book Name:</label>
                                <input className='form-control' name="bookName" placeholder='Book Name' ref={register({ required: true })} /> <br/>
                                <label htmlFor="authorName">Author Name:</label>
                                <input className='form-control' name="authorName" placeholder='Author Name' ref={register({ required: true })} /> <br/>
                                <label htmlFor="price">Add Price:</label>
                                <input className='form-control' name="price" placeholder='Price' type='number' ref={register({ required: true })} /> <br/>
                                <label htmlFor="image">Upload Cover Photo:</label>
                                <input className='form-control-file' name="image" onChange={handleImageUpload} type="file" ref={register()} /> <br/>
                                {errors.exampleRequired && <span>This field is required</span>}
                                <input type="submit"  className="bg-success border-0 rounded px-3 py-2"/>
                                </form>
                        </div>
        </Container>
    );
};

export default AddBook;