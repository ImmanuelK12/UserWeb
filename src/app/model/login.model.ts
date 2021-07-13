class LoginpageModel {
    loginId: string;
    password: string;
    constructor(loginpageModel: LoginpageModel) {
        this.loginId = loginpageModel?.loginId ? loginpageModel?.loginId : '';
        this.password = loginpageModel?.password ? loginpageModel?.password : '';
    }
}

export {LoginpageModel};