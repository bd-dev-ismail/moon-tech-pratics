import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import {
  clearFilter,
  toggleBrand,
  toggleStock,
} from "../../redux/actions/filterAction";

import { loadProductData } from "../../redux/thunk/products/fetchProducts";

const Home = () => {
  const filter = useSelector((state) => state.filter);
  const { brands, stock } = filter.filters;
  const { keyword } = filter;
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductData());
  }, [dispatch]);
  // console.log(keyword, "trest");
  // console.log(filters);
  const activeClass = "text-white  bg-indigo-500 border-white";
  let content;
  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ));
  }
  if (products.length && keyword.length) {
    content = products
      .filter((product) => keyword.includes(product.brand))
      .map((product) => <ProductCard key={product.model} product={product} />);
  }
  if ((products.length && stock) || brands.length) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        }
        return product;
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        }
        return product;
      })
      .map((product) => <ProductCard key={product.model} product={product} />);
  }

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        {stock || brands.length ? (
          <button
            onClick={() => dispatch(clearFilter())}
            className={`border px-3 py-2 rounded-full font-semibold text-white  bg-red-500 border-white `}
          >
            Clear Filter
          </button>
        ) : null}
        <button
          onClick={() => dispatch(toggleStock())}
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
        >
          In Stock
        </button>
        <button
          onClick={() => dispatch(toggleBrand("amd"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          }`}
        >
          AMD
        </button>
        <button
          onClick={() => dispatch(toggleBrand("intel"))}
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
