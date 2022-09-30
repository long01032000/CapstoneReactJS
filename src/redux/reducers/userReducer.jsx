import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/tool";
import { history } from "../../index";
import { Modal } from "antd";

const initialState = {
  userLogin: getStoreJson(USER_LOGIN),
  userSignUp: {
    email: "",
    password: "",
    name: "",
    gender: true,
    phone: "",
  }, // có thể null hoặc object
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { getProfileAction } = userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin) => {
  //{email,password}

  return async (dispatch) => {
    try {
      const result = await http.post("Users/signin", userLogin);
    //   const result2 = await axios({
    //     url:'https://shop.cyberlearn.vn/api/Users/signin',
    //     method: "post",
    //     data: userLogin,
    //   });
      //Sau khi đăng nhập thành công => lưu dữ liệu vào localstorage hoặc cookie
        setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);

        setStore(ACCESS_TOKEN, result.data.content.accessToken);
      //Chuyển hướng về profile, trang quên mật khẩu
       
      //Sau khi đăng nhập thành công thì dispatch action getProfile
        dispatch(getProfileApi());
    } catch (err) {
      alert("Tài khoản hoặc mật khẩu chưa đúng mời nhập lại");

      console.log(err);
    }
  };
};

export const getProfileApi = (accessToken = getStore(ACCESS_TOKEN)) => {
// console.log("Profile:",accessToken)
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/users/getProfile",
        method: "POST",
        data: "body",
        headers: {
          //headers là các phần dữ liệu mặc định gửi đi
          Authorization: "Bearer " + accessToken,
        },
      });
      //Lấy được thông tin profile => Đưa lên redux
      const action = getProfileAction(result.data.content);
      console.log(result.data.content)
      history.push("/");
      dispatch(action);

      //Lưu vào storage
      setStoreJson(USER_LOGIN, result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
};


export const updateProfileApi = (userLogin) => {
  console.log(userLogin)
return async (dispatch) => {
  try{
    const result = await http.post("/Users/updateProfile",userLogin);

    const countDown = () => {
      let secondsToGo = 5;
      const modal = Modal.success({
        title: 'This is a notification message',
        content: `This modal will be destroyed after ${secondsToGo} second.`,
      });
      const timer = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        modal.destroy();
      }, secondsToGo * 1000);
    };

    dispatch(getProfileApi());
    countDown()
  } catch(err){
    alert("Vui lòng nhập đúng thông tin cập nhật")
  }
  
} 
}

export const signupApi = (userSignUp) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/signup", userSignUp);
      //Sau khi đăng nhập thành công => lưu dữ liệu vào localstorage hoặc cookie
      console.log(result);
      // setCookie(ACCESS_TOKEN,result.data.content.accessToken,30);

      // setStore(ACCESS_TOKEN,result.data.content.accessToken);
      //Chuyển hướng về profile, trang quên mật khẩu
      history.push("/login");
      //Sau khi đăng nhập thành công thì dispatch action getProfile
    } catch (err) {
      alert(err.response?.data.message);
    }
  };
};

export const orderApi = () => {
  return async (dispatch) => {
    try {
      const result = await http.post("/Users/order");
      //Sau khi đăng nhập thành công => lưu dữ liệu vào localstorage hoặc cookie
      console.log(result);
      // setCookie(ACCESS_TOKEN,result.data.content.accessToken,30);

      // setStore(ACCESS_TOKEN,result.data.content.accessToken);
      //Chuyển hướng về profile, trang quên mật khẩu
      history.push("/login");
      //Sau khi đăng nhập thành công thì dispatch action getProfile
    } catch (err) {
      alert(err.response?.data.message);
    }
  }
}
