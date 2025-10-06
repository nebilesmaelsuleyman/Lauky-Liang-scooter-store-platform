import {SiteHeader} from '@/components/site-header'

export default function productDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
     <SiteHeader/>
      {children}
    </div>
  );
}