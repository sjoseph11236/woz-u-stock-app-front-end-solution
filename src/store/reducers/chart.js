import axios from 'axios';
import colorize from '../../script/helper';
/**
 * ACTION TYPES
 */
const GOT_CHART = 'GOT_CHART';

/**
 * INITIAL STATE
 */

const initialState = { 
  chart: [],
}

/**
 * ACTION CREATORS
 */

const gotChart = chart => {
  return { 
    type: GOT_CHART,
    chart
  }
}


/**
 * THUNK CREATORS
 */
export const getChartThunk = (symbols = 'aapl,amzn,fb,msft') => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/iex/stock/${symbols}`);
      const colorizedData = colorize(data);
      dispatch(gotChart(colorizedData));
    } catch (error) {
      console.error(error);
    }
  };
}

const chart = (state = initialState, action) => {
  switch(action.type) {
    case GOT_CHART:
      return { ...state, chart: action.chart };
    default:
      return state;
  }
};

export default chart;