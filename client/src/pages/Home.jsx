import { Link } from 'react-router-dom'
import { MessageSquare, Ghost, Trash2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const Home = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h1 className="mb-6 text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 sm:text-8xl filter drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    NightLight
                </h1>
                <p className="mx-auto max-w-2xl text-xl text-zinc-400 font-light tracking-wide">
                    Digital sanctuary for the sleepless. <span className="text-cyan-400">24/7 AI Companionship</span>, <span className="text-violet-400">Anonymous Connection</span>, and <span className="text-fuchsia-400">Total Release</span>.
                </p>
            </motion.header>

            <motion.main
                variants={container}
                initial="hidden"
                animate="show"
                className="grid w-full max-w-5xl gap-6 sm:grid-cols-3"
            >
                <FeatureCard
                    to="/chat"
                    icon={MessageSquare}
                    title="AI Companion"
                    description="Advanced empathetic AI personas ready to listen, advise, or just chat."
                    color="cyan"
                    delay={0}
                />
                <FeatureCard
                    to="/wall"
                    icon={Ghost}
                    title="Anonymous Wall"
                    description="Share your thoughts with the void. Read others. React. Connect implicitly."
                    color="violet"
                    delay={0.1}
                />
                <FeatureCard
                    to="/vent"
                    icon={Trash2}
                    title="The Shredder"
                    description="Write it down. Watch it get digitally destroyed. Let go of the burden."
                    color="fuchsia"
                    delay={0.2}
                />
            </motion.main>
        </div>
    )
}

const FeatureCard = ({ to, icon: Icon, title, description, color }) => {
    const colorStyles = {
        cyan: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:text-cyan-400",
        violet: "hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] group-hover:text-violet-400",
        fuchsia: "hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.2)] group-hover:text-fuchsia-400"
    }

    return (
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
            <Link
                to={to}
                className={`group relative block h-full overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 p-8 transition-all duration-500 hover:-translate-y-1 ${colorStyles[color]}`}
            >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 transition-colors group-hover:bg-white/10">
                    <Icon className="h-6 w-6 transition-colors" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-zinc-100 transition-colors">
                    {title}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-zinc-400 transition-colors group-hover:text-zinc-300">
                    {description}
                </p>

                <div className="flex items-center text-xs font-bold uppercase tracking-wider opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                    Initialize <ArrowRight className="ml-2 h-3 w-3" />
                </div>
            </Link>
        </motion.div>
    )
}

export default Home
