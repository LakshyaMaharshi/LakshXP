
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <SignIn 
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"  
      />
    </div>
  );
};

export default SignInPage;