console.log('Lets write JavaScript');
let currentsurah = new Audio();
let currFolder;
let songs;
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currFolder = folder;
    let response = await fetch(`http://127.0.0.1:5500/${folder}/`);
    let htmlContent = await response.text();


    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;
    songs = []

    let as = tempContainer.getElementsByTagName('a');
    // console.log(as)
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1])
        }

    }
    console.log(songs,"ami joss")
    let surah = document.querySelector(".songList").getElementsByTagName("ul")[0];
    surah.innerHTML = ""
    let songMapping = {};


    for (const song of songs) {
        // Use the original song name without extensive modifications
        let originalSongName = decodeURIComponent(song.replace(/%([0-9A-Fa-f]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));

        // Clean the song name for display
        let cleanedSongName = originalSongName.replace(/\bMP3\b/g, '').replace(/\bmpkmp\b/gi, '').replace(/\.mp3$/, '');

        // Add the original song name to the mapping
        songMapping[cleanedSongName] = originalSongName;

        // Add the cleaned song name to the list
        surah.innerHTML = surah.innerHTML + ` <li class="listbhai flex justify-between gap-[10px] hover:cursor-pointer py-3 px-3 my-3 border-[1px] rounded-[5px] border-red-600 text-[13px] text-slate-500 ">
                            <img class="invert" src="img/music.svg" alt="">
                            <div class="info w-[178px]">
                                <div>${cleanedSongName}</div>
                                <div>Moin</div>
                            </div>
                            <div class="playnow flex justify-center items-center ">
                                <span class="spanbhai text-[15px] width-[117px] p-3 text-slate-50">Play Now</span>
                                <img class="invert" src="img/play.svg" alt="">
                            </div>
                        </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            let cleanedSongName = e.getElementsByTagName("div")[0].getElementsByTagName("div")[0].innerHTML;
            let originalSongName = songMapping[cleanedSongName];
            playMusic(originalSongName);
        });
    });
    return songs

}


const playMusic = (track, pause = false) => {
    console.log(track)
    // let audio=new Audio("/songs/" + track)
    currentsurah.src = `/${currFolder}/` + track
    if (!pause) {
        currentsurah.play()
        console.log("catt")
        play.src = "img/pause.svg"
    }


    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"


}

async function displayAlbums() {
    console.log("displaying albums");

    // Fetch the main content from the server
    let response = await fetch(`http://127.0.0.1:5500/songs/`);
    let htmlContent = await response.text();

    // Create a temporary container and populate it with the fetched HTML content
    let tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;

    // Get all anchor elements inside the temporary container
    let anchors = tempContainer.getElementsByTagName("a");

    // Select the cardContainer where the albums will be displayed
    let cardContainer = document.querySelector(".cardContainer");
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        // Use Promise.all to wait for all fetch operations to complete

        if (e.href.includes("/songs/")) {
            // Extract the folder name from the anchor's href
            let folder = e.href.split("/").slice(-2)[1];

            // Fetch album information from info.json
            let response = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
            console.log("Fetch URL:", `http://127.0.0.1:5500/songs/${folder}/info.json`);


            // Assuming info.json returns valid JSON data, parse it
            let infoJson = await response.json();

            // Append the HTML to cardContainer
            cardContainer.innerHTML += `
                <div data-folder="${folder}" class="card w-[200px] p-[10px] rounded-md bg-gray-950 relative">
                    <div class="play transition ease-in-out hover:-translate-y-1 hover:scale-110 absolute top-[81px] right-[17px] w-[28px] h-[28px] bg-gray-800 rounded-[50%] p-[4px] flex items-center justify-center border-2 border-slate-700">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <img class="w-full object-contain pt-[10px]" src="/songs/${folder}/cover.jpg" alt="">
                    <h2 class="card_heading pt-[10px]">${infoJson.title}</h2>
                    <p class="card_heading pt-[10px]">${infoJson.description}</p>
                </div>`;
        }
    }
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {

            console.log(item.currentTarget.dataset)
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])



        })
    })
}

// Call the function to display albums



async function main() {

    await getsongs("songs/mishar");
    playMusic(songs[0], true)
    displayAlbums()

    play.addEventListener("click", () => {
        if (currentsurah.paused) {
            currentsurah.play()
            play.src = "img/pause.svg"

        }
        else {
            currentsurah.pause()
            play.src = "img/play.svg"

        }
    })
    currentsurah.addEventListener("timeupdate", () => {
        // console.log(currentsurah.)
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
            currentsurah.currentTime)} / ${secondsToMinutesSeconds(currentsurah.duration)}`
        document.querySelector(".circle").style.left = (currentsurah.currentTime / currentsurah.duration) * 100 + "%";
    })
    document.querySelector(".seekbar").addEventListener("click", e => {
        console.log(e)
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsurah.currentTime = ((currentsurah.duration) * percent) / 100
    })
    document.querySelector(".hamburgerContainer").addEventListener("click", () => {
        document.querySelector(".left1").style.left = "0"
    })
    document.querySelector(".hamburgerContainer").addEventListener("click", () => {
        document.querySelector(".left1").style.left = "0"
    })
    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left1").style.left = "-100%"
    })
    previous.addEventListener("click", () => {
        currentsurah.pause()
        console.log("Previous clicked")
        let index = songs.indexOf(currentsurah.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentsurah.pause()
        console.log(songs)
        console.log("Next clicked")
      
        let index = songs.indexOf(currentsurah.src.split("/").slice(-1)[0])
        console.log(index)
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        console.log("Setting volume to", e.target.value, "/ 100")

        currentsurah.volume = parseInt(e.target.value) / 100
        if (currentsurah.volume > 0) {
            document.querySelector(".volume>img").src = document.querySelector(".volume>img").src.replace("mute.svg", "volume.svg")
        }
    })


    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentsurah.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else {
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentsurah.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })

}
main();
