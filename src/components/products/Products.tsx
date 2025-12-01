import { useEffect } from "react";
import { useLocation } from "react-router";
import ProductsGrid from "./ProductsGrid";

import { useCreate } from "../../contexts/useCreate";

interface ProductsProps {
  onLoad?: (e: Event) => void;
  type: string
  // other props...
}


const Products: React.FC<ProductsProps> = ({ type }) => {

  const { allProducts, setLocation } = useCreate()
  const location = useLocation()

  const products = allProducts.filter(prod => prod.category === type)

  useEffect(() => {
    setLocation(location.pathname)
  }, [location])

  return (
    <>
      <ProductsGrid type={type} products={products} />
    </>
  );
};

export default Products;
