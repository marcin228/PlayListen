import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import GlobalContextProvider from './contexts/GlobalContextProvider'
import { BrowserRouter } from 'react-router-dom'
import LayoutMain from './layouts/LayoutMain'
import Player from './components/Player/Player'
import Settings from './components/Settings/Settings'

const Playlists = lazy(() => import('./components/Playlists/Playlists'));

function App() {

    return (
    <>
    <BrowserRouter>
        <GlobalContextProvider>
            <Routes>
                <Route path="/" element={<LayoutMain />}>
                    <Route index element={<Player></Player>} />
                    <Route path="/player" element={<Player></Player>} />
                    <Route path="/playlists/:id" element={<Suspense fallback=""><Playlists></Playlists></Suspense>}/>
                    <Route path="/playlists" element={<Suspense fallback=""><Playlists></Playlists></Suspense> }/>
                    <Route path="/settings" element={<Settings></Settings>} />
                </Route>
            </Routes>
        </GlobalContextProvider>
    </BrowserRouter>
    </>
    )
}

export default App
