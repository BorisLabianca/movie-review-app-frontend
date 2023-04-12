import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ForgotPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Please Enter Your Email</Title>
          <ForInput label="Email" placeholder="john@email.com" name="email" />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgotPassword;
