import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageSet = (selectedPage) => {
    if (selectedPage <= 0 || selectedPage > products.length / 10) return;
    setPage(selectedPage);
  };

  return (
    <div>
      {!products ? (
        <h1>Loading</h1>
      ) : (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => (
            <span key={prod.id} className="products__single">
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </div>
      )}

      {!products ? (
        <h1>Loading</h1>
      ) : (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => handlePageSet(page - 1)}
          >
            ⏮️
          </span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              className={page === i + 1 ? "page__Selected" : ""}
              key={i}
              onClick={() => handlePageSet(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={
              page < products.length / 10 ? "" : "pagination__disabled"
            }
            onClick={() => handlePageSet(page + 1)}
          >
            ⏭️
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
