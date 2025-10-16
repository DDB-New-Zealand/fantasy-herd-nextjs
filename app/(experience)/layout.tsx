import { Sidebar } from "@/components/sidebar";

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <div className="h-svh w-full">
        <Sidebar />
        <main className="min-h-full">{children}</main>
      </div>
      <footer></footer>
    </>
  );
};

export default Layout;
