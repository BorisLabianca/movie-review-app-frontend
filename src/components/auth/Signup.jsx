import { useState } from "react";
import { commonModalClasses } from "../../utils/theme";
import Container from "../Container";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";

const validateUserInfo = ({ name, email, password }) => {
  if (!name.trim()) return { ok: false, error: "Name is missing." };
  if (!/^[a-z A-Z]+$/.test(name)) return { ok: false, error: "Invalid name." };

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

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) {
      return console.log(error);
    }
    console.log(userInfo);
  };
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
