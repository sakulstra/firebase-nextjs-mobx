import Link from 'next/prefetch';
import { FriendlyHello, AvatarWidget } from './';
const Header = () => (
    <header className="header">
        <Link href="/"><a>Home</a></Link>
        <FriendlyHello />
        <AvatarWidget />
    </header>
);

export default Header;