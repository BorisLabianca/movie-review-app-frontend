import Container from "../Container";
import CustomLink from "../CustomLink";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const ConfirmPassword = () => {
  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 w-96 space-y-6">
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
    </div>
  );
};

export default ConfirmPassword;
