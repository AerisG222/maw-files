export interface UserInfo {
    username?: string;
    firstName?: string;
    lastName?: string;
    roles: string[];
}

export const DEFAULT_USER_INFO = ({
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    roles: []
});
