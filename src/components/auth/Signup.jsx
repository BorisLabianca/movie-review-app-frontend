import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ name, email, password }) => {
  if (!name.trim()) return { ok: false, error: "Name is missing." };
  if (!/^[a-z A-Z]+$/.test(name)) return { ok: false, error: "Invalid name." };

  if (!email.trim()) return { ok: false, error: "Email is missing." };
  if (!isValidEmail(email)) return { ok: false, error: "Invallid email." };

  if (!password.trim()) return { ok: false, error: "Password is missing." };
  if (password.length < 8)
    return {
      ok: false,
      error: "Your password must be at least 8 characters long.",
    };
  return { ok: true };
};

const Signup = () => {
  const navigate = useNavigate();
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const { updateNotification } = useNotification();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      return updateNotification("error", error);
    }
    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
    console.log(response.user);
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  const { name, email, password } = userInfo;
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + " w-72"} onSubmit={handleSubmit}>
          <Title>Sign up</Title>
          <ForInput
            value={name}
            onChange={handleChange}
            label="Name"
            placeholder="John Doe"
            name="name"
          />
          <ForInput
            value={email}
            onChange={handleChange}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <ForInput
            value={password}
            onChange={handleChange}
            label="Password"
            placeholder="********"
            name="password"
            type="password"
          />
          <Submit value="Sign up" />
          <div className="flex justify-between">
            {/* <CustomLink to="/auth/forgot-password">Forgot password</CustomLink> */}
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default Signup;
