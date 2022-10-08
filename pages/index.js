import React from "react";

import { client } from "../lib/client";

import { Product, HeroBanner, FooterBanner } from "../components";

const Home = ({ products, banner }) => (
  <>
    <HeroBanner banner={banner.length && banner[0]}/>
    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers for every occasion</p>
    </div>
    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product}/>)}
    </div>
    <FooterBanner banner={banner && banner[0]}/>
  </>
);

// export const getServerSideProps = async () => {
//   const productQuery = "*[_type == \"product\"]";
//   const products = await client.fetch(productQuery);

//   const bannerQuery = "*[_type == \"banner\"]";
//   const banner = await client.fetch(bannerQuery);

//   return {
//     props: { products, banner},
//   }
// }

export default Home;
