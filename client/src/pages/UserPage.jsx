import UserProfile from "../components/UserProfile/UserProfile";

function UserPage({sessionUser}) {
  return <UserProfile sessionUser={sessionUser} />;
}

export default UserPage;
