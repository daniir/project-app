export default function AccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-gradient-to-r from-sky-800 to-blue-950">
      <div className="bg-cyan-950 rounded-lg w-1/3 p-6">{children}</div>
    </div>
  );
}
