"use strict"

const btn = document.querySelector('.add-btn');
const addBtn = document.querySelector('.add-item-btn');
const cancelBtn = document.querySelector('.cancel-item-btn');
const input = document.querySelector('.input');
const form = document.querySelector('.form');
const titles = document.querySelectorAll('.title');

let value;

const lists = document.querySelectorAll('.list');
const addButton = document.querySelector('.add-board-btn');
const delButton = document.querySelector('.del-board-btn');

let draggedItem;

const listItem = document.querySelector('.list-item');

function addCard() {
    btn.addEventListener('click', () => {
        form.style.display = 'block';
        btn.style.display = 'none';
        addBtn.style.display = 'none';

        input.addEventListener('input', e => {
            value = e.target.value;
            
            if(value) {
                addBtn.style.display = 'block'
            } else {
                addBtn.style.display = 'none'
            }
        })
    })

    cancelBtn.addEventListener('click', () => {
        input.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'block';
    })

    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.classList.add('list-item');
        newItem.draggable = true;
        newItem.textContent = value;
        lists[0].append(newItem);

        input.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'block';

        dragNdrop();
    })
}

addCard();

function addBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('boards-item');
    board.innerHTML = `
    <input class="title" contenteditable="true" placeholder="Enter board title"></input>
        <div class="list" id="list"></div>
        <div class="form"></div>
        <div class="add-btn"><span>+</span>Add a card</div>
        <div class="del-board-btn">Delete this board</div>
    `

    boards.append(board);
    changeTitle();
    dragNdrop();
}

addButton.addEventListener('click', addBoard);

function delBoard() {
    const boards = document.querySelectorAll('.boards-item-todo');
	for (let i = 0; i < boards.length; i++) {
		const board = boards[i];
        board.remove();
	}
}

delButton.addEventListener('click', delBoard);

function changeTitle() {
    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '');
    })
}

changeTitle();

function dragNdrop() {
    const listItems = document.querySelectorAll('.list-item');
    const lists = document.querySelectorAll('.list');

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none'
            }, 0)
        })

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block';
            }, 0)
        })

        item.addEventListener('dblclick', () => {
            item.remove();
        })

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            list.addEventListener('dragover', e => e.preventDefault())

            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0, 0, .3)';
            })

            list.addEventListener('dragleave', function(e) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            })

            list.addEventListener('drop', function(e) {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                this.prepend(draggedItem);
            })
        }
    }
}

dragNdrop();