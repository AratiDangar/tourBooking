import React, { useEffect } from 'react'
import '../styles/tour-detail.css'
import { Container,Row,Col,Form,ListGroupItem,ListGroup } from 'reactstrap'  

import { useRef,useState,useContext } from 'react'
import tourData from '../assets/data/tours'
import calculateAvgRating from '../utils/avgRating'
import avtar from '../assets/images/avatar.jpg'
import Booking from '../Components/Booking/Booking'
import {  useParams, useNavigate } from 'react-router-dom';
import Newsletter from '../Shared/Newsletter'
import useFetch from './../Hooks/useFetch'
import {BASE_URL} from './../utils/config'
import {AuthContext} from './../Context/AuthContext'
import axios from 'axios';


const TourDetail = () => {
   const [tour,setTour]=useState([])

  const { id } = useParams();
  const navigate = useNavigate();

  
  //const tour =tourData.find(tour=>tour.id===id)
const reviewMsgRef=useRef('')
const [tourRating,setTourRating]=useState(null);
const {user}=useContext(AuthContext)


//fetch data from database

//const {data:tour,loading,error}=useFetch(`${BASE_URL}/tours/${_id}`)

useEffect(() => {
  axios
    .get(`${BASE_URL}/tours/${id}`)
    .then((res) => {
      setTour(res.data)
      
    })
    .catch((err) => {
      
      console.log('Error from ShowDetails');
    });
}, [id]);


  //const tour=tourData.find(tour=>tour.id===id)
//destructer property from tour object
//const {photo,title,desc,price,address,reviews,city,distance,maxGroupSize}=tour ;

const {reviews}=tour;
const {totalRating,avgRating}=calculateAvgRating(reviews);

//formate date
const options={day:'numeric',month:'long',year:'numeric'}

//submit request to the server

const submitHandler=async e=>{
e.preventDefault()

const reviewText=reviewMsgRef.current.value

try {
  if(!user ||user===undefined||user===null){
    alert('Please sign in')
  }
  const reviewObj={
    username:user?.username,
    reviewText,
    rating:tourRating
  }
  const res=await fetch(`${BASE_URL}/review/${id}`,{
    method:'post',
    headers:{
      "content-type":"application/json",
   
    },
    credentials:'include',
    body:JSON.stringify(reviewObj),
  });

  const result=await res.json()
  if(!res.ok) {
    return alert(result.message)}

  alert(result.message)
  
} catch (err) {
  alert(err.message);
  
}


};

useEffect(()=>{
  window.scrollTo(0,0);
},[tour])



return (
    <div>
      <section>
        <Container>
         <Row>
          <Col lg='8'>
            <div className="tour_content">
            <img src={tour.photo} alt="" />
              <div className="tour_info">
               <h2>{tour.title}</h2> 
               <div className='d-flex align-items-center gap-5'>
               <span className="tour_rating d-flex align-items-center gap-1">
          <i class='ri-star-fill'></i>
        
          
          {avgRating===0 ? null:avgRating}
          {totalRating===0 ?( 'Not rated'):(<span>({reviews?.length})</span>)}
           
      </span>

      <span>
        <i class='ri-map-pin-fill'></i>{tour.address}
      </span>
               </div>
               <div className="tour_extra-details">
                <span>
                  <i class='ri-map-pin-2-line'></i>{tour.city}
                </span>
                <span>
                  <i class='ri-money-dollar-circle-line'></i>${tour.price} /per person
                </span>
                <span>
                  <i class='ri-map-pin-time-line'></i>{tour.distance} k/m
                </span>
                <span>
                  <i class='ri-group-line'></i>{tour.maxGroupSize} people
                </span>
               </div>
               
                <h5>Description</h5>
                <p>
                  {tour.desc}
                </p>
               
              </div>
              {/*======tour review section ======*/}
              
              <div className="tour_reviews mt-4">
                <h4>Reviews({reviews?.length}reviews)</h4>

                <Form onSubmit={submitHandler}>
                  <div className="rating_group d-flex align-iems-center  gap-3 mb-4  ">
                  <span onClick={()=> setTourRating(1)}> 1<i class='ri-star-s-fill'></i></span>
                  <span onClick={()=> setTourRating(2)}>2 <i class='ri-star-s-fill'></i></span>
                  <span onClick={()=> setTourRating(3)}>3<i class='ri-star-s-fill'></i></span>
                  <span onClick={()=> setTourRating(4)}>4<i class='ri-star-s-fill'></i></span>
                  <span onClick={()=> setTourRating(5)}>5<i class='ri-star-s-fill'></i></span>
                  </div>
                  <div className="reviews_input">
                    <input ref={reviewMsgRef} required type="text" placeholder='share your thoughts' />
                    <button type="submit" className='btn primay_btn text-white'>Submit</button>
                  </div>
                </Form>
                <ListGroup className='user_reviews'>
                   {
                    reviews?.map(reviews=>(
                      <div className="review_item">
                        <img src={avtar} alt="" />
                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                           <div>
                            <h5>{reviews.username}</h5>
                            <p>
                              {new Date(reviews.createdAt).toLocaleDateString('en-US',options)}
                            </p>
                           </div>
                           <span className='d-flex align-items-center'>
                            {reviews.rating}<i class='ri-star-s-fill'></i>
                           </span>
                          </div>
                          <h6>{reviews.reviewText}</h6>
                        </div>
                      </div>
                    ))
                   }
                </ListGroup>
              </div>
            </div>
          </Col>
          <Col lg='4'>
            <Booking tour={tour} avgRating={avgRating}/>
          </Col>
        </Row>
         
        </Container>
      </section>
      <Newsletter/>
    </div>
  )
}

export default TourDetail
/*{loading && <h4 className='text-center pt-5'>Loading....</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}  
         {
          !loading && !error &&  
          
          
          {avgRating===0 ? null:avgRating}
          {totalRating===0 ?( 'Not rated'):(<span>({tour.reviews?.length})</span>)}
          */