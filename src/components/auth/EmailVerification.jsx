import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { resendEmailVerificationToken, verifyUserEmail } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";

const OTP_LENGTH = 6;
let currentOtpIndex;
const isValideOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }

  return valid;
};

const EmailVerification = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { updateNotification } = useNotification();
  const { isAuth, authInfo } = useAuth();
  const { isLoggedIn, profile } = authInfo;
  const isVerified = profile?.isVerified;
  const user = state?.user;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const inputRef = useRef();
  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };
  const focusPreviousUnputField = (index) => {
    let nextIndex;
    const difference = index - 1;
    nextIndex = difference !== 0 ? difference : 0;
    setActiveOtpIndex(nextIndex);
  };
  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp.splice(
      currentOtpIndex,
      1,
      value.substring(value.length - 1, value.length)
    );
    if (!value) {
      focusPreviousUnputField(currentOtpIndex);
    } else {
      focusNextInputField(currentOtpIndex);
    }
    setOtp(newOtp);
  };

  const handleResendOTP = async () => {
    const { error, message } = await resendEmailVerificationToken(user.id);

    if (error) return updateNotification("error", error);

    updateNotification("success", message);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOtpIndex = index;
    if (key === "Backspace") {
      focusPreviousUnputField(currentOtpIndex);
    }
  };
  // console.log(otp);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValideOTP(otp)) {
      return updateNotification("error", "Invalid OTP.");
    }

    const {
      error,
      message,
      user: userResponse,
    } = await verifyUserEmail({
      OTP: otp.join(""),
      userId: user.id,
    });
    // console.log("error otp: ", error);

    if (error) {
      return updateNotification("error", error);
    }
    updateNotification("success", message);
    // console.log("message otp: ", message);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    if (!user) navigate("/not-found");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, isLoggedIn, isVerified]);
  // console.log(isVerified);
  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              The OTP has been sent to your email address.
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  className="w-12 h-12 rounded border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent outline-none transition text-center dark:text-white text-primary font-semibold text-xl spin-button-none"
                  type="number"
                  value={otp[index] || ""}
                  ref={activeOtpIndex === index ? inputRef : null}
                  onChange={(event) => {
                    handleOtpChange(event, index);
                  }}
                  onKeyDown={(event) => {
                    handleKeyDown(event, index);
                  }}
                  key={index}
                />
              );
            })}
          </div>
          <div>
            <Submit value="Verify Account" />
            <button
              type="button"
              className="dark:text-white font-semibold hover:underline mt-2 text-blue-500"
              onClick={handleResendOTP}
            >
              Don't have an OTP?
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
