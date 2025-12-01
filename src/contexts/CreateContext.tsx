
import React, { useState, useEffect, useRef } from "react";
import { CreateContext } from "./useCreate";

import { BounceLoader } from "react-spinners";
import { db } from '../firebase/index'
import { collection, getDocs } from "firebase/firestore";

const CreateContextProvider: React.FC<{ children: React.ReactNode }> = (props: { children: React.ReactNode }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [productOption, setProductOption] = useState(null);
  const [singleProduct, setSingleProduct] = useState(null);
  const [productCategories, setGlobalCategories] = useState([]);
  const [allProducts, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [cartShowing, setCartShowing] = useState(false)
  const [location, setLocation] = useState();
  const [prodId, setProdId] = useState(null);
  const [yScrolling, setYScrolling] = useState(false)


  const currentLocation = useRef('')


  let emptyArr = []

  useEffect(() => {

    const categories: string[] = ['t-shirts', 'troussers', 'jackets']

    categories.forEach(cat => {

      const getData = () => new Promise((resolve, reject) => {
        resolve(getDocs(collection(db, cat)))
      })


      getData.apply(this)
        .then(res => {
          res.forEach((doc) => {
            if (!emptyArr.includes(doc.data())) emptyArr.push({ ...doc.data(), qty: 0 })
          })
          setProducts(emptyArr)
        }
        )
        .catch(err => console.log(err))
    })

    return () => {
      emptyArr = []
    }

  }, [])



  useEffect(() => {

    // Getting search string from local Storage on reload in search-results-route when all products available
    if (
      allProducts.length > 10 &&
      (location === "/search-results" || location === "/cms/search-results") &&
      searchString === ""
    ) {
      if (localStorage.getItem("search")) setSearchString(JSON.parse(localStorage.getItem("search")))
      else { setSearchString(' ') }
    }


  }, [allProducts]);

  // SIDE EFFECT FOR UPDATING SEARCH RESULTS

  useEffect(() => {

    setSearchResults([]);

    if (allProducts.length > 0 && searchString) {
      const prodsDummy = []
      allProducts.forEach((product) => {
        if (
          (product.name.includes(searchString.toLowerCase())) ||
          (product.description.toLowerCase()
            .includes(searchString.toLowerCase())) ||
          (product.category.toLowerCase().includes(searchString.toLowerCase()))
        ) {
          prodsDummy.push(product)
        }
      });
      console.log(`search res: ${prodsDummy}`)
      // New search results matching new search string
      setSearchResults(prodsDummy);
    }
  }, [searchString]);

  useEffect(() => {
    if (location !== currentLocation.current) {
      currentLocation.current = location; setYScrolling(true); setTimeout(() => {
        setYScrolling(false)
      }, 1000)
    }
  }, [location])

  const contextValues = {
    Provider: CreateContext.Provider,
    Consumer: CreateContext.Consumer,
    children: props.children as React.ReactNode,
    setImageUrl,
    imageUrl,
    setProductOption,
    productOption,
    setSingleProduct,
    singleProduct,
    productCategories,
    setGlobalCategories,
    setSearchString,
    allProducts,
    searchResults,
    setSearchResults,
    setProdId,
    setLocation,
    searchString,
    setProducts,
    location, setYScrolling,
    yScrolling,
    loading,
    cartShowing,
    setCartShowing,
    prodId
  };


  return (
    <CreateContext.Provider value={contextValues}>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <BounceLoader color={"#888"} size={100} />
        </div>
      )}
      {!loading && props.children}
    </CreateContext.Provider>
  );
};

export { CreateContext, CreateContextProvider as default };
