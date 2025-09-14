const findBestMatches = (array, search, amount) => {
    return array
        .filter(item => item.title.toLowerCase().includes(search.toLowerCase())) 
        .sort((a, b) => b.length - a.length) 
        .slice(0, amount); 
};

function addSongIdToplaylist(songIdToAdd,playlists) {
    let addedToAnyPlaylist = false;

    playlists.forEach(playlist => {
        if (!playlist.songIds.includes(songIdToAdd)) {
            playlist.songIds.push(songIdToAdd);
            addedToAnyPlaylist = true;
            console.log(`Song ID ${songIdToAdd} added to playlist ${playlist.id}`);
        } else {
            console.log(`Song ID ${songIdToAdd} already exists in playlist ${playlist.id}`);
        }
    });

    if (!addedToAnyPlaylist) {
        console.log(`Song ID ${songIdToAdd} already exists in all playlists`);
    }
    
}

function replaceByIds(original, replacements, idsToReplace) {
    const replacementMap = new Map(replacements.map(item => [item.id, item]));

    return original.map(item => {
      
        if (idsToReplace.includes(item.id) && replacementMap.has(item.id)) {
            return replacementMap.get(item.id); 
        }
        return item; 
    });
}

function deleteById(firstArray, secondArray, song) {
  const songId = song.id;
  secondArray.forEach(obj => {

    const songIndex = obj.songIds.indexOf(songId);

    if (songIndex != -1) {
      obj.songIds.splice(songIndex, 1);
      const indexInFirst = firstArray.findIndex(item => item.id == obj.id);

      if (indexInFirst != -1) {
        firstArray[indexInFirst] = { ...obj }; 
      }
    }
  });

  return firstArray;
}

function updateLikedSongs(selected, others, user, song, users) {
  const songId = song.id;
  const isInSelected =selected.includes(0);
  const isInOthers = others.some(obj => obj.id == 0);
  const updatedUser = { ...user, likedSongsId: [...user.likedSongsId] };


    console.log("---------------");
    console.log(selected);
     console.log("---------------");
    console.log(others);
    
    
  if (isInSelected && !updatedUser.likedSongsId.includes(songId)) {
    console.log("in selected");
    
    updatedUser.likedSongsId.push(songId);
  }

  if (isInOthers && updatedUser.likedSongsId.includes(songId)) {
    updatedUser.likedSongsId = updatedUser.likedSongsId.filter(id => id !== songId);
  }

  const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));

  return updatedUsers;
}

module.exports={findBestMatches,addSongIdToplaylist,replaceByIds,deleteById,updateLikedSongs}