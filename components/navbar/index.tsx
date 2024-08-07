'use client'


import Link from "next/link";
import {useTheme} from "next-themes";
import {useDrawer} from "@/context/drawer";
import {useCart} from "@/context/cart";

export const Navbar = () => {

    const {theme, setTheme} = useTheme();
    const {open, setOpen} = useDrawer();
    const {cart} = useCart();

    return (
        <>
            <nav className="relative flex items-center justify-between p-4 lg:px-6">
                <div className="block flex-none md:hidden">
                    <button
                        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                        </svg>
                    </button>
                </div>

                <div className="flex w-full items-center">
                    <div className="flex w-full md:w-1/3">
                        <Link className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6" href="/">
                            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">Ecommerce
                            </div>
                        </Link>
                        <ul className="hidden gap-6 text-sm md:flex md:items-center">
                            <li><Link
                                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                                href="/search">All</Link></li>
                        </ul>
                    </div>

                    <div className="hidden justify-center md:flex md:w-1/3">
                        {/*
                        <div className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
                            <input type="text"
                                   placeholder="Search for products..."
                                   autoComplete="off"
                                   className="text-md w-full rounded-lg border bg-white px-4 py-2 text-black placeholder:text-neutral-500 md:text-sm dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
                                   name="search"/>

                            <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"
                                     className="h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"></path>
                                </svg>
                            </div>
                        </div>
                        */}
                    </div>

                    <div className="flex gap-3 justify-end md:w-1/3">
                        <button aria-label="Open cart"
                                onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}>
                            <div
                                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">

                                {
                                    theme == "dark" ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"
                                             className="h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"/>
                                        </svg>) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"
                                             className="h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 17.25a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/>
                                        </svg>)
                                }
                            </div>
                        </button>

                        <button aria-label="Open cart">
                            <div
                                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true" data-slot="icon"
                                     className="h-4 transition-all ease-in-out hover:scale-110">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zm0 1.5c-3.315 0-6 2.685-6 6v1.5h12V19.5c0-3.315-2.685-6-6-6z">
                                    </path>
                                </svg>
                            </div>
                        </button>

                        <button aria-label="Open cart" onClick={() => setOpen(true)}>
                            <div
                                className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" aria-hidden="true" data-slot="icon"
                                     className="h-4 transition-all ease-in-out hover:scale-110">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z">
                                    </path>
                                </svg>

                                {
                                    cart.length > 0 && (
                                        <div
                                            className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">{cart.length}
                                        </div>
                                    )
                                }
                            </div>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}