export default function productDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <h2>featured products</h2>
      {children}
    </div>
  );
}