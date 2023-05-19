export const validateMovie = (movieInfo) => {
  const {
    title,
    storyLine,
    tags,
    cast,
    director,
    writers,
    releaseDate,
    genres,
    type,
    language,
    status,
  } = movieInfo;

  if (!title.trim()) return { error: "The title is missing." };
  if (!storyLine.trim()) return { error: "The storyline is missing." };

  // Validation for tags, we are checking if tags is an array or not
  if (!tags.length) return { error: "Tags are missing." };
  // Checking if the array is filled with strings
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags." };
  }

  if (!director.name) return { error: "The director is missing." };

  // Validation for writers, we are checking if writers is an array or not
  if (!writers.length) return { error: "Writers are missing." };
  // Checking if the array is filled with objects
  for (let writer of writers) {
    if (typeof writer !== "object") return { error: "Invalid writers." };
  }

  // Validation for cast, we are checking if cast is an array or not
  if (!cast.length) return { error: "Cast & crew are missing." };
  // Checking if the array is filled with objects
  for (let c of cast) {
    if (typeof c !== "object") return { error: "Invalid cast." };
  }

  if (!releaseDate.trim()) return { error: "The releaseDate is missing." };

  // Validation for genres, we are checking if genres is an array or not
  if (!genres.length) return { error: "Genres are missing." };
  // Checking if the array is filled with strings
  for (let genre of genres) {
    if (!genre.trim()) return { error: "Invalid genres." };
  }

  if (!type.trim()) return { error: "The type is missing." };

  if (!language.trim()) return { error: "The language is missing." };
  if (!status.trim()) return { error: "The status is missing." };

  return { error: null };
};
