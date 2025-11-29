
import { createContext, useContext } from "react";

type Product = {
    id: string,
    name: string,
    price: number,
    thumbnail: string,
    category: string,
    description: string,
    attLink: string,
    attribution: string
}
export type CreateContextProps = {
    Provider: React.FC,
    Consumer: React.FC,
    children: React.ReactNode,
    setImageUrl: React.Dispatch<React.SetStateAction<string>>;
    imageUrl: string;
    setProductOption: React.Dispatch<React.SetStateAction<string>>;
    productOption: string;
    setSingleProduct: React.Dispatch<React.SetStateAction<string>>;
    singleProduct: string;
    productCategories: { name: string }[];
    setGlobalCategories: React.Dispatch<React.SetStateAction<{ name: string }[]>>;
    setSearchString: React.Dispatch<React.SetStateAction<string>>;
    allProducts: Product[];
    searchResults: Product[];
    setSearchResults: React.Dispatch<React.SetStateAction<Product[]>>;
    prodId: string;
    setProdId: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    location: string;
    setYScrolling: React.Dispatch<React.SetStateAction<boolean>>;
    yScrolling: boolean;
    loading: boolean;
    cartShowing: boolean;
    setCartShowing: React.Dispatch<React.SetStateAction<boolean>>;
}


export const CreateContext = createContext<CreateContextProps>({} as CreateContextProps);

export const useCreate = function () {
    return useContext(CreateContext);
};