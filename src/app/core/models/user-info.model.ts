export interface UserInfo {
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    roles: string[];
}

export const DEFAULT_USER_INFO = ({
    username: null,
    firstName: null,
    lastName: null,
    roles: []
});
