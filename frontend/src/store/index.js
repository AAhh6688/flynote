// 保留原项目收藏功能，仅替换存储方式（网页端localStorage）
export const store = {
  // 音源配置（支持添加第三方API）
  getSources() {
    const sources = localStorage.getItem('music_sources');
    return sources ? JSON.parse(sources) : [{ name: '默认音源', url: 'https://music.gdstudio.org' }];
  },
  addSource(source) {
    const sources = this.getSources();
    sources.push(source);
    localStorage.setItem('music_sources', JSON.stringify(sources));
  },

  // 收藏单曲（原项目功能）
  getCollectSongs() {
    const songs = localStorage.getItem('collect_songs');
    return songs ? JSON.parse(songs) : [];
  },
  addCollectSong(song) {
    const songs = this.getCollectSongs();
    if (!songs.find(item => item.id === song.id)) {
      songs.push(song);
      localStorage.setItem('collect_songs', JSON.stringify(songs));
    }
  },
  removeCollectSong(songId) {
    let songs = this.getCollectSongs();
    songs = songs.filter(item => item.id !== songId);
    localStorage.setItem('collect_songs', JSON.stringify(songs));
  },

  // 收藏歌单（原项目功能）
  getCollectPlaylists() {
    const playlists = localStorage.getItem('collect_playlists');
    return playlists ? JSON.parse(playlists) : [];
  },
  addCollectPlaylist(playlist) {
    const playlists = this.getCollectPlaylists();
    if (!playlists.find(item => item.id === playlist.id)) {
      playlists.push(playlist);
      localStorage.setItem('collect_playlists', JSON.stringify(playlists));
    }
  },
  removeCollectPlaylist(playlistId) {
    let playlists = this.getCollectPlaylists();
    playlists = playlists.filter(item => item.id !== playlistId);
    localStorage.setItem('collect_playlists', JSON.stringify(playlists));
  }
};
