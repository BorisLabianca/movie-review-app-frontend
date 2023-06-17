import MovieForm from "../admin/MovieForm";
import ModalContainer from "./ModalContainer";

const UpdateMovie = ({ visible }) => {
  return (
    <ModalContainer visible={visible}>
      <MovieForm />
    </ModalContainer>
  );
};

export default UpdateMovie;
