import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuth from '~/hooks/useAuth';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            {/* left header  */}
            <div className="flex items-center space-x-2 md:space-x-10">
                <img
                    src="/images/Netflix_2015_logo.svg"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />

                <ul className="hidden space-x-4 md:flex">
                    <li className="header-link">Home</li>
                    <li className="header-link">TV shows</li>
                    <li className="header-link">Movies</li>
                    <li className="header-link">New & Popular</li>
                    <li className="header-link">My List</li>
                </ul>
            </div>

            {/* right header  */}
            <div className="flex items-center space-x-4 text-sm font-light">
                <SearchIcon className="hidden h-6 w-6 sm:inline" />
                <p className="hidden lg:inline">Kids</p>
                <BellIcon className="h-6 w-6" />

                {/* <Link href="/account"> */}
                <img
                    onClick={logout}
                    src="/images/netflix-default-avatar.png"
                    alt=""
                    className="cursor-pointer rounded"
                />
                {/* </Link> */}
            </div>
        </header>
    );
}

export default Header;
