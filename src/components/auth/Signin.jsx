import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const Signin = () => {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title>Sign in</Title>
          <ForInput label="Email" placeholder="john@email.com" name="email" />
          <ForInput label="Password" placeholder="********" name="password" />
          <Submit value="Sign in" />
          <div className="flex justify-between">
            <CustomLink to="/auth/forgot-password">Forgot password</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default Signin;
