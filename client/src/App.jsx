import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Wall from './pages/Wall'
import Vent from './pages/Vent'

function App() {
    return (
        <div className="bg-zinc-950 text-zinc-100">
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/wall" element={<Wall />} />
                    <Route path="/vent" element={<Vent />} />
                    <Route path="*" element={<div className="flex h-[80vh] items-center justify-center text-xl text-zinc-500">404 - Signal Lost</div>} />
                </Routes>
            </Layout>
        </div>
    )
}

export default App
