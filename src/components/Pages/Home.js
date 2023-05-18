import React, { useEffect, useState } from "react";
import Products from "../Layout/Products";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: "DELETE",
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="text-xs text-green-500 tracking-widest font-medium title-font mb-1">
          Products
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Latest Products
        </h1>
      </div>
      {products.length > 0 ? (
        <Products products={products} />
      ) : (
        <div>Loading...</div>
      )}
      <Products />

      <div>
        <div className="container bg-darken-sm">
          <div className="py-4 border">
            <br></br>
            <div>
              <h1 className="marquee">Product Details</h1>
            </div>

            <table class="table border shadow border-dark">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">File</th>
                  <th scope="col">Category</th>
                  <th scope="col">Description</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>

                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.file}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>
                      <Link
                        class="btn btn-primary mr-2"
                        to={`/products/${product.id}`}
                      >
                        View
                      </Link>
                      <Link
                        class="btn btn-outline-primary mr-2"
                        to={`/product/edit/${product.id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        class="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
