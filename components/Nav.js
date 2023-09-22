import Link from "next/link";
import { useRouter } from "next/router";
// components and assets
import { HouseIcon, ShopIcon, BagIcon, SettingsIcon } from "@/assets/icons";

const Nav = () => {
    const linkClassname = "flex gap-1 p-1";
    const activeLinkClassname = `${linkClassname} bg-white text-orange-700 rounded-l-lg`;
    const router = useRouter();

    return (
        <aside className="text-white pt-4 pl-4">
            <Link className={`${linkClassname} mb-6 mr-4`} href={'/'}>
                <ShopIcon classname={"w-6 h-6"} />
                <span>
                    LeafMarketAdmin
                </span>
            </Link>
            <nav className="flex flex-col gap-2">
                <Link href={'/'} className={router.pathname === '/' ? activeLinkClassname : linkClassname}>
                    Dashboard
                </Link>

                <Link href={'/orders'} className={router.pathname.includes('/orders') ? activeLinkClassname : linkClassname}>
                    <HouseIcon classname={"w-6 h-6"} />
                    Orders
                </Link>

                <Link href={'/products'} className={router.pathname.includes('/products') ? activeLinkClassname : linkClassname}>
                    <BagIcon classname={"w-6 h-6"} />
                    Products
                </Link>

                <Link href={'/settings'} className={router.pathname.includes('/settings') ? activeLinkClassname : linkClassname}>
                    <SettingsIcon classname={"w-6 h-6"} />
                    Settings
                </Link>
            </nav>
        </aside>
    )
};

export default Nav;