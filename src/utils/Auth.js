const { default: axios } = require("axios");

module.exports.isLoggedIn = () => {
    return Promise(async (resolve, reject) => {
        let token = localStorage.getItem("auth");

        if (token) {
            try {
                const res = await axios.get(process.env.REACT_APP_BACKEND_API + "profile", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
                console.log('response', res.data);
                resolve();
            } catch (err) {
                console.log('Error ', err.response);
                reject();
            }
        }else{
            reject()
        }
    })
    
}