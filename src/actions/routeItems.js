export const fetchItems = (term) => {
  console.log("fetch data ", term);
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:4000/get-routes/${term}`);
      if (!response.ok) {
        console.log("response, ", response);
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data, "data");
      if (data) dispatch({ type: "FETCH_ROUTE", payload: data.resultData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const updateStatus = (updateItem) => {
  console.log("update status ", updateItem);
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:4000/update-routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateItem),
      });
      if (!response.ok) {
        return { status: response.status, msg: "Error updating route status." };
      }
      const data = await response.json();
      console.log(data, "response from update status ");
      if (data) {
        dispatch({ type: "UPDATE_ROUTE", payload: updateItem });
        return { status: response.status, msg: "Route Status Updated." };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
