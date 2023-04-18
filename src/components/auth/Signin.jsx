import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { useAuth, useNotification } from "../../hooks";

const Signin = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo } = useAuth();
  const { isPending, isLoggedIn } = authInfo;
  console.log(isLoggedIn);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const validateUserInfo = ({ email, password }) => {
    if (!email.trim()) return { ok: false, error: "Email is missing." };
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      return { ok: false, error: "Invallid email." };

    if (!password.trim()) return { ok: false, error: "Password is missing." };
    if (password.length < 8)
      return {
        ok: false,
        error: "Your password must be at least 8 characters long.",
      };
    return { ok: true };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      return updateNotification("error", error);
    }
    handleLogin(userInfo.email, userInfo.password);
  };
  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign in</Title>
          <ForInput
            value={userInfo.email}
            label="Email"
            placeholder="john@email.com"
            name="email"
            onChange={handleChange}
          />
          <ForInput
            value={userInfo.password}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Submit value="Sign in" busy={isPending} />
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
