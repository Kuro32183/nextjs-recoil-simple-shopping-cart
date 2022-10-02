/* --- libs --------------------------------------------------------------------------------------------------------- */
import { NextPage } from "next";
import { useEffect, useState } from "react";

/* --- assets -------------------------------------------------------------------------------------------------------- */
import styles from "./Home.module.scss";

/* --- types --------------------------------------------------------------------------------------------------------- */
import { Product } from "../types/Product";

/* --- components ---------------------------------------------------------------------------------------------------- */
import { ProductCard } from "../components/molecules/ProductCard/ProductCard";

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // クライアント側から非同期で呼びだし、ProductCardコンポーネントに取得した値を展開
  async function getProducts() {
    const res = await fetch("https://my-json-server.typicode.com/kuro32183/nextjs-json-server/products");
    const products = await res.json();
    setProducts(products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.heading}>商品一覧</h1>

      <div className={styles.cardsFlow}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
