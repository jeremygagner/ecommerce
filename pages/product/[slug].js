import React, { useState } from "react";

import { useStateContext } from "../../context/StateContext";

import { Product } from "../../components";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { client, urlFor } from "../../lib/client";


const ProductDetails = ({ product, products }) => {
  const { image, name, fillStars, reviews, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const renderStars = () => {
    let renderStars = [];
    if(fillStars > 5) {
      fillStars = 5;
    }
    let outlineStars = 5 - fillStars;
    for (let i = 0; i < fillStars; i++) {
      renderStars.push(<AiFillStar key={i}/>);
    }
    for (let i = 0; i < outlineStars; i++){
      renderStars.push(<AiOutlineStar key={fillStars + i}/>);
    }
    return renderStars;
  }

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index >= image.length ? 0 : index])} alt="product image" className="product-detail-image"/>
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img key={i} src={urlFor(item)} alt="small product images" className={i === index ? "small-image selected-image" : "small-image"} onMouseEnter={() => setIndex(i)} />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {renderStars()}
            </div>
            <p>({reviews})</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like ...</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} onClick={() => setIndex(0)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == \"product\"] {
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const productQuery = `*[_type == \"product\" && slug.current == \"${slug}\"][0]`;
  const product = await client.fetch(productQuery);

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
