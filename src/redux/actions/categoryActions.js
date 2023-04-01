import axios from "axios";
import { FETCH_CATEGORIES, NEW_CATEGORY } from "./types";
import { Constants } from "../../constants/environment";

export const fetchCategories = () => dispatch => {
  axios
    .get(
      Constants.BASE_URL +
        `api/categories/location/home/5a6ec0b328d7b9001499a144`
    )
    .then(categories =>
      dispatch({
        type: FETCH_CATEGORIES,
        payload: categories.data
        //payload: categories.data.slice(0,10) //get first 10
      })
    );
};

export const createCategory = postData => dispatch => {
  console.log("action called- createCategory", postData);
  axios
    .post(Constants.BASE_URL + `api/categories/`, postData, {
      headers: {
        "content-type": "application/json"
      }
    })
    .then(newCategory =>
      dispatch({
        type: NEW_CATEGORY,
        payload: newCategory
      })
    )
    .catch(function(error) {
      console.log("ERROR", error);
    });
};

// export const createCategory = postData => dispatch => {
//   console.log("action called- createCategory", postData);
//   axios
//     .post(BASE_URL + `api/categories/`, {
//       method: "POST"
//       //payload: JSON.stringify(postData),
//       // headers: {
//       //   "content-type": "application/json"
//       // }
//     })
//     //.then(res => res.json)
//     .then(newCategory =>
//       dispatch({
//         type: NEW_CATEGORY,
//         payload: newCategory
//       })
//     )
//     .catch(function(error) {
//       console.log("ERROR", error);
//     });
// };
//console.log("postData", res);
