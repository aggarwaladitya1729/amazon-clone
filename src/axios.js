import axios from "axios" ;

const instance = axios.create({     // creating instance of axios
    baseURL : "Optional" , // ye baseURL create karne se humein baar baar shuru ka nahi likhna padega jab bhi hum koi request karenge
})                                  // Eg : https://google.com ko hum base url bana dete hain aur agar kabhi bhi https://google.com/india/states jaisa kuch request karna ho to wo hum india/states karke kar sakenge 

export default instance ;