
let socket = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')
let reload = document.querySelector('a.login')

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

socket.on('user data', data => {
    data.forEach(asset => {
      document.querySelector('body').insertAdjacentHTML('beforeend', `
      <div>
        <h2> ${asset.user}</h2>
        <ul class="songs"></ul>
      </div>
      `)
      asset.songs.forEach(song => {
        document.querySelector('div:last-of-type ul').insertAdjacentHTML('beforeend', `
        <li>
          <img src="${song.albumImg[0].url}" alt="">

          <h3>${song.name.slice(0, 15) + (song.name.length > 15 ? "..." : "")}</h3>
          <p>${song.album.slice(0, 20) + (song.album.length > 20 ? "..." : "")}</p>
        </li>
        `)
      })
    }) 
    
})

socket.on("reload", () => {
  location.reload();
});
