import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, AlertTriangle, RefreshCcw } from 'lucide-react'
import Button from '../components/ui/Button'

const Vent = () => {
    const [text, setText] = useState("")
    const [status, setStatus] = useState('idle') // idle, shredding, done
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    const handleShred = async () => {
        if (!text) return
        setStatus('shredding')

        try {
            await fetch(`${API_URL}/vent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            })
        } catch (error) {
            console.error("Error venting:", error)
        }

        // Animation timing remains the same for effect
        setTimeout(() => {
            setText("")
            setStatus('done')
        }, 2000)

        setTimeout(() => {
            setStatus('idle')
        }, 4000)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                {status === 'done' ? (
                    <motion.div
                        key="done"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                    >
                        <RefreshCcw className="w-16 h-16 mx-auto mb-6 text-emerald-500 animate-spin-slow" />
                        <h2 className="text-3xl font-bold text-white mb-2">System Purged</h2>
                        <p className="text-zinc-400">The data has been irretrievably destroyed.</p>
                        <Button onClick={() => setStatus('idle')} variant="ghost" className="mt-8">
                            New Session
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{
                            opacity: 0,
                            y: 100,
                            filter: "blur(20px)",
                            scaleX: 0.1, // Squeeze effect
                            transition: { duration: 1.5, ease: "easeInOut" }
                        }}
                        className="w-full relative"
                    >
                        <div className="mb-8 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 mb-4 border border-red-500/20">
                                <Trash2 className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                                The Digital Shredder
                            </h2>
                            <p className="text-zinc-500 mt-2">
                                Type your stress. Shred it. Watch it disappear forever.
                            </p>
                        </div>

                        <div className={`relative group transition-all duration-300 ${status === 'shredding' ? 'shake-animation' : ''}`}>
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                disabled={status === 'shredding'}
                                placeholder="What's weighing on you right now?"
                                className="relative w-full h-80 bg-zinc-950 rounded-2xl p-8 text-lg md:text-xl text-zinc-300 placeholder-zinc-700 border border-zinc-800 focus:outline-none focus:border-red-500/50 resize-none font-mono leading-relaxed"
                                spellCheck={false}
                            />
                        </div>

                        <div className="mt-8 flex justify-center">
                            <Button
                                onClick={handleShred}
                                disabled={!text || status === 'shredding'}
                                variant="danger"
                                className="w-full py-6 text-lg tracking-widest uppercase font-bold group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5" />
                                    {status === 'shredding' ? 'DELETING SECTORS...' : 'Initiate Purge'}
                                </span>
                                {status === 'shredding' && (
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="absolute inset-0 bg-red-500/20"
                                    />
                                )}
                            </Button>
                        </div>

                        {/* Shredder Teeth Effect (Visual flair) */}
                        {status === 'shredding' && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: '100%' }}
                                transition={{ duration: 1.5 }}
                                className="absolute top-0 left-0 w-full bg-zinc-950/90 z-20 flex items-end justify-center backdrop-blur-sm"
                            >
                                <div className="w-full h-2 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Vent
