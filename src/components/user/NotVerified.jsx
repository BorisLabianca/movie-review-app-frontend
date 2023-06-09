import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import Container from "../Container";

const NotVerified = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo?.profile?.isVerified;
  const navigate = useNavigate();

  const navigateToVerification = () => {
    navigate("/auth/verification", { state: { user: authInfo.profile } });
  };

  return (
    <Container>
      {isLoggedIn && !isVerified ? (
        <p className="text-lg text-center bg-blue-50 p-2">
          It looks like you haven't verified your email address.{" "}
          <button
            className="text-blue-500 font-semibold hover:underline"
            onClick={navigateToVerification}
          >
            Please click here to verify it.
          </button>
        </p>
      ) : null}
    </Container>
  );
};

export default NotVerified;
