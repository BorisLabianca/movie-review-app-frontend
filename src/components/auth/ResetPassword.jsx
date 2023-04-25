import { useNavigate, useSearchParams } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useEffect, useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { resetPassword, verifyPasswordResetToken } from "../../api/auth";
import { useNotification } from "../../hooks";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const { updateNotification } = useNotification();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    confirmationPassword: "",
  });

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id);
    setIsVerifying(false);
    if (error) {
      navigate("/auth/reset-password", { replace: true });
      return updateNotification("error", error);
    }

    if (!valid) {
      setIsValid(false);
      return navigate("/auth/reset-password", { replace: true });
    }

    setIsValid(true);
  };

  useEffect(() => {
    isValidToken();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!password.newPassword.trim())
      return updateNotification("error", "Passwords is missing.");
    if (password.newPassword.trim().length < 8)
      return updateNotification(
        "error",
        "Passwords must be at least 8 characters long."
      );
    if (password.newPassword !== password.confirmationPassword)
      return updateNotification("error", "Passwords don't match.");

    const { error, message } = await resetPassword({
      newPassword: password.newPassword,
      userId: id,
      token,
    });

    if (error) {
      return updateNotification("error", error);
    }

    updateNotification("success", message);
    navigate("/auth/signin", { replace: true });
  };

  if (isVerifying)
    return (
      <FormContainer>
        <Container>
          <div className="flex items-center justify-center flex-col space-y-8">
            <h1 className="text-4xl font-semibold dark:text-white text-primary">
              Please wait, we are verifying your token.
            </h1>
            <ImSpinner3 className="animate-spin dark:text-white text-primary text-4xl" />
          </div>
        </Container>
      </FormContainer>
    );

  if (!isValid)
    return (
      <FormContainer>
        <Container>
          <h1 className="text-4xl font-semibold dark:text-white text-primary">
            Sorry the token is invalid.
          </h1>
        </Container>
      </FormContainer>
    );

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-96"} onSubmit={handleSubmit}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="newPassword"
            type="password"
            value={password.newPassword}
            onChange={handleChange}
          />
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="confirmationPassword"
            type="password"
            value={password.confirmationPassword}
            onChange={handleChange}
          />
          <Submit value="Confirm" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ResetPassword;
