import axios from "../utils/BaseAxios";
const signUp = "api/signUp";
const postUsers = async (user) => {
    return await axios.post(`${signUp}`, user);
};

const sigIn = "api/signIn";
const login = async (user) =>{
    return await axios.post(`${sigIn}`,user)
}
export { postUsers,login };