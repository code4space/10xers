import axios from "axios";
import { GET_ITEMS, TOKEN, GET_DETAILS, STATS } from "./typeAction";

export const getItems = (payload) => {
  return {
    type: GET_ITEMS,
    items: payload,
  };
};

export const getDataItems = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: "https://api-generator.retool.com/j3Iz08/collections",
        method: "GET",
      });
      dispatch(getItems(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetail = (payload) => {
  return {
    type: GET_DETAILS,
    detail: payload,
  };
};

export const getDetailItem = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: "https://api-generator.retool.com/j3Iz08/collections/" + id,
        method: "GET",
      });
      dispatch(getDetail(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getTokens = (payload) => {
  return {
    type: TOKEN,
    tokens: payload,
  };
};

export const getDataTokens = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: "https://api-generator.retool.com/jlEsLB/wallet_content",
        method: "GET",
      });
      dispatch(getTokens(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const getStats = (payload) => {
  return {
    type: STATS,
    stats: payload,
  };
};

export const getDataStats = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios({
        url: "https://api-generator.retool.com/ELI42D/collection_stats?collection_id="+id,
        method: "GET",
      });
      dispatch(getStats(data));
    } catch (err) {
      console.log(err);
    }
  };
};