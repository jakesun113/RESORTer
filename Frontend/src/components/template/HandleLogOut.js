function handleLogOut(cookies) {

    sessionStorage.removeItem("userSocialData");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("userImage");
    sessionStorage.removeItem("userFinishProfile");
    sessionStorage.removeItem("userFinishTrip");
    sessionStorage.removeItem("userIsClicked");
    cookies.remove("user-name");
    cookies.remove("access-token");
    cookies.remove("user-pic");
    cookies.remove("user-provider");
    cookies.remove("user-profileFinished");
    cookies.remove("user-hasUnfinishedTrip");
}

export default handleLogOut;