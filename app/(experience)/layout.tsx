import { Sidebar } from "@/components/sidebar";
import Debug from "./debug";
import { UserProvider } from "@/stores/user-store";
import { getCurrentUserServer } from "@/lib/cookie";

const Layout: React.FC<React.PropsWithChildren> = async (props) => {
  const { children } = props;

  const user = await getCurrentUserServer();

  return (
    <>
      <div className="h-svh w-full grid grid-rows-1 grid-cols-[auto_1fr]">
        <Sidebar />
        <main className="min-h-full">{children}</main>
        <Debug />
      </div>
      <footer></footer>
      <UserProvider user={user.userData} />
    </>
  );
};

export default Layout;
