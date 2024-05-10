// 1. We import the user-event library.
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vitest } from 'vitest';
import PlaylistItemObject from '../../classes/PlaylistItemObject';
import Playlist from './Playlist';

describe('Button', async () => {

  const prepare = () => {

    const playlist:Array<PlaylistItemObject> = [];

    playlist.push(new PlaylistItemObject(0, 'title1', 'videoId1', false));
    playlist.push(new PlaylistItemObject(1, 'title2', 'videoId2', false));
    playlist.push(new PlaylistItemObject(2, 'title3', 'videoId3', false));
    
    return {
    
      playlist: playlist
    }
  }

  
});