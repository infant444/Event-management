
const BASE_URL='http://localhost:5000';



// Event
export const ADD_EVENT=BASE_URL+"/api/event/addevent";
export const LIST_EVENT=BASE_URL+"/api/event/listAll";
export const UPDATE_EVENT_STATUS=BASE_URL+"/api/event/update";
export const GET_ALL_EVENT_CATEGORIES=BASE_URL+"/api/event/event-categories/getall";



// User
export const CHECK_USER=BASE_URL+"/api/user/check-username/";
export const SEND_OTP=BASE_URL+"/api/user/send-verify/";
export const OTP_VERIFY=BASE_URL+"/api/user/verify";
export const SIGNUP=BASE_URL+"/api/user/signup"



