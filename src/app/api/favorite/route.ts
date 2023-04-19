import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../../server/db/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
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
    console.log({ favoriteMovies });

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    return NextResponse.json({
      error: `Sorry something went wrong with getting favorite movies, please try again later :( ${error}`,
    });
  }
}

export type Res = {
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
      error: `Sorry something went wrong with getting favorite movies, please try again later :( ${error}`,
    });
  }
}
