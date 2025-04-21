let color = document.querySelector('.color')

let createBtn = document.querySelector('.create__button')

let list = document.querySelector('.list ')

createBtn.addEventListener('click' , (event) => {

 
    let newNote = document.createElement('div')

    newNote.classList.add('list__note')
    newNote.innerHTML = `
         <span class="close__note">x</span>
        <textarea name="user note" id="" 
        placeholder="write something text" 
        rows="10" 
        cols="30"></textarea>
    `
    newNote.style.borderColor = color.value

    list.appendChild(newNote)
})



document.addEventListener('click', (event) => {
  
    const isCloseNote = event.target.classList.contains('close__note')

    if(!isCloseNote) {
        return
    }

    event.target.parentNode.remove()
})

let cursor = {
    x: null,
    y: null,
}

let note = {
    dom: null,
    x: null,
    y: null,
}


document.addEventListener('pointerdown', (event) => {

    const isNote = event.target.classList.contains('list__note')

    if(!isNote) {
        return
    }

    cursor = {
        x: event.clientX,
        y: event.clientY,
    }

    note = {

        dom: event.target,
        x: event.target.getBoundingClientRect().left,
        y: event.target.getBoundingClientRect().top,

    }

    note.dom.style.cursor = 'grab'
})

document.addEventListener('pointermove', (event) => {
    
   

    if(note.dom === null) {
        return
    }

    let currentCursor = {
      x: event.clientX,
      y: event.clientY,
    }

    let distance = {
        x: currentCursor.x - cursor.x,
        y: currentCursor.y - cursor.y,
    }

    note.dom.style.left = (note.x + distance.x) + 'px'
    note.dom.style.top = (note.y + distance.y) + 'px'
    note.dom.style.cursor = 'grabbing'


})

document.addEventListener('pointerup', () => {
    
    if(note.dom === null) {
        return
    }
    note.dom = null
  
})