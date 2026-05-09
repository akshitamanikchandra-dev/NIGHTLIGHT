import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

const Button = ({ children, className, variant = 'primary', ...props }) => {
    const baseStyles = "relative inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary: "bg-cyan-500 text-black hover:bg-cyan-400 focus:ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]",
        secondary: "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:ring-zinc-500 border border-zinc-700",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/50",
        ghost: "text-zinc-400 hover:text-white hover:bg-white/5"
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default Button
