import axios from "axios";

const instance = axios.create({
    baseURL: "https://slot-booking-a66ce.firebaseio.com/"
});

export default instance;