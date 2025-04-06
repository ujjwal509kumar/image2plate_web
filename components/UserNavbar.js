'use client';

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Menu,
    ChefHat,
    BookOpen,
    LogOut,
    User,
    Sun,
    Moon,
    ChevronRight,
    ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Navbar = ({ userData }) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const pathname = usePathname(); 
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navItems = [
        { name: "Dashboard", icon: <User className="w-5 h-5" />, href: "/dashboard" },
        { name: "Create Recipe", icon: <ChefHat className="w-5 h-5" />, href: "/dashboard/create-recipe" },
        { name: "My Recipes", icon: <BookOpen className="w-5 h-5" />, href: "/dashboard/my-recipes" },
    ];

    const toggleTheme = () => {
        if (mounted) {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`hidden md:flex flex-col h-screen border-r bg-background transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}
            >
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center">
                    {!isCollapsed && <h2 className="font-bold text-xl">Recipe App</h2>}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="ml-auto"
                    >
                        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Nav Items */}
                <div className="flex flex-col flex-1 p-2 space-y-1">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant={pathname === item.href ? "secondary" : "ghost"}
                                className={`${isCollapsed ? 'justify-center' : 'justify-start'} w-full gap-3 rounded-md text-sm`}
                                title={isCollapsed ? item.name : ""}
                            >
                                {item.icon}
                                {!isCollapsed && item.name}
                            </Button>
                        </Link>
                    ))}
                </div>

                {/* Theme & Logout */}
                <div className={`flex flex-col items-center border-t p-3 gap-3 ${isCollapsed ? 'space-y-2' : ''}`}>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        className={`${isCollapsed ? '' : 'self-start'} transition`}
                    >
                        {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>

                    <Button
                        variant="destructive"
                        size={isCollapsed ? "icon" : "default"}
                        className={`w-full ${isCollapsed ? 'justify-center' : 'justify-start'} gap-2`}
                        onClick={() => signOut({ callbackUrl: "/" })}
                        title={isCollapsed ? "Logout" : ""}
                    >
                        <LogOut className="w-5 h-5" />
                        {!isCollapsed && "Logout"}
                    </Button>
                </div>
            </motion.aside>

            {/* Mobile Navbar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="md:hidden fixed top-4 left-4 z-50">
                        <Menu className="w-6 h-6" />
                    </Button>
                </SheetTrigger>

                <SheetContent side="left" className="w-64 p-0">
                    <div className="p-4 border-b">
                        <h2 className="font-bold text-xl">Recipe App</h2>
                    </div>

                    <div className="flex flex-col p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <Button
                                    variant={pathname === item.href ? "secondary" : "ghost"}
                                    className="w-full justify-start gap-3"
                                >
                                    {item.icon}
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col p-4 border-t space-y-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleTheme}
                        >
                            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        <Button
                            variant="destructive"
                            className="w-full justify-start gap-3"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};

export default Navbar;
