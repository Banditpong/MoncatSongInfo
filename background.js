function fetchData(){
    
    let active_song = document.getElementsByClassName("active-song")[0];
    //let album_art = getElementsByClassName("album-art")[0].style.backgroundImage;
    //let song_title = active_song.getElementsByClassName("song-title")[0].innerText;
    let song_title = active_song.getElementsByClassName("cursor-pointer release-link")[0].getInnerHTML().match("^(.*?)<")[1]
    let artist_list = Array.from(active_song.querySelector('.artists-list').children, ({textContent}) => textContent.trim()).filter(Boolean).join(', ');
    //chrome.storage.local.set({ "active_song": active_song });
    chrome.storage.local.set({ "song_title": song_title });
    chrome.storage.local.set({ "artist_list": artist_list });
    
    obs.send("SetSourceSettings", {
        sourceName : "song_artist" ,
        sourceSettings: {
        text: artist_list
        }
    }).catch(err => { 
        console.log(err);
    });

    obs.send("SetSourceSettings", {
        sourceName : "song_title" ,
        sourceSettings: {
        text: song_title
        }
    }).catch(err => { 
        console.log(err);
    });
}

const obs = new OBSWebSocket();

chrome.storage.local.get([
    'obs_ip_address', 
    'obs_ip_portnum',
    'obs_password'
],function(items) {
    obs_ip_address = items.obs_ip_address;
    obs_ip_portnum = items.obs_ip_portnum;
    obs_password = items.obs_password;

    obs.connect({
            address: obs_ip_address + ":" + obs_ip_portnum,
            password: obs_password
        })
        .then(() => {
            console.log("Success! We're connected & authenticated.");
        })
        .catch(err => { // Promise convention dicates you have a catch on every chain.
            console.log(err);
        });
    });

// You must add this handler to avoid uncaught exceptions.
obs.on('error', err => {
    console.error('socket error:', err);
});

let active_song = document.getElementsByClassName("active-song")[0];
//active_song.getElementsByClassName("song-title")[0].getElementsByClassName("scroll-item")[0].firstChild.children[0].remove()

setInterval(fetchData, 5000);
