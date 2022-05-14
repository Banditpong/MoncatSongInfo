function fetchData(){
    console.log('Default background color set to ...');
    
    let active_song = document.getElementsByClassName("active-song")[0];
    //let album_art = getElementsByClassName("album-art")[0].style.backgroundImage;
    let song_title = active_song.getElementsByClassName("song-title")[0].innerText;
    let artist_list = Array.from(active_song.querySelector('.artists-list').children, ({textContent}) => textContent.trim()).filter(Boolean).join(', ');
    //chrome.storage.local.set({ "active_song": active_song });
    chrome.storage.local.set({ "song_title": song_title });
    chrome.storage.local.set({ "artist_list": artist_list });

}

setInterval(fetchData, 2000);