import { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { getProfile } from "../../api/actor";
import { useNotification } from "../../hooks";

const ProfileModal = ({ visible, profileId, onClose }) => {
  const { updateNotification } = useNotification();
  const [profile, setProfile] = useState({});

  const fetchActorProfile = async () => {
    const { error, actor } = await getProfile(profileId);
    if (error) return updateNotification("error", error);
    setProfile(actor);
  };

  useEffect(() => {
    if (profileId) fetchActorProfile();
  }, [profileId]);
  const { avatar, name, about } = profile;
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="p-5 bg-white dark:bg-primary w-72 flex flex-col items-center space-y-3">
        <img className="w-28 h-28 rounded-full" src={avatar} alt={name} />
        <h1 className="dark:text-white text-primary font-semibold">{name}</h1>
        <p className="dark:text-dark-subtle text-light-subtle">{about}</p>
      </div>
    </ModalContainer>
  );
};

export default ProfileModal;
