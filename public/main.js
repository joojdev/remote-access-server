const commandForm = document.querySelector('#commandForm')
const commandInput = document.querySelector('#command')
const outputBox = document.querySelector('#output')
const shutdownButton = document.querySelector('#shutdown')

async function sendCommand(command) {
  const response = await fetch('/command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ command })
  })

  const data = await response.json()
  
  if (data.message) return outputBox.textContent = data.message
}

commandForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const command = commandInput.value.trim()
  
  if (!command) return
  commandInput.value = ''

  sendCommand(command)
})

shutdownButton.addEventListener('click', () => {
  fetch('/shutdown')
})