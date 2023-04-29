import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { useRouter } from 'next/router';

const GoogleAuth = () => {

    const router = useRouter();


  const responseGoogle = (response: GoogleLoginResponse) => {
     //Handle the Google Sign-In response here
    console.log(response);

    router.push('http://localhost:3000/Manager');

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