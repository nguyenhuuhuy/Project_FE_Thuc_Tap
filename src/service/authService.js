import axios from "../utils/BaseAxios";
const signUp = "api/signUp";
const searchAll = "api/search/all";
const postUsers = async (user) => {
    return await axios.post(`${signUp}`, user);
};

const sigIn = "api/signIn";
const login = async (user) =>{
    return await axios.post(`${sigIn}`,user)
}

const getSearchAll= async (search)=>{
    return await axios.get(`${searchAll}?name=${search}`)
}
export { postUsers,login, getSearchAll };