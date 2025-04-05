
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <SignUp 
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
      />
    </div>
  );
};

export default SignUpPage;