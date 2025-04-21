
class DragAndDrop {

    classList = {
        isColor: 'color',
        isCreateBtn: 'create__button',
        isList: null,
        isListNote: 'list__note',
        isNewDiv: 'div',
        isClose: 'close__note',
    }

    selectors = {
        root: `[data-js-list]`,
        rootBtn: `[data-js-btn]`,
        rootColor: `[data-js-color]`,
        innerHtml: `
         <span class="close__note">x</span>
        <textarea name="user note" id="" 
        placeholder="write something " 
        rows="10" 
        cols="30"></textarea>
    `,
    }

    initialCursorState = {
        offsetX: null,
        offsetY: null,
    }

    initialNoteState = {
        offsetX: null,
        offsetY: null,
        dom: null,
    }

    constructor() {
        this.cursorState ={...this.initialCursorState},
        this.noteState = {...this.initialNoteState},

        this.bindEvents()
    }

    onCreateClick(event) {

        const isList = this.classList.isList = document.querySelector(this.selectors.root)

        if(!isList) {
            console.error('IsList not are fined')
            return
        }
        const target = event.target

        if(!target.classList.contains(this.classList.isCreateBtn)) {
            return
        }


        let newNote = document.createElement(this.classList.isNewDiv)

        newNote.classList.add(this.classList.isListNote)
        newNote.innerHTML = this.selectors.innerHtml

        const changeColor = this.classList.isColor = document.querySelector(this.selectors.rootColor)

        newNote.style.borderColor = changeColor.value

        this.classList.isList.appendChild(newNote)
        
    }

    onCloseClick(event) {
        const isCloseNote = event.target.classList.contains(this.classList.isClose)

        if(!isCloseNote) return

        event.target.parentNode.remove()

    }

    onPointerDown(event) {

        const isNote = event.target.classList.contains(this.classList.isListNote)

        if(!isNote)  return
        

        this.cursorState = {
            offsetX: event.clientX,
            offsetY: event.clientY,
        }

       

        this.noteState = {
            dom: event.target,
            offsetX: event.target.getBoundingClientRect().left,
            offsetY: event.target.getBoundingClientRect().top,
        }

        
        this.noteState.dom.style.cursor = 'grab'
    }

    onPointerMove(event) {

        if(this.noteState.dom === null)  return
    

        const currentCursor = {
            offsetX: event.clientX,
            offsetY: event.clientY,
        }

        const distance = {
            offsetX: currentCursor.offsetX - this.cursorState.offsetX,
            offsetY: currentCursor.offsetY - this.cursorState.offsetY,
        }

        this.noteState.dom.style.left = (this.noteState.offsetX + distance.offsetX) + 'px',
        this.noteState.dom.style.top = (this.noteState.offsetY + distance.offsetY) + 'px',
        this.noteState.dom.style.cursor = 'grabbing'
    }

    onPointerUp() {

        if(this.noteState.dom === null)  return
        

        this.noteState = {
            dom: null
        }

        this.noteState = {...this.initialNoteState}
    }

    bindEvents() {

        document.addEventListener('click', (event) => this.onCloseClick(event))
        document.addEventListener('click', (event) => this.onCreateClick(event))
        document.addEventListener('pointerdown', (event) => this.onPointerDown(event))
        document.addEventListener('pointermove', (event) => this.onPointerMove(event))
        document.addEventListener('pointerup', () => this.onPointerUp())
    }
    
}

new DragAndDrop()