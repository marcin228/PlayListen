import { Route, Routes } from 'react-router-dom'
import './App.css'
import GlobalContextProvider from './contexts/GlobalContextProvider'
import { BrowserRouter } from 'react-router-dom'
import LayoutMain from './layouts/LayoutMain'
import Player from './components/Player/Player'
import Playlists from './components/Playlists/Playlists'
import Settings from './components/Settings/Settings'

function App() {

    return (
    <>
    <BrowserRouter>
        <GlobalContextProvider>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<Player></Player>} />
                    <Route path="/player" element={<Player></Player>} />
                    <Route path="/playlists" element={<Playlists></Playlists>} />
                    <Route path="/settings" element={<Settings></Settings>} />
                </Route>
            </Routes>
        </GlobalContextProvider>
    </BrowserRouter>
    </>
    )
}

export default App
