import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500/30">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-zinc-950 -z-10" />
            <Sidebar />
            <main className="ml-20 min-h-screen p-8 md:ml-64">
                <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
