const { default: axios } = require("axios");

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const READ_SESSIONID = () => {
    axios.get("/api/users/sessionid")
        .then((response) => {
            console.log(response)
            return response
        })
        .catch((e) => console.log(e));
};

module.exports = {
    EMAIL_REGEX,
    READ_SESSIONID,
}