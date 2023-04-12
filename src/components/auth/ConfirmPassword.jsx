import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <ForInput
            label="New Password"
            placeholder="********"
            name="pasword"
            type="password"
          />
          <ForInput
            label="Confirm Password"
            placeholder="********"
            name="confirmPasword"
            type="password"
          />
          <Submit value="Confirm" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPassword;
