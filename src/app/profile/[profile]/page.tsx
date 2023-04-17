import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
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
  const res = await axios.get("http://localhost:3000/api/movie", {
    params: {
      profile,
    },
  });
  console.log({ FRONTEND: res.data });
  return <div>HELLO WORLD</div>;
};

export default ProfilePage;
// async session({ session, user, token, ...props }) {
//       console.log({ TESTIONG: session.user });
//       if (session.user) {
//         // console.log({ TESTINGTHISNOW: session.user, HELLOWNOW: user });
//         (session.user.id = token.sub as string),
//           (session.user.email = token.email as string);
//       }
//       return session;
//     },
