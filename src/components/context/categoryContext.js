import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const CategoriesContext = createContext();

function CategoriesProvider({ children }) {

    const [categories, setCategories] = useState([]);


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API}/api/v1/category/allcategory`)
            .then((response) => {
                setCategories(response.data.allCategory);
                console.log("categories in context", categories);
            }).catch((error) => {
                console.error('Error fetching categories:', error);
            });
        // eslint-disable-next-line
    }, []);


    return (

        <CategoriesContext.Provider value={[categories, setCategories]}>
            {children}
        </CategoriesContext.Provider>
    );
}


const useCategories = () => useContext(CategoriesContext);


export { CategoriesProvider, useCategories };





