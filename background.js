function html2text(item){
    const parser = new DOMParser();
    const doc1 = parser.parseFromString(item, 'text/html');
    return doc1.documentElement.textContent;
}
var current_song = "nothing";
var observer = new MutationObserver(function(mutations){
    for(var mutation of mutations) {
        let active_song = document.getElementsByClassName("active-song")[0];
        let song_title = html2text(active_song.getElementsByClassName("cursor-pointer release-link")[0].getInnerHTML().match("^(.*?)<")[1]);
        if (active_song != song_title){  
            current_song = song_title;
            let artist_list = Array.from(active_song.querySelector('.artists-list').children, ({textContent}) => textContent.trim()).filter(Boolean).join(', ');
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
            })
        }
    }
  });

// Start observing the target node for configured mutations
var observerTarget = document.getElementsByClassName("active-song")[0].getElementsByClassName("song-info")[0].querySelector('.song-title');
observer.observe(observerTarget, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
});

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
