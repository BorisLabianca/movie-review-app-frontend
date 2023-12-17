import { useEffect, useRef, useState } from "react";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from "../../hooks";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

let count = 0;
let intervalId;

const HeroSlideShow = () => {
  const [slide, setSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [clonedSlide, setClonedSlide] = useState({});
  const { updateNotification } = useNotification();
  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const fetchLatestUploads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return updateNotification("error", error);
    setSlides([...movies]);
    setSlide(movies[0]);
  };

  const startSlideShow = () => {
    intervalId = setInterval(handleOnNextClick, 3500);
  };
  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };

  const handleOnNextClick = () => {
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setSlide(slides[count]);
    slideRef.current.classList.add("slide-in-from-right");
    clonedSlideRef.current.classList.add("slide-out-to-left");
  };

  const handleOnPrevClick = () => {
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setSlide(slides[count]);
    slideRef.current.classList.add("slide-in-from-left");
    clonedSlideRef.current.classList.add("slide-out-to-right");
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-left",
      "slide-in-from-right",
      "slide-out-to-right",
      "slide-in-from-left",
    ];
    clonedSlideRef.current.classList.remove(...classes);
    slideRef.current.classList.remove(...classes);
    setClonedSlide({});
  };

  useEffect(() => {
    fetchLatestUploads();
    return () => {
      pauseSlideShow();
    };
  }, []);

  useEffect(() => {
    if (slides.length) startSlideShow();
  }, [slides.length]);

  return (
    <div className="w-full flex">
      {/* Slide section */}
      <div className="w-4/5 aspect-video relative overflow-hidden">
        <img
          ref={slideRef}
          className="aspect-video object-cover"
          onAnimationEnd={handleAnimationEnd}
          src={slide.poster}
          alt=""
        />
        <img
          ref={clonedSlideRef}
          className="aspect-video object-cover absolute inset-0"
          onAnimationEnd={handleAnimationEnd}
          src={clonedSlide.poster}
          alt=""
        />
        <SlideShowController
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>

      {/* Up Next section */}
      <div className="w-1/5 bg-red-300 aspect-video"></div>
    </div>
  );
};

const SlideShowController = ({ onNextClick, onPrevClick }) => {
  const btnClass =
    "bg-primary rounded border-2 text-white text-xl p-2 outline-none";

  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
      <button className={btnClass} type="button" onClick={onPrevClick}>
        <AiOutlineDoubleLeft />
      </button>
      <button className={btnClass} type="button" onClick={onNextClick}>
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

export default HeroSlideShow;
