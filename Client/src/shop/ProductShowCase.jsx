import React, { useState } from "react";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";

const title = "Our Products";

const ProductData = [
  {
    imgUrl: "src/assets/images/categoryTab/02.jpg",
    category: "Electronics",
    title: "Charger",
    author: "",
    brand: "Oraimo",
    price: "300",
    id: 1,
  },
  {
    imgUrl: "src/assets/images/categoryTab/03.jpg",
    category: "Compsnlaps",
    title: "DELL Probook",
    author: "",
    brand: "DELL",
    price: "40,000",
    id: 2,
  },
  {
    imgUrl: "src/assets/images/categoryTab/04.jpg",
    category: "Phones",
    title: "Samsung A40",
    author: "",
    brand: "Samsung",
    price: "24,000",
    id: 3,
  },
  {
    imgUrl: "src/assets/images/categoryTab/05.jpg",
    category: "Stationaries",
    title: "HB Charcoal Pencil",
    author: "",
    brand: "HB",
    price: "20",
    id: 4,
  },
  {
    imgUrl: "src/assets/images/categoryTab/06.jpg",
    category: "Clothing",
    title: "Sweater",
    author: "",
    brand: "English Sweater",
    price: "1200",
    id: 5,
  },
  {
    imgUrl: "src/assets/images/categoryTab/07.jpg",
    category: "E-Waste",
    title: "Flower Cable",
    author: "",
    brand: "Frankos Burger",
    price: "30",
    id: 6,
  },
  {
    imgUrl: "src/assets/images/categoryTab/08.jpg",
    category: "General Goods",
    title: "",
    author: "",
    brand: "",
    price: "",
    id: 7,
  },
  {
    imgUrl: "src/assets/images/categoryTab/09.jpg",
    category: "Electronics",
    title: "VGA cable ",
    author: "",
    brand: "",
    price: "300",
    id: 8,
  },
  {
    imgUrl: "src/assets/images/categoryTab/10.jpg",
    category: "Compsnlaps",
    title: "HP Elitebook Folio 9470m",
    author: "",
    brand: "HP",
    price: "30,000",
    id: 9,
  },
  {
    imgUrl: "src/assets/images/categoryTab/11.jpg",
    category: "Phones",
    title: "Redmi",
    author: "",
    brand: "Redmi",
    price: "12,000",
    id: 10,
  },
  {
    imgUrl: "src/assets/images/categoryTab/12.jpg",
    category: "Stationaries",
    title: "BAOKE OFFICE gel ink pen PC-1048",
    author: "",
    brand: "BAOKE",
    price: "140",
    id: 11,
  },
  {
    imgUrl: "src/assets/images/categoryTab/13.jpg",
    category: "Clothing",
    title: "Grey Sweat Shirt",
    author: "",
    brand: "sweatshirt",
    price: "400",
    id: 12,
  },
];

const ProductShowCase = () => {
  const [items, setItems] = useState(ProductData);

  //category based filtering
  const filterItem = (categoryItem) => {
    const updateItems = ProductData.filter((curElem) => {
      return curElem.category === categoryItem;
    });

    setItems(updateItems);
  };

  return (
    <div className="course-section style-3 padding-tb ">
      {/* shapes */}
      <div className="course-shape one">
        <img src="/src/assets/images/shape-img/icon/01.png" alt="" />
      </div>
      <div className="course-shape two">
        <img src="/src/assets/images/shape-img/icon/02.png" alt="" />
      </div>

      {/* main section */}
      <div className="container">
        {/* section header */}
        <div className="section-header">
          <h2 className="title">{title}</h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={() => setItems(ProductData)}>All</li>
              <li onClick={() => filterItem("Electronics")}>Electronics</li>
              <li onClick={() => filterItem("Compsnlaps")}>
                Computers and Laptops
              </li>
              <li onClick={() => filterItem("Phones")}>Phones</li>
              <li onClick={() => filterItem("Stationaries")}>Stationaries</li>
              <li onClick={() => filterItem("Clothing")}>Clothing</li>
              <li onClick={() => filterItem("E-Waste")}>E-Waste</li>
              <li onClick={() => filterItem("Generalgoods")}>General Goods</li>
            </ul>
          </div>
        </div>

        {/* section body */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">
            {items.map((product) => (
              <div key={product.id} className="col">
                <div className="course-item style-4">
                  <div className="course-inner">
                    <div className="course-thumb">
                      <img src={product.imgUrl} alt="" />
                      <div className="course-category">
                        <div className="course-cate">
                          <a href="#">{product.category}</a>
                        </div>
                        <div className="course-review">
                          <Rating />
                        </div>
                      </div>
                    </div>

                    {/* content */}
                    <div className="course-content">
                      <Link to={"/shop/${product.id}"}>
                        <h5>{product.title}</h5>
                      </Link>
                      <div className="course-footer">
                        <div className="course-author">
                          <Link to="/" className="ca-name">
                            {product.brand}
                          </Link>
                        </div>
                        <div className="course-price">{product.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowCase;
