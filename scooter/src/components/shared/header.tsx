import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react'; // <-- Import the User icon
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel, // <-- Optional: for a header in the dropdown
  DropdownMenuSeparator, // <-- Optional: to separate items
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

export default function Header() {

    // Restructure main navigation for e-commerce clarity
    const primaryNavLinks = [
        { href: "/", label: "Home" },
        { href: '/shop/all', label: "All Products" }, // More descriptive than just 'products'
        { href: "/about", label: "About Us" },
    ];

    // Placeholder for authentication state
    const isAuthenticated =true;  // Replace with actual auth logic (e.g., from a context/hook)
    const cartItemCount = 3; // Replace with actual cart item count

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/96 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
            <div className="container flex h-16 items-center justify-between">
                
                {/* 1. Logo/Branding (Left) */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="text-2xl font-extrabold tracking-wider">SKOOTER</div>
                </Link>

                {/* 2. Primary Navigation (Center) */}
                <nav className="hidden md:flex items-center gap-6">
                    {/* Main Links */}
                    {primaryNavLinks.map((link) => (
                        <Link 
                            key={link.href} 
                            href={link.href} 
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Category Dropdown (for a key product focus) */}
                   
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                                Categories
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuLabel>Product Types</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/category/electric-scooters">Electric Scooters</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/category/kick-scooters">Kick Scooters</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/category/accessories">Accessories & Parts</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                </nav>

                {/* 3. Utility Icons (Right) */}
                <div className='flex items-center gap-2 md:gap-4 m-10'>
                    
                    {/* User Account / Login Button */}
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon' aria-label="Account">
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
                        // Login button for logged-out users
                        <Link href="/login" passHref legacyBehavior>
                           <Button variant='ghost' className="text-sm font-medium hover:text-foreground p-2 h-9 md:px-4">Login / Sign Up</Button>
                        </Link>
                    )}


                    {/* Shopping Cart Button */}
                    <Link href="/cart" passHref legacyBehavior>
                        <Button variant='ghost' size='icon' className='relative' aria-label={`View ${cartItemCount} items in cart`}>
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