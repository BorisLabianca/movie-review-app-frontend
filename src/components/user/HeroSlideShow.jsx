import { useEffect, useRef, useState, forwardRef } from "react";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from "../../hooks";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";

let count = 0;
let intervalId;

const HeroSlideShow = () => {
  const [slide, setSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [clonedSlide, setClonedSlide] = useState({});
  const [visible, setVisible] = useState(true);
  const [upNext, setUpNext] = useState([]);
  const { updateNotification } = useNotification();
  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const fetchLatestUploads = async (signal) => {
    const { error, movies } = await getLatestUploads(signal);
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

  const updateUpNext = (currentindex) => {
    if (!slides.length) return;
    const upNextCount = currentindex + 1;
    const end = upNextCount + 3;
    let newSlides = [...slides];
    newSlides = newSlides.slice(upNextCount, end);
    if (!newSlides.length) {
      newSlides = [...slides].slice(0, 3);
    }
    setUpNext([...newSlides]);
  };

  const handleOnNextClick = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setSlide(slides[count]);
    slideRef.current.classList.add("slide-in-from-right");
    clonedSlideRef.current.classList.add("slide-out-to-left");
    updateUpNext(count);
  };

  const handleOnPrevClick = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setSlide(slides[count]);
    slideRef.current.classList.add("slide-in-from-left");
    clonedSlideRef.current.classList.add("slide-out-to-right");
    updateUpNext(count);
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
    startSlideShow();
  };

  const handleOnVisibilityChange = () => {
    const visibility = document.visibilityState;
    if (visibility === "hidden") setVisible(false);
    if (visibility === "visible") setVisible(true);
  };

  useEffect(() => {
    const ac = new AbortController();
    fetchLatestUploads(ac.signal);
    document.addEventListener("visibilitychange", handleOnVisibilityChange);
    return () => {
      pauseSlideShow();
      document.removeEventListener(
        "visibilitychange",
        handleOnVisibilityChange
      );
      ac.abort();
    };
  }, []);

  useEffect(() => {
    if (slides.length && visible) {
      startSlideShow();
      updateUpNext(count);
    } else {
      pauseSlideShow();
    }
  }, [slides.length, visible]);

  return (
    <div className="w-full flex">
      {/* Slide section */}
      <div className="w-4/5 aspect-video relative overflow-hidden">
        {/* Current Slide */}
        <Slide
          title={slide.title}
          src={slide.poster}
          ref={slideRef}
          id={slide.id}
        />

        {/* Cloned slide */}
        <Slide
          ref={clonedSlideRef}
          className="absolute inset-0"
          onAnimationEnd={handleAnimationEnd}
          src={clonedSlide.poster}
          title={clonedSlide.title}
          id={slide.id}
        />
        <SlideShowController
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>

      {/* Up Next section */}
      <div className="w-1/5 space-y-3 px-3">
        <h1 className="font-semibold text-2xl text-primary dark:text-white">
          Up Next
        </h1>
        {upNext.map(({ poster, id }) => {
          return (
            <img
              key={id}
              src={poster}
              alt=""
              className="aspect-video object-cover rounded"
            />
          );
        })}
      </div>
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

const Slide = forwardRef((props, ref) => {
  const { id, title, src, className = "", ...rest } = props;
  return (
    <Link
      to={`/movie/${id}`}
      className={"w-full cursor-pointer block " + className}
      {...rest}
      ref={ref}
    >
      {src ? (
        <img
          className="aspect-video object-cover"
          // onAnimationEnd={handleAnimationEnd}
          src={src}
          alt=""
        />
      ) : null}
      {title ? (
        <div className="absolute inset-0 flex flex-col justify-end py-3 bg-gradient-to-t from-white via-transparent dark:from-primary dark:via-transparent">
          <h1 className="font-semibold text-4xl dark:text-highlight-dark text-highlight">
            {title}
          </h1>
        </div>
      ) : null}
    </Link>
  );
});

export default HeroSlideShow;
