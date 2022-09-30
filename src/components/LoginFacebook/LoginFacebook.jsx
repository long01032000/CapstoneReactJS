import React, { Fragment } from "react";
import { AiFillFacebook } from "react-icons/ai";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { ACCESS_TOKEN, setStore, setStoreJson } from "../../util/tool";
import { useDispatch } from "react-redux";
import { getProfileApi } from "../../redux/reducers/userReducer";

export default function LoginFacebook() {
  const dispatch = useDispatch()
  const responseFacebook = (response) => {
    console.log(response)
    axios({
      url: "https://shop.cyberlearn.vn/api/Users/facebooklogin",
      method: "post",
      data: {
        facebookToken: response.accessToken,
      },
    }).then((res) => {
      console.log(res)
      setStore(ACCESS_TOKEN,res.data.content.accessToken)
      dispatch(getProfileApi());
      // localStorage.setItem("accessToken", res.data.content.accessToken);
    });
  };
  return (
    <Fragment>
      <FacebookLogin
        icon={<AiFillFacebook />}
        appId="1376497076213115"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </Fragment>
  );
}
