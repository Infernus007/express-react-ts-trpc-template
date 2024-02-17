import { trpc } from "./utils/trpc";
export default function IndexPage() {
  const userQuery = trpc.getUser.useQuery({ name: "JASH" });
  return (
    <div>
      <p>{userQuery.data?.hi}</p>
    </div>
  );
}
