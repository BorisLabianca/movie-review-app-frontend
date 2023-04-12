import Container from "../Container";
import CustomLink from "../CustomLink";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const Signup = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-72 space-y-6">
          <Title>Sign up</Title>
          <ForInput label="Name" placeholder="John Doe" name="name" />
          <ForInput label="Email" placeholder="john@email.com" name="email" />
          <ForInput label="Password" placeholder="********" name="password" />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            {/* <CustomLink to="/auth/forgot-password">Forgot password</CustomLink> */}
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Signup;
