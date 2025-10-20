import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User } from 'lucide-react'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel, 
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

export default function Header() {

    
    const primaryNavLinks = [
        { href: "/", label: "Home" },
        { href: '/shop/all', label: "All Products" }, 
    ];

   
    const isAuthenticated =true;  
    const cartItemCount = 3; 
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/96 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
            <div className="container flex h-16 items-center justify-around ">
                
               
                <Link href="/" className="flex items-center gap-5 bg-gray-100   "> 
                    <div className="text-2xl font-extrabold tracking-wider"> <Image src='/images/logo.png' alt='logo' width='300' height='300'></Image></div>
                </Link>

                
                <nav className="hidden md:flex items-center gap-6  hover:text-emerald-800 hover:underline-offset-2">
                    
                    {primaryNavLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href} 
                            className="text-sm font-medium text-muted-foreground "
                        >
                            {link.label}
                        </Link>
                    ))}

                   
                   
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground  ">
                                Categories
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-50  min-w-[200px] py-10  z-50   ">
                            <DropdownMenuLabel>Product Types</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='py-4'>
                                <Link href="/category/electric-scooters">Electric Scooters</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='py-4'>
                                <Link href="/category/kick-scooters">Kick Scooters</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='py-4'>
                                <Link href="/category/accessories">Accessories & Parts</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                </nav>

                
                <div className='flex items-center gap-2 md:gap-4 m-50'>
                    
                    
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='secondary' size='icon' aria-label="Account">
                                    <User className='h-5 w-5' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild><Link href="/account/profile">Profile</Link></DropdownMenuItem>
                                <DropdownMenuItem asChild><Link href="/account/orders">Orders</Link></DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        
                        <Link href="/login" passHref legacyBehavior>
                           <Button variant='secondary' className="text-sm font-medium hover:text-foreground p-2 h-9 md:px-4">Login / Sign Up</Button>
                        </Link>
                    )}


                    
                    <Link href="/cart" passHref >
                        <Button variant='secondary' size='icon' className='relative' aria-label={`View ${cartItemCount} items in cart`}>
                            <ShoppingCart className='h-5 w-5'/>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-1 text-xs font-bold text-white leading-none">
                                    {cartItemCount}
                                </span>
                            )}
                        </Button>
                    </Link>
                </div>

            </div>
        </header>
    );
}