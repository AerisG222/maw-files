export interface UserInfo {
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

export const DEFAULT_USER_INFO = ({
    username: null,
    firstName: null,
    lastName: null,
    roles: []
});
