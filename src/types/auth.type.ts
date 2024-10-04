export interface IUser {
    id?: number;
    email?: string;
    username: string;
    verified?: boolean;
    avatar: string;
    location?: string;
    languages?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  //auth slice types
  export interface IAuthState {
    isLoggedIn: boolean;
    user: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
  }
  
  /*auth register type*/
  // user register types
  export interface IRegister {
    username: string;
    email: string;
    password: string;
    otp:string;
  }
  
  export interface IRegisterData {
    user_details?: IUser | null;
    email: string | null;
    error: string;
    accessToken?: string | null;
    refreshToken?: string | null;
  }
  export interface IRegisterRes {
    status?: boolean;
    message: string;
    data?: IRegisterData;
    refreshToken?: string | null;
  }
  
  /* login api start */
  export interface ILoginArgs {
    email?: string;
    password: string;
  }

  
  export interface ILoginData {
    user_details?: IUser | null;
    accessToken?: string | null;
    refreshToken?: string | null;
  }
  
  export interface ILoginRes {
    message: string;
    data?: ILoginData;
  }
  
  export interface ILoginAction {
    type: string;
    payload: {
      user: IUser;
      accessToken: string;
      refreshToken: string;
    };
  }
  
  export interface IGetUserDetailsRes {
    id: number;
    userName: string;
    email: string;
    avatar: string;
    location:string;
    language:string;
  }
  
  