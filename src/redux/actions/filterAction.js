import {
  CLEAR_FILTER,
  SEARCH_PRODUCT,
  TOGGLE_BRAND,
  TOGGLE_STOCK,
} from "../actionTypes/actionTypes";

export const toggleBrand = (brandName) => {
  return {
    type: TOGGLE_BRAND,
    payload: brandName,
  };
};

export const toggleStock = () => {
  return {
    type: TOGGLE_STOCK,
  };
};

export const clearFilter = () => {
  return {
    type: CLEAR_FILTER,
  };
};
export const searchProduct = (productName) => {
  return {
    type: SEARCH_PRODUCT,
    payload: productName,
  };
};
