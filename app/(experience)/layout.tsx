import { Sidebar } from "@/components/sidebar";

const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <div className="h-svh w-full grid grid-rows-1 grid-cols-[auto_1fr]">
        <Sidebar />
        <main className="min-h-full">{children}</main>
      </div>
      <footer></footer>
    </>
  );
};

export default Layout;
