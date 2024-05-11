import { render, screen } from '@testing-library/react'
import { describe, it, expect, vitest, vi } from 'vitest'
import PlaylistItemObject from '../../classes/PlaylistItemObject'
import Playlist from './Playlist';

describe('Playlist', async () => {
    
    it('should render 3 items', async () => {
        
        vi.mock('react-router-dom', async () => {

            const mod = await vitest.importActual('react-router-dom');
            return {
                ...mod,
                useLocation: () => {
                    return { search: 'abc' }
                }
            };
        });

        vi.mock('../../hooks/useGlobalContext', () => {

            const preparePlaylist = () => {

            const items:Array<PlaylistItemObject> = [];

                items.push(new PlaylistItemObject(0, 'title1', 'videoId1', false));
                items.push(new PlaylistItemObject(1, 'title2', 'videoId2', false));
                items.push(new PlaylistItemObject(2, 'title3', 'videoId3', false));

                return {

                    position: 0,
                    title: 'mockedPlaylistTitle',
                    id: 0,
                    items: items
                }
            }
            const defaultValueForMockContext = { state: { playlists: [ preparePlaylist() ], currentPlaylistId: 0 }};

            return {
                __esModule: true,
                useGlobalContext: vi.fn(() => defaultValueForMockContext)
            };        
        }); 
        
        render(<Playlist />);

        const playlistItems = await screen.findAllByText(/title/)

        expect(playlistItems).toHaveLength(3);
    })

});