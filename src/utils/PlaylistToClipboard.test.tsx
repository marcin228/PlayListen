import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import PlaylistItemObject from '../classes/PlaylistItemObject';
import playlistToClipboard from './PlaylistToClipboard';

describe('PlaylistToClipboard', async () => {

    it('should generate link and write to clipboard', async () => {

        const user = userEvent.setup();
        const playlistTitle:string = 'pt1';
        const playlistItems:Array<PlaylistItemObject> = [];
        playlistItems.push(new PlaylistItemObject(0, 'title1', 'videoId1', false));        
        const onClickHandler = () => { playlistToClipboard(playlistTitle, playlistItems);}

        render(<div data-testid='abc' onClick={onClickHandler}></div>);
        const button = screen.getByTestId('abc');
        await user.click(button);
        const clipboardText = await navigator.clipboard.readText();
        expect(clipboardText).toBe(import.meta.env.BASE_URL+'/player?linkedPlaylist=pt1,title1,videoId1');
    });
});