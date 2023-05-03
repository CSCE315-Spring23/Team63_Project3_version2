import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useRouter } from 'next/router';
/**
 * 
 * @returns Google authentication pop-up
 */
const GoogleAuth = () => {

    const router = useRouter();


  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
     //Handle the Google Sign-In response here
    console.log(response);

    router.push('http://localhost:3000/Staff-Login');

  };

  return (
    <GoogleLogin
      clientId="865337357286-9j6l4qqtq03m9l938mg423v5lrdeg8mv.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleAuth;