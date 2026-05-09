import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Hash, Filter, Plus, MessageCircle, Loader2 } from 'lucide-react'
import Button from '../components/ui/Button'

const Wall = () => {
    const [filter, setFilter] = useState('all')
    const [showInput, setShowInput] = useState(false)
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [newNote, setNewNote] = useState("")
    const [selectedTag, setSelectedTag] = useState("thought")

    const tags = ['thought', 'vent', 'mood', 'love']
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_URL}/posts`)
                if (response.ok) {
                    const data = await response.json()
                    // The backend returns objects like: { _id, content, tag, likes, createdAt }
                    // We map them to match the frontend expectations
                    const formattedData = data.map(post => ({
                        id: post._id,
                        text: post.content,
                        tag: post.tag,
                        likes: post.likes,
                        liked: false // Since there's no user auth, we track this locally later if needed
                    }))
                    setNotes(formattedData)
                }
            } catch (error) {
                console.error("Error fetching posts:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPosts()
    }, [API_URL])

    const handlePost = async (e) => {
        e.preventDefault()
        if (!newNote.trim()) return

        try {
            const response = await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newNote, tag: selectedTag })
            })
            
            if (response.ok) {
                const post = await response.json()
                const newFormattedNote = {
                    id: post._id,
                    text: post.content,
                    tag: post.tag,
                    likes: post.likes,
                    liked: false
                }
                setNotes([newFormattedNote, ...notes])
                setNewNote("")
                setShowInput(false)
            }
        } catch (error) {
            console.error("Error creating post:", error)
        }
    }

    const toggleLike = async (id) => {
        // Optimistic UI update
        const noteToLike = notes.find(n => n.id === id)
        if (noteToLike.liked) return; // Prevent multiple likes if simple UI

        setNotes(notes.map(note => {
            if (note.id === id) {
                return {
                    ...note,
                    likes: note.likes + 1,
                    liked: true
                }
            }
            return note
        }))

        try {
            await fetch(`${API_URL}/posts/${id}/like`, { method: 'PUT' })
        } catch (error) {
            console.error("Error liking post:", error)
            // Revert on error (optional, omitted for brevity)
        }
    }

    const filteredNotes = filter === 'all' ? notes : notes.filter(n => n.tag === filter)

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Header and Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                        Anonymous Wall
                    </h2>
                    <p className="text-zinc-500">Encrypted thoughts from the collective.</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    <Filter className="w-4 h-4 text-zinc-600 mr-2" />
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === 'all' ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                    >
                        All
                    </button>
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setFilter(tag)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filter === tag ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {tag}
                        </button>
                    ))}
                    <Button onClick={() => setShowInput(!showInput)} className="ml-2 px-3 py-2">
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Input Area */}
            <AnimatePresence>
                {showInput && (
                    <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        onSubmit={handlePost}
                        className="overflow-hidden bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm"
                    >
                        <textarea
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Broadcast your thought..."
                            maxLength={200}
                            className="w-full bg-transparent border-none text-lg text-zinc-100 placeholder-zinc-600 focus:ring-0 resize-none h-24"
                        />
                        <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-2">
                            <div className="flex gap-2">
                                {tags.map(tag => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => setSelectedTag(tag)}
                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${selectedTag === tag ? 'bg-violet-500/20 text-violet-300 border border-violet-500/50' : 'text-zinc-500 hover:text-zinc-300'}`}
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                            <Button type="submit" variant="primary" className="px-6 py-2 h-auto text-sm">
                                Transmit
                            </Button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredNotes.map((note) => (
                            <motion.div
                                layout
                                key={note.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -5 }}
                                className="group relative flex flex-col justify-between p-6 bg-zinc-900/30 border border-white/5 rounded-2xl hover:bg-zinc-900/60 hover:border-white/10 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300"
                            >
                                <div className="mb-4">
                                    <span className="inline-block px-2 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded bg-zinc-950">
                                        #{note.tag}
                                    </span>
                                    <p className="text-lg text-zinc-300 font-light leading-relaxed font-serif italic">
                                        "{note.text}"
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-4 text-zinc-500 text-xs">
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="w-3 h-3" /> Anonymous
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => toggleLike(note.id)}
                                        className={`flex items-center gap-1.5 text-xs font-medium transition-all ${note.liked ? 'text-rose-500' : 'text-zinc-600 hover:text-zinc-400'}`}
                                    >
                                        <Heart className={`w-4 h-4 ${note.liked ? 'fill-rose-500' : ''}`} />
                                        {note.likes}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}

export default Wall
