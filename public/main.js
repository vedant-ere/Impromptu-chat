//Making connection to the socket server

// const socket = io("http://localhost:4000" , {}) // Takes two parameters 1. url of the socket sever an optioons 

// web socket server is connected to our window . location url
const socket = io() 

const clientsTotal = document.getElementById('clients-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    sendMessage()
})

socket.on('clients-total', (data)=>{
    clientsTotal.innerText=(`Total Clients: ${data}`)

})


function sendMessage(){
    console.log(messageInput.value)
    const data ={
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data)=>{
    // console.log(data)
    addMessageToUI(false, data) //We are calling this function here in receving message and passing false so that it can correctly chnage the class as message left 
})

function addMessageToUI(isOwnMessage, data ){
    const element=`
    <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
    <p class="message">
      ${data.message}
      <span>${data.name}</span>
    </p>
  </li>`

  messageContainer.innerHTML += element
}