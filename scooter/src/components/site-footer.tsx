"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Mail, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

import { useState } from "react";
import { toast } from "sonner";

export function SiteFooter() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Subscription failed.");
            } else {
                toast.success("You're subscribed! ");
                setEmail("");
            }
        } catch (err) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="bg-gray-950  text-white min-h-screen">
            <div className="bg-[#f8f8ff] py-16 border-b border-gray-200">
                <div className="container mx-auto text-center px-4">
                    <Mail className="mx-auto h-10 w-10 mb-4 text-green-600" />
                    <h3 className=" text-2xl md:text-3xl font-bold mb-2 text-[#0D1F3C]">
                        Subscribe to Our Newsletter
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Get exclusive deals and updates on the latest scooters
                    </p>
                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
                    >
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 border-gray-300 text-gray-800 placeholder:text-gray-400"
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            className="bg-green-600 hover:bg-green-500 text-white"
                            disabled={loading}
                        >
                            {loading ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>
                </div>
            </div>

            <div
                className="container mx-auto py-16 px-4"
                style={{
                    backgroundImage:
                        "linear-gradient(to bottom, rgba(13, 31, 60, 0.0) 0%, bg-gray-950)",
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <div>
                        <Link
                            href="/"
                            className="flex items-center space-x-2 mb-4"
                        >
                            <Image
                                src="/images/logo.png"
                                alt="Company Logo"
                                width={180}
                                height={40}
                                priority
                            />
                        </Link>
                        <p className="text-white/70 mb-4 text-sm">
                            Premium electric scooters for modern urban living.
                            Quality, performance, and style.
                        </p>
                         <div className="flex space-x-4">
      <Link
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-white/90 transition-colors"
      >
        <Youtube className="h-5 w-5" />
      </Link>

      <Link
        href="https://www.facebook.com/profile.php?id=61572963972101"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-white/90 transition-colors"
      >
        <Facebook className="h-5 w-5" />
      </Link>

      <Link
        href="https://www.instagram.com/luckyliangev?igsh=M2ZpeHZhbjIwcWgy"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-white/90 transition-colors"
      >
        <Instagram className="h-5 w-5" />
      </Link>

      <Link
        href="https://vm.tiktok.com/ZMAgdFBam/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-500 hover:text-white/90 transition-colors"
      >
        <FaTiktok className="h-5 w-5" />
      </Link>
    </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-green-400">Shop</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link
                                    href="/products"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/products?featured=true"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Featured
                                </Link>
                            </li>
                           
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-green-400">Service</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link
                                    href="/service/support"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Customer Support
                                </Link>
                            </li>
                            
                            
                            <li>
                                <Link
                                    href="/service/return"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Return
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/service/warranty"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Warranty
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-green-400">Contact Us</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    +971 58 261 6899
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://www.google.com/maps/place/Lucky+Liang,+GK65A.+Dragon+mart+2+-+near+nestco+supermarket+front+gate+-+Dubai+International+City+-+Dubai+-+United+Arab+Emirates/data=!4m2!3m1!1s0x3e5f61a64cecc8ab:0xbf9d9e6203ce56f1?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjM4LjIYACDXggMqqwEsOTQyNTk1NTAsOTQyNjc3MjcsOTQyODQ0NjAsOTQyMjMyOTksOTQyMTY0MTMsOTQyODA1NzYsOTQyMTI0OTYsOTQyNjc3ODcsOTQyODUwNTEsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksOTQyNjI3MzMsNDcwODQzOTMsOTQyMTMyMDAsOTQyNTgzMjVCAlBL&skid=286bf9fc-e0c3-4a92-8b80-c74ab54066cb"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    GK65A, Dragon Mart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Dubai, UAE
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-green-400">Company</h4>
                        <ul className="space-y-2 text-sm text-white/70">
                            <li>
                                <Link
                                    href="/aboutus"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/service/privacy"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/service/termsofservice"
                                    className="hover:text-green-500 transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/20 py-6 mt-30 mb-0">
                <div className="container mx-auto text-center text-white/70 text-sm">
                    © {new Date().getFullYear()} Lucky Liang. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
}
