import axios from 'axios';
import keys from './config';

export default {

  signUp: (name, email, password) => {
    let payload = { name: name, email: email, password: password };
    return axios.post(keys.host + '/signup', payload);
  }

}