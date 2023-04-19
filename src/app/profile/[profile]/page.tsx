import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FavoriteMovies from "@/components/profile/favorites";
import WatchllaterMovies from "@/components/profile/watch-later";
import Text from "@/components/ui/typography";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    profile: string;
  };
};
const ProfilePage = async ({ params: { profile } }: Props) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className=" min-h-screen flex flex-col gap-y-3  p-3">
      <section>
        <Text size={"h1"} className="col-span-4  my-2">
          Favorite Movies
        </Text>
        <FavoriteMovies profile={profile} />
      </section>
      <section>
        <Text size={"h1"} className="col-span-4 my-2">
          Watch Later Movies{" "}
        </Text>
        <WatchllaterMovies profile={profile} />
      </section>
    </div>
  );
};

export default ProfilePage;

export async function generateMetadata({ params }): Promise<Metadata> {
  const session = await getServerSession(authOptions);

  return {
    title: `Profile Page of ${session?.user?.name || session?.user?.id}`,
    description: `Profile page where you will find favorite movies and watch later movis as well as editing your profile`,
  };
}
