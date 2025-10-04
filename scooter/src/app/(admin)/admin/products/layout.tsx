import Sidebar from '../components/side';

export default function adminproductlayout({children}: {children: React.ReactNode}) {
 return <>
<Sidebar/>
 {children}
 </>;   
}
