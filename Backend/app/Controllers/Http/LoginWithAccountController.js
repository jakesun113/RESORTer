'use strict'

class LoginWithAccountController {

  loginwithgoogle({request}) {
    //todo: authenticate user
    console.log(request.body)
  }

  loginwithfacebook({request}) {
    //todo: authenticate user
    console.log(request.body)

  }
}

module.exports = LoginWithAccountController
