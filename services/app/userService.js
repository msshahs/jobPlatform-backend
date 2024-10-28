const UserModel = require("../../database/models/userModel");
const generateJWTToken = require("../../helper/generateJWT");
const ErrorServiceHandlerAPP =
  require("../../errorHandler/app/index").handleServiceAsyncAPP;

const tokenUrl = "https://www.linkedin.com/oauth/v2/accessToken";
const userProfileUrl = "https://api.linkedin.com/v2/me";
const userEmailUrl =
  "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";

const createUserFormRecord = async (req, res) => {
  return ErrorServiceHandlerAPP(req, res, async (req) => {
    const code = req.query.code;
    const linkedInUrl = decodeURIComponent(req.query.linkedinUrl)
    const role = req.query.role

    if (!code) {
      return 0;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Cookie", "__cf_bm=CGXa0qyPGH84iSKS7FNEImcMJ4c28GByjlssdw0mO9Y-1728818117-1.0.1.1-qcFwBZFDS1de8SiXwpknG2bFl4MTQVLq0s8e2C2kgEFxPH21dwkHkTFMvM6.IdFww6YhM45LNhaGi3_1QU5T9Q; bcookie=\"v=2&b042f4a8-9255-4cc4-8acb-846fc50a0206\"; lang=v=2&lang=en-us; lidc=\"b=VB14:s=V:r=V:a=V:p=V:g=5576:u=775:x=1:i=1728818233:t=1728847716:v=2:sig=AQF_Pr104n7KQN4ps-G7Ra0IlhHQzrpX\"; bscookie=\"v=1&20241013104058354e3031-faf8-45b9-88dc-75e53cba271fAQGhytNHMQwFV4nzt5bmvH7YapfpeUiG\"");

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "authorization_code");
    urlencoded.append("code", code);
    urlencoded.append("client_id", "7773pz5iwqwfxj");
    urlencoded.append("client_secret", "WPL_AP1.3AmCxD73lrfGpQrH.mqV0wg==");
    urlencoded.append("redirect_uri", "http://localhost:3000/auth/linkedin/callback");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow"
    }

    const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", requestOptions);

    const tokenResult = await tokenResponse.json();
    const accessToken = tokenResult.access_token;

    // Step 2: Fetch user profile data
    const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userProfileData = await profileResponse.json();
    console.log('userProfileData: ', userProfileData);

    if (userProfileData) {

      const { name, email, picture } = userProfileData
      console.log(name, email);
      // const existingUser = await UserModel.find({ email: email });

      // if (existingUser) {
      //   return 0;
      // }
      const newUser = await UserModel.create({
        name,
        email,
        linkedinUrl: linkedInUrl,
        picture,
        role
      });
      console.log('newUser: ', newUser);

      const jwtString = generateJWTToken(email, newUser._id);
      return {
        ...newUser.toObject(),
        token: jwtString
      }
    }

    return 0;
  });
};

module.exports = {
  createUserFormRecord,
};
