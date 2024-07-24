import React from "react";
import { Link } from "react-router-dom";
import { RiTimeLine, RiGroupLine, RiFileList2Line } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { cartContext, useCart  } from "./context/cartContext";
import toast from "react-hot-toast";
import '../styles/card.css'
const CourseCard = (props) => {
  const {
    title,
    price,
    _id,
    slug,
    description
  } = props.products;

  console.log("card products",props.products)
  
  const [cart, setCart] = useCart();

  const checkCart = async (p, id) => {
    try {
        const myCart = [...cart];
        let check = -1;
        if (myCart) {
            check = myCart.findIndex((item) => item._id === id);
        }

        if (check === -1) {
            setCart([...cart, p]);
            localStorage.setItem('cart', JSON.stringify([...cart]));
            toast.success("Product added in cart successfully");
        }

        else {
            toast.error("Product is already in cart go and check");
        }
    }
    catch (err) {
        console.log(err);
    }
}
  

  return (
    <div className="col-12 col-sm-12 col-md-6 col-xl-4 col-lg-4">
      <div className="edu-card card-type-2 radius-small " data-aos="fade-up">
        <div className="inner">
          <div className="thumbnail">
            <Link to={`/courseDetails/${_id}`}>
              <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${_id}`} alt={title} />
            </Link>
            <div className="wishlist-top-right">
              <button className="wishlistbtn">
                <FaRegHeart />
              </button>
            </div>
          </div>
          <div className="content">

            <h6 className="title">{title}</h6>

            <div className="card-bottom">
              <div className="price-list">
                <div className="price current-price">
                  {Number(price) ? `$${price}.00 USD` : `${price}`}
                </div>
                <div className="price old-price"></div>
              </div>
              <div className="buyButton">
                <Link to={`/product/${slug}`}>Buy</Link>
              </div>
              <button className='btn btn-primary ms-1' onClick={() => {
                                              checkCart(props.products, _id)
                        }}>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
