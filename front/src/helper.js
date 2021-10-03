import axios from "axios";
// let baseUrl = "http://localhost:5000/api"
let baseUrl = "/api";
export const Send = async (method, url, data) => {
	let response =  await axios({
		method,
		data,
		url: baseUrl + url,
	})
    return response.data
};
