import { Link } from 'react-router-dom'

const Card = ({ title, description, to }) => {
    return (
        <Link
            to={to}
            className="group relative block overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-indigo-500/10"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/0 to-purple-500/0 transition-all duration-500 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/0"></div>

            <h3 className="relative z-10 mb-2 text-xl font-semibold text-white transition-colors group-hover:text-indigo-300">
                {title}
            </h3>

            <p className="relative z-10 text-slate-400 group-hover:text-slate-300">
                {description}
            </p>
        </Link>
    )
}

export default Card
