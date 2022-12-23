declare namespace API {
    type CurrentUser = {
        id?: string;
        nickname?: string;
        avatarUrl?: string;
        access?: string;
    };

    type LoginParams = {
        authId?: string;
        password?: string;
        authType?: string;
    };

    type LoginResult = {
        accessExpire?: number;
        accessToken?: string;
        code?: number;
        msg?: string;
        userId?: string;
    };
}
