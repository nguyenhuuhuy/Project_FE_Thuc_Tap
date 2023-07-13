export default function authHeader(){
    const token = sessionStorage.getItem('Token_Key');
    if(token != null){
        return  { Authorization: `Bearer ${token}`};
    } else{
        return null;
    }
}