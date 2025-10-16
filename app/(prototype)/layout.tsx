const Layout: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <>
      <main className="min-h-svh w-full">{children}</main>
      <footer></footer>
    </>
  );
};

export default Layout;
