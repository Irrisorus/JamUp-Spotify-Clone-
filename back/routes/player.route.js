const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const { loadData, updateData } = require("../utils/FileManager");
const {findBestMatches,addSongIdToplaylist,
  replaceByIds,deleteById,updateLikedSongs}=require("../data/searchData");




let songs=JSON.parse(loadData("songs"))
let albums=JSON.parse(loadData("albums"))
let playlists=JSON.parse(loadData("playlists"))
let users=JSON.parse(loadData("users"))

const musicFolder = path.join(__dirname, "../data", "music");
router.get("/songs", (req, res) => {
  res.json(JSON.parse(loadData("songs")));
});


// Основной маршрут для стриминга
router.get("/getTrack", async (req, res) => {
  const { id } = req.query;

  const songs = JSON.parse(loadData("songs"));
  const song = songs.find((s) => s.id == id);

  if (!song) {
    return res.status(404).send("Song not found");
  }

  const filename = song.fileName;
  const filePath = path.join(musicFolder, filename);

  // console.log(`Request for track: ${safeTrackName}`);
  console.log(`Full path: ${filePath}`);

  try {
    // 1. Проверяем существование файла и получаем его размер
    const stats = await fs.promises.stat(filePath);
    const fileSize = stats.size;
    const contentType = mime.lookup(filePath) || "application/octet-stream"; // Определяем MIME-тип

    // 2. Обрабатываем HTTP Range заголовки (ключ к стримингу)
    const range = req.headers.range;

    if (range) {
      console.log(`Range header detected: ${range}`);
      // Пример: "bytes=1000-5000"
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      // Если end не указан, читаем до конца файла
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Проверяем валидность диапазона
      if (start >= fileSize || end >= fileSize || start > end) {
        console.error(
          `Invalid Range: start=${start}, end=${end}, fileSize=${fileSize}`
        );
        res.status(416).send("Requested Range Not Satisfiable");
        return;
      }

      const chunksize = end - start + 1;
      console.log(
        `Streaming chunk: start=${start}, end=${end}, chunksize=${chunksize}`
      );

      // 3. Создаем поток чтения для нужного диапазона байт
      const fileStream = fs.createReadStream(filePath, { start, end });

      // 4. Устанавливаем заголовки для частичного контента (206)
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": contentType,
      };

      res.writeHead(206, head); // Отправляем статус 206 Partial Content

      // 5. Пайпим (pipe) поток файла в ответ сервера
      fileStream.pipe(res);

      fileStream.on("error", (streamErr) => {
        console.error("Stream error:", streamErr);
        // Попытка закрыть соединение, если оно еще не закрыто
        if (!res.headersSent) {
          res.status(500).send("Internal Server Error during streaming");
        } else {
          res.end(); // Завершаем ответ, если заголовки уже отправлены
        }
      });
    } else {
      // Если Range не указан, отдаем весь файл (менее типично для аудио)
      // Но браузеры обычно сами запрашивают Range: bytes=0-
      console.log("No Range header. Sending full file.");
      const head = {
        "Content-Length": fileSize,
        "Content-Type": contentType,
        "Accept-Ranges": "bytes", // Сообщаем, что поддерживаем Range запросы
      };
      res.writeHead(200, head); // Статус 200 OK
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      fileStream.on("error", (streamErr) => {
        console.error("Stream error (full file):", streamErr);
        if (!res.headersSent) {
          res.status(500).send("Internal Server Error during streaming");
        } else {
          res.end();
        }
      });
    }
  } catch (err) {
    // Обработка ошибок (файл не найден и т.д.)
    if (err.code === "ENOENT") {
      console.error(`File not found: ${filePath}`);
      res.status(404).send("Track not found");
    } else {
      console.error(`Error accessing file ${filePath}:`, err);
      res.status(500).send("Internal Server Error");
    }
  }
});

// router.get('/music/:filename', (req, res) => {
//   console.log("req.params.filename"+req.params.filename);

//     const file = path.join(__dirname, 'music', req.params.filename);
//     res.sendFile(file);
// });

router.get("/search", (req, res) => {
  let { name } = req.query;
  const reqSongs=findBestMatches(songs,name,5)
  const reqAlbums=findBestMatches(albums,name,5)
  const reqPlaylists=findBestMatches(playlists,name,5)
  let bestSearch=reqSongs.length > 0 ? reqSongs : (reqAlbums.length > 0 ? reqAlbums : reqPlaylists);

  res.status(200).json(
    {
      bestResult:bestSearch,
      songsResult:(reqSongs.length>0?reqSongs:null),
      albumsResult:(reqAlbums.length>0?reqAlbums:null),
      playlistsResult:(reqPlaylists.length>0?reqPlaylists:null),
    }
  )
  
});

router.get("/getUserPlaylists",(req,res)=>{
  let {userId} = req.query
  const reqUser=users.find((user)=>{return user.id==userId})
  const filteredPlaylists=playlists.filter(playlist=>reqUser.likedPlaylistsId.includes(playlist.id))

  res.status(200).send({
    userFavouriteSongs:reqUser.likedSongsId,
    playlists:filteredPlaylists
  })
})


router.get("/getSongsForPlaylsit",(req,res)=>{
  let {userId,playlistId}= req.query;
  const reqUser=users.find((user)=>{return user.id==userId})
 
  if (playlistId == "0") {
    const filteredSongs=songs.filter(song=>reqUser.likedSongsId.includes(song.id))
    // console.log(filteredSongs);
    res.status(200).send({
      user:reqUser,
      playlist:{
        id:0,
        title:"Любимые треки", 
        type:"playlist",
        cover:"/favourites.PNG", 
        owner:reqUser.username, 
        trackCount: reqUser.likedSongsId.length
      },
      songs:filteredSongs
    })
  }
  else{
   const reqPlaylist=playlists.find((playlist)=>{return playlist.id==playlistId})
   const filteredSongs=songs.filter(song=>reqPlaylist.songIds.includes(song.id))
    // console.log(filteredSongs);
    res.status(200).send({
      user:reqUser,
      playlist:{
        id:reqPlaylist.id,
        title:reqPlaylist.title, 
        type:reqPlaylist.type,
        cover:reqPlaylist.cover, 
        owner:reqPlaylist.artist, 
        trackCount:reqPlaylist.songIds.length
      },
      songs:filteredSongs
    })
  }
  
})

router.use(express.json());

router.put("/changePlaylist", (req, res) => {
 let data=req.body
 console.log(data);
 const reqPlaylists=playlists.filter((playlist)=>{
      return data.selectedPlaylists.includes(playlist.id)
  })  

  addSongIdToplaylist(data.song.id,reqPlaylists)
  replaceByIds(playlists,reqPlaylists,data.selectedPlaylists)//-- добавление
  deleteById(playlists,data.otherPlaylists,data.song)//--удаление, если убрали из плейлиста
  const curUser=users.find(user=>user.id==data.userId)
  console.log(curUser);
  users=updateLikedSongs(data.selectedPlaylists,data.otherPlaylists,curUser,data.song,users)
  console.log(users);
  
  updateData(users,"users")
  updateData(playlists,"playlists")

  res.status(200).send(playlists);
});

module.exports = router;


















