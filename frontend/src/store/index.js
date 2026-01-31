/**
 * 本地存储工具（收藏/音源配置）
 * 新手友好：无需数据库，直接存在浏览器本地
 */
export const store = {
  // 1. 音源配置
  getSources() {
    const sources = localStorage.getItem('music_sources');
    return sources ? JSON.parse(sources) : [
      { name: '默认音源', url: 'https://music.gdstudio.org' }
    ];
  },
  addSource(source) {
    const sources = this.getSources();
    sources.push(source);
    localStorage.setItem('music_sources', JSON.stringify(sources));
  },
  // 2. 收藏单曲
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
  // 3. 收藏歌单
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
