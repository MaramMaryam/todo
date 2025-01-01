import {SessionUserInfo} from "@pages/api/auth/lib/sessionUserInfo";
import * as process from "process";
import {oauthTokenInfo} from "@pages/api/auth/lib/mongo";

export async function getUserInfo(accessToken: string): Promise<SessionUserInfo | undefined> {
    console.log("requested to get the user info");
    try {
        var requestUrl: string = process.env.FUSION_ISSUER + "oauth2/userinfo"
        const response = await fetch(requestUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.log(`Unable to get the user information from the server: ${response.status} ${response.statusText}`);
            return undefined;
        }

        // get the data
        const data = await response.json();
        console.log(data);

        // Ensure data has required fields
        const sessionUserInfo = new SessionUserInfo(
            data.email,
            data.email_verified,
            data.given_name,
            data.family_name,
            data.profile_image ?? null
        );
        return sessionUserInfo;


    } catch (error) {
        console.error('Error fetching user info:', error);
        return undefined;
    }
}
