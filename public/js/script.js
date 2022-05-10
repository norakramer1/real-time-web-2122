
let socket = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault()
  if (input.value) {
    socket.emit('message', input.value)
    input.value = ''
  }
})

socket.on('message', message => {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
  messages.scrollTop = messages.scrollHeight
})

socket.on('userSongs', userSongs => {
  io.emit('userSongs', data); 
})

socket.on('user data', data => {
    data.forEach(asset => {
      document.querySelector('body').insertAdjacentHTML('beforeend', `
      <div>
        <h3>${asset.user}</h3>
        <ul></ul>
      </div>
      `)
      asset.songs.forEach(song => {
        document.querySelector('div:last-of-type ul').insertAdjacentHTML('beforeend', `
        <li>
          <img src="${song.albumImg[0].url}" alt="">

          <h2>${song.name.slice(0, 15) + (song.name.length > 15 ? "..." : "")}</h2>
          <p>${song.album.slice(0, 20) + (song.album.length > 20 ? "..." : "")}</p>
        </li>
        `)
      })
    }) 
    
})

