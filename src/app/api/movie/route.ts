import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const profile = searchParams.get("profile");

    const movies = await prisma?.favoriteMovie.findMany({
      where: {
        userId: profile as string,
      },
    });
    const favoriteMovies = await prisma?.movie.findMany({
      where: {
        id: {
          in: movies?.map((movie) => movie.movieId) as number[],
        },
      },
    });

    console.log({ favoriteMovies });
    return NextResponse.json(favoriteMovies);
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while processing your request :(",
    });
  }
}

type MovieProps = {
  backdrop_path: string;
  homepage: string;
  title: string;
  movieId: number;
  original_title: string;
  popularity: number;
  poster_path: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  userId: string;
};
export async function POST(req: Request, res: Response) {
  try {
    const { movieProps } = await req.json();

    console.log("movieProps:", { movieProps });

    let movie = await prisma?.movie.findUnique({
      where: {
        movieId: movieProps.movieId,
      },
    });

    if (!movie) {
      movie = await prisma?.movie.create({
        data: {
          backdrop_path: movieProps.backdrop_path,
          homepage: movieProps.homepage,
          title: movieProps.title,
          movieId: movieProps.movieId,
          original_title: movieProps.original_title,
          popularity: movieProps.popularity,
          poster_path: movieProps.poster_path,
          tagline: movieProps.tagline,
          vote_average: movieProps.vote_average,
          vote_count: movieProps.vote_count,
          user: {
            connect: {
              id: movieProps.userId,
            },
          },
        },
      });
    }
    // now we have to create favorite movie for user
    const favoriteMovie = await prisma?.favoriteMovie.create({
      data: {
        movieId: movie?.id as number,
        user: {
          connect: {
            id: movieProps.userId,
          },
        },
      },
    });
    console.log({ favoriteMovie });

    return NextResponse.json({ favoriteMovie });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({
      error: "An error occurred while processing your request :(",
    });
  }
}
