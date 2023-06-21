import MovieForm from "../admin/MovieForm";
import ModalContainer from "./ModalContainer";

const UpdateMovie = ({ visible, initialState }) => {
  return (
    <ModalContainer visible={visible}>
      <MovieForm initialState={initialState} />
    </ModalContainer>
  );
};

export default UpdateMovie;
