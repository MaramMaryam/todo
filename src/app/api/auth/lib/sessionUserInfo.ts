export class SessionUserInfo {
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    profileImageLink: string | null;

    constructor(
        email: string,
        emailVerified: boolean,
        firstName: string,
        lastName: string,
        profileImageLink: string | null
    ) {
        this.email = email;
        this.emailVerified = emailVerified;
        this.firstName = firstName;
        this.lastName = lastName;
        this.profileImageLink = profileImageLink;
    }
}