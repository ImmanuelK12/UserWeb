class RegisterModel {
    id?: number;
    username: string;
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
    mobilenumber: string;
    address: string;
    constructor(registerModel: RegisterModel) {
        this.id = registerModel?.id ? registerModel?.id : undefined;
        this.username = registerModel?.username ? registerModel?.username : '';
        this.name = registerModel?.name ? registerModel?.name : '';
        this.email = registerModel?.email ? registerModel?.email : '';
        this.password = registerModel?.password ? registerModel?.password : '';
        this.confirmpassword = registerModel?.confirmpassword ? registerModel?.confirmpassword : '';
        this.mobilenumber = registerModel?.mobilenumber ? registerModel?.mobilenumber : '';
        this.address = registerModel?.address ? registerModel?.address : '';
    }
}

export {RegisterModel};