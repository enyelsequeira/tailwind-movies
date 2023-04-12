import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const movieId = searchParams.get("movieId");
    const userId = searchParams.get("userId");
    if (!userId || !movieId) {
      return NextResponse.json({
        error: "You need to be logged in to add favorite movie ",
      });
    }
    // lets get all favorite movies for this user
    const favoriteMovies = await prisma?.favoriteMovie.findMany({
      where: {
        userId: userId,
      },
    });
    return NextResponse.json(favoriteMovies);
  } catch (error) {
    return NextResponse.json({
      error: "Sorry Favorite Movies could not be fetched",
    });
  }
}

type Res = {
  movieProps: {
    backdrop_path: string;
    homepage: string;
    title: string;
    movieId: number;
    original_title: string;
    popularity: string;
    poster_path: string;
    tagline: string;
    vote_average: string;
    vote_count: string;
    userId: string;
  };
};

export async function POST(req: Request) {
  try {
    const res: Res = await req.json();
    const { movieProps } = res;
    if (!movieProps.userId || !movieProps.movieId) {
      return NextResponse.json({
        error: "You need to be logged in to add favorite movie ",
      });
    }
    // lets check if movie already exists in our database
    const movieIsFavorited = await prisma?.favoriteMovie.findUnique({
      where: {
        movieId: movieProps.movieId,
      },
    });
    if (movieIsFavorited) {
      const res = await prisma?.favoriteMovie.delete({
        where: {
          userId_movieId: {
            movieId: movieProps.movieId,
            userId: movieProps.userId,
          },
        },
      });
      const message = "Movie Removed from favorites";

      return NextResponse.json(message);
    } else {
      const res = await prisma?.favoriteMovie.create({
        data: {
          movieId: movieProps.movieId,
          userId: movieProps.userId,
          backdrop_path: movieProps.backdrop_path,
          homepage: movieProps.homepage,
          title: movieProps.title,
          original_title: movieProps.original_title,
          popularity: movieProps.popularity,
          poster_path: movieProps.poster_path,
          tagline: movieProps.tagline,
          vote_average: movieProps.vote_average,
          vote_count: movieProps.vote_count,
        },
      });
      const message = "Movie added to favorites";
      return NextResponse.json(message);
    }
  } catch (error) {
    return NextResponse.json({
      error:
        "Sorry something went wrong with toggling favorite movie, please try again later :(",
    });
  }
}

// export const DELETE = async (req: NextRequest) => {
//   try {
//     const { searchParams } = new URL(req.url);
//     const movieId = searchParams.get("movieId");
//     const userId = searchParams.get("userId");

// if (!movieId || !userId) {
//   return NextResponse.json({
//     error: "MovieId and userId are required",
//   });
// }
//     const movieIsFavorited = await prisma?.favoriteMovie.findUnique({
//       where: {
//         userId_movieId: {
//           movieId: Number(movieId),
//           userId: userId,
//         },
//       },
//     });

//     if (movieIsFavorited) {
//       // lets remove it ffrom favorited
//       const res = await prisma?.favoriteMovie.delete({
//         where: {
//           userId_movieId: {
//             movieId: Number(movieId),
//             userId: userId,
//           },
//         },
//       });
//       return NextResponse.json(res);
//     } else {
//       return NextResponse.json({
//         error: "Movie is already unfavorited",
//       });
//     }
//   } catch (error) {
//     return NextResponse.json({
//       error: "An error occurred while processing removing favorite movie :(",
//     });
//   }
// };
