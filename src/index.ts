import {Action, getActionName, Type} from "./actions";
import {getClassInfo} from "./meta/meta";
export * from './meta';
export * from './actions';
export * from './meta/meta';
export * from './actions';

declare let console : any;

class User
{

    @Type(String)
    name : string;
}

@Action('USER_LOGIN')
class UserLogin extends User
{

}

let user = new User();
let userLogin = new UserLogin();

//
// console.log(Object.getPrototypeOf(User.prototype).constructor);
// console.log(Object.getPrototypeOf(UserLogin.prototype).constructor);
//

// console.log(getClassInfo(User), getClassInfo(user));
let props = getClassInfo(userLogin).getProperties();
console.log(props);