import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const Actors = () => {
  return (
    <div className="grid grid-cols-4 gap-3 my-5">
      <ActorProfile
        profile={{
          name: "Jonh Doe",
          avatar:
            "https://images.unsplash.com/photo-1683093092507-928bd670af33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatibus est, laboriosam doloremque eveniet aspernatur, enim tenetur, tempore sequi eum illum quaerat saepe. Aliquam numquam voluptates ea impedit, repellat iste molestias quasi quidem quas quam vero suscipit tenetur illo ab quos eveniet cum nemo reprehenderit ipsum praesentium repellendus unde! Quia?",
        }}
      />
      <ActorProfile
        profile={{
          name: "Jonh Doe",
          avatar:
            "https://images.unsplash.com/photo-1683093092507-928bd670af33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatibus est, laboriosam doloremque eveniet aspernatur, enim tenetur, tempore sequi eum illum quaerat saepe. Aliquam numquam voluptates ea impedit, repellat iste molestias quasi quidem quas quam vero suscipit tenetur illo ab quos eveniet cum nemo reprehenderit ipsum praesentium repellendus unde! Quia?",
        }}
      />
      <ActorProfile
        profile={{
          name: "Jonh Doe",
          avatar:
            "https://images.unsplash.com/photo-1683093092507-928bd670af33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatibus est, laboriosam doloremque eveniet aspernatur, enim tenetur, tempore sequi eum illum quaerat saepe. Aliquam numquam voluptates ea impedit, repellat iste molestias quasi quidem quas quam vero suscipit tenetur illo ab quos eveniet cum nemo reprehenderit ipsum praesentium repellendus unde! Quia?",
        }}
      />
      <ActorProfile
        profile={{
          name: "Jonh Doe",
          avatar:
            "https://images.unsplash.com/photo-1683093092507-928bd670af33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatibus est, laboriosam doloremque eveniet aspernatur, enim tenetur, tempore sequi eum illum quaerat saepe. Aliquam numquam voluptates ea impedit, repellat iste molestias quasi quidem quas quam vero suscipit tenetur illo ab quos eveniet cum nemo reprehenderit ipsum praesentium repellendus unde! Quia?",
        }}
      />
      <ActorProfile
        profile={{
          name: "Jonh Doe",
          avatar:
            "https://images.unsplash.com/photo-1683093092507-928bd670af33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatibus est, laboriosam doloremque eveniet aspernatur, enim tenetur, tempore sequi eum illum quaerat saepe. Aliquam numquam voluptates ea impedit, repellat iste molestias quasi quidem quas quam vero suscipit tenetur illo ab quos eveniet cum nemo reprehenderit ipsum praesentium repellendus unde! Quia?",
        }}
      />
      <ActorProfile
        profile={{
          name: "Jonh Doe",
          avatar:
            "https://images.unsplash.com/photo-1683093092507-928bd670af33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid voluptatibus est, laboriosam doloremque eveniet aspernatur, enim tenetur, tempore sequi eum illum quaerat saepe. Aliquam numquam voluptates ea impedit, repellat iste molestias quasi quidem quas quam vero suscipit tenetur illo ab quos eveniet cum nemo reprehenderit ipsum praesentium repellendus unde! Quia?",
        }}
      />
    </div>
  );
};

export default Actors;

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };

  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };
  if (!profile) return null;
  const { name, avatar, about = "" } = profile;

  return (
    <div className="bg-white shadow-md shadow-300y-500 dark:shadow-gray-700 dark:bg-secondary h-20 overflow-hidden rounded">
      <div
        className="flex cursor-pointer relative"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold">
            {name}
          </h1>
          <p className="text-primary dark:text-white">
            {about.substring(0, 50) + " ..."}
          </p>
        </div>
        <Options visible={showOptions} />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 bg-opacity-25 bg-primary backdrop-blur-sm flex justify-center items-center gap-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
