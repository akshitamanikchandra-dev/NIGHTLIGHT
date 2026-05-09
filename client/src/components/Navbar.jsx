import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    NightLight
                </Link>

                <div className="flex gap-6">
                    <NavLink to="/chat" active={isActive('/chat')}>Chat</NavLink>
                    <NavLink to="/wall" active={isActive('/wall')}>Wall</NavLink>
                    <NavLink to="/vent" active={isActive('/vent')}>Vent</NavLink>
                </div>
            </div>
        </nav>
    )
}

const NavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={`text-sm font-medium transition-colors ${active ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
            }`}
    >
        {children}
    </Link>
)

export default Navbar
