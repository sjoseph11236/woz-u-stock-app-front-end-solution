import axios from 'axios';
import history from '../../history';
/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const PURCHASE = 'PURCHASE';


/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});
const purchase = amount =>({type: PURCHASE, amount});
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
};

export const auth = (name, email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { name, email, password });
    dispatch(getUser(res.data))
    history.push('/');
  } catch (authError) {
    console.error(authError);
    dispatch(getUser({error: authError}))
    setTimeout(() => {
      dispatch(getUser({error: ''}));
    }, 3000);
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/signin');
  } catch (err) {
    console.error(err)
  }
}

export const purchaseThunk = amount => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const difference = user.cash - amount;
    const { data } = await axios.put(`/api/user/${user.id}`, { cash: difference });
    dispatch(purchase(data.cash));
  } catch (err) {
    console.error(err);
  }
}

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case PURCHASE:
      return {...state, cash: action.amount }; 
    default:
      return state;
  }
}

export default user;