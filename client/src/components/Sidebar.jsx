import { NavLink } from 'react-router-dom'
import { Home, MessageSquare, LayoutDashboard, Ghost, Trash2, Settings } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const Sidebar = () => {
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: MessageSquare, label: 'Chat', path: '/chat' },
        { icon: Ghost, label: 'Wall', path: '/wall' },
        { icon: Trash2, label: 'Vent', path: '/vent' },
    ]

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 flex-col items-center border-r border-white/5 bg-zinc-950/50 py-8 backdrop-blur-xl md:w-64 md:items-stretch">
            <div className="mb-12 flex justify-center md:justify-start md:px-8">
                <h1 className="hidden text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 md:block">
                    NightLight
                </h1>
                <div className="block md:hidden h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500" />
            </div>

            <nav className="flex flex-1 flex-col gap-2 px-2 md:px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            twMerge(
                                "group flex items-center justify-center rounded-xl p-3 transition-all hover:bg-white/5 md:justify-start md:px-4",
                                isActive ? "bg-white/10 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]" : "text-zinc-500 hover:text-zinc-200"
                            )
                        }
                    >
                        <item.icon className="h-6 w-6" strokeWidth={1.5} />
                        <span className="hidden text-sm font-medium md:block md:ml-3">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="px-2 py-4 md:px-4">
                <button className="flex w-full items-center justify-center rounded-xl p-3 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200 md:justify-start md:px-4">
                    <Settings className="h-6 w-6" strokeWidth={1.5} />
                    <span className="hidden text-sm font-medium md:block md:ml-3">Settings</span>
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
