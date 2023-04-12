import { useEffect, useRef, useState } from "react";
import Container from "../Container";
import CustomLink from "../CustomLink";
import ForInput from "../form/FormInput";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "../form/FormContainer";
import { commonModalClasses } from "../../utils/theme";

const OTP_LENGTH = 6;
let currentOtpIndex;
const EmailVerification = () => {
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

  const handleKeyDown = ({ key }, index) => {
    currentOtpIndex = index;
    if (key === "Backspace") {
      focusPreviousUnputField(currentOtpIndex);
    }
  };
  console.log(otp);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [activeOtpIndex]);
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses}>
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
          <Submit value="Send Link" />
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
