import axios from "axios";

class PlayerService {
  axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
  });
  getSongs(){
      return this.axiosInstance.get(`/songs`);
  }

  getTrack(id) {
    return this.axiosInstance.get(`/getTrack?id=${id}`);
  }

  getSearchResult(name){
    return this.axiosInstance.get(`/search?name=${name}`)
  }
  getPlaylists(id){
    return this.axiosInstance.get(`/getUserPlaylists?userId=${id}`)
  }
  getSongsForPlaylist(userId,playlistId){
    return this.axiosInstance.get(`/getSongsForPlaylsit?userId=${userId}&playlistId=${playlistId}`)
  }
  
  changeSongsInUserPlaylists(data) {
    return this.axiosInstance.put(`/changePlaylist`, data);
  }

//   editSmartphone(data) {
//     return this.axiosInstance.put(`/edit`, data);
//   }

//   deleteSmartphone(name) {
//     return this.axiosInstance.delete(`/delete`, { params: { name } });
//   }
}

export default PlayerService;
