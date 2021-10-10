import { Images, ImagesResults } from "@/types/types";

const fillExtraImages = Array(5).fill({
  aspect_ratio: 2,
  height: 400,
  iso_639_1: "test",
  vote_average: 3,
  vote_count: 2,
  width: 400,
  placeholder: "/images/placeholder.jpeg",
});

export const resolver = (
  images: ImagesResults
): { classes: string; allImgs: Images[] } => {
  if (images?.backdrops) {
    return {
      classes: "h-[50px] md:h-[80px]",
      allImgs: images?.backdrops.concat(fillExtraImages).slice(0, 6),
    };
  } else {
    // console.log(images?.profiles.concat(fillExtraImages).slice(0, 5));
    return {
      classes: "h-[80px] md:h-[150px]",
      allImgs: images?.profiles.concat(fillExtraImages).slice(0, 5),
    };
  }
};
