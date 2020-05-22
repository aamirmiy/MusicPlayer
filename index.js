const $=require('jquery')
const mm=require('music-metadata')
let songlist = {path:[],title:[]}
let audioplayer = $('audio').get(0)
let playing =false
let current=0
let timer =null


function choosemusic(){
    $('input').click()
}

function musicselected(){
    let files = $('input').get(0).files
   // console.log(files)
    for (let i=0;i<files.length;i++){
        let {path}=files[i]
        console.log(path)
        mm.parseFile(path,{native:true}).then(metadata=>{
        songlist.path[i]=path
        songlist.title[i]=metadata.common.title
        let songs=`
        <tr ondblclick="playSong(${i})">
            <td>${metadata.common.title}</td>
            <td>${metadata.common.artist}</td>
            <td>${secondsToTime(metadata.format.duration)}</td>
        </tr>
        `
        $('#table-body').append(songs)
        })
    }
}

function playSong(index){
    audioplayer.src = songlist.path[index]
    current=index
    audioplayer.load()
    audioplayer.play()
    playing=true
    $('h4').text(songlist.title[index])
    updatebutton()
    timer=setInterval(updatetime,1000)
    
}

function updatetime(){
    $('#time-left').text(secondsToTime(audioplayer.currentTime))
    $('#total-time').text(secondsToTime(audioplayer.duration))
    if(audioplayer.currentTime>=audioplayer.duration){
        playnext()
    }
}

function playbtn(){
    if(playing){
        audioplayer.pause()
        clearInterval(timer)
        //playing=false
        
    }else{
        audioplayer.play()
        //playing=true
        timer=setInterval(updatetime,1000)
    }
    playing=!playing
    updatebutton()
}

function updatebutton(){
    let playicon = $('#play-button span')
    if(playing){
        playicon.removeClass('icon-play')
        playicon.addClass('icon-pause')
    }else{
        playicon.removeClass('icon-pause')
        playicon.addClass('icon-play')
    }
}

function playnext(){
    current++
    if(current>=songlist.path.length)current=0;
    playSong(current)
}
function playprev(){
    current--
    if(current<0)current=songlist.path.length-1;
    playSong(current)
}

function clearplaylist(){
    clearInterval(timer)
    $('#time-left').text("00:00")
    $('#total-time').text("00:00")
    $('#table-body').html('')
    songlist = {path:[],title:[]}
    audioplayer.src=''
    current=0
    playing=false
    $('h4').text('')
    updatebutton()
}

function changevolume(input){
    audioplayer.volume=input.value
}

function secondsToTime(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" + 
           padZero(parseInt((t) % 60));
  }
function padZero(v) {
return (v < 10) ? "0" + v : v;
}