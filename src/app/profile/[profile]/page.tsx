import axios from "axios";

type Props = {
  params: {
    profile: string;
  };
};
const ProfilePage = async ({ params: { profile } }: Props) => {
  const res = await axios.get("http://localhost:3000/api/movie", {
    params: {
      profile,
    },
  });
  console.log({ FRONTEND: res.data });
  return <div>HELLO WORLD</div>;
};

export default ProfilePage;
