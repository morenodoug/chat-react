import fetch from 'isomorphic-fetch';

export const SET_USER_INFO = "SET_USER_INFO";

export function setUserInfo(user) {
    return {
        type: SET_USER_INFO,
        user
    }
}





export function signUP(name, email, password) {
    console.log(`name:${name}  email:${email} password:${password}`);

    return (dispatch, getState) => {

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let init = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                name,
                email,
                password
            }),
            mode: 'no-cors',

        }

        // fetch('http://localhost:1337/signup', init).then((response) => {
        //     response.json();
        // }).then((response) => {
        //     console.log(response);
        // })

    }
}