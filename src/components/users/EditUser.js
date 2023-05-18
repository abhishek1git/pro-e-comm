import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    file: "",
    category: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const { title, price, file, category, description } = product;
  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.title]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      product.title &&
      product.price &&
      product.file &&
      product.category &&
      product.description
    ) {
      await axios.patch(`https://fakestoreapi.com/products/${id}`, product);
      navigate.push("/");
    } else {
      setFormErrors(validate(product));
    }
  };

  const loadUser = async () => {
    const result = await axios.get(`https://fakestoreapi.com/products/${id}`);
    setProduct(result.data);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.price) {
      errors.price = "Price is required";
    }

    if (!values.file) {
      errors.file = "file is required";
    }
    if (!values.category) {
      errors.category = "Category is required";
    }
    if (!values.description) {
      errors.website = "Description is required";
    }
    return errors;
  };

  return (
    <div className="container bg-secondary">
      <div className="w-75 mx-auto shadow p-5">
        <br></br>
        <h1 className="text-center mb-4">
          <strong>Update Products</strong>
        </h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group row mt-1">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Products name"
              name="name"
              value={product.ti}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <p>{formErrors.name}</p>
          <div className="form-group row mt-1">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Product Title"
              name="title"
              value={product.title}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <p>{formErrors.title}</p>
          <div className="form-group row mt-1">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Price"
              name="price"
              value={product.price}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <p>{formErrors.price}</p>
          <div className="form-group row mt-1">
            <input
              type="file"
              className="form-control form-control-lg"
              placeholder="Upload Image"
              name="file"
              value={product.file}
              onChange={(e) => onInputChange(e)}
              id="formFileLg"
            />
          </div>
          <p>{formErrors.phone}</p>

          <div className="form-group row mt-1">
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              name="category"
              value={product.category}
              onChange={(e) => onInputChange(e)}
            >
              <option selected>Category</option>
              <option value="1">Clothing & Apparel</option>
              <option value="2">Electronics & Gadgets</option>
              <option value="3">Footwear & Shoes</option>
              <option value="4">Games & Toys</option>
              <option value="5">Veterinary & Pet Items</option>
            </select>
          </div>

          <p>{formErrors.category}</p>
          <div className="form-group row mt-1">
            <div class="form-outline">
              <textarea
                className="form-control form-control-lg"
                id="textAreaExample1"
                rows="4"
                placeholder="Enter Product Description"
                name="description"
                value={product.description}
                onChange={(e) => onInputChange(e)}
              ></textarea>
            </div>
          </div>
          <p>{formErrors.description}</p>
          <br></br>
          <button className="btn btn-primary btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
