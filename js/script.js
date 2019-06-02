let input = document.querySelector('.head .input')
let icon = document.querySelector('.head .icon')
let buttom = document.querySelector('.head .buttom')
let todoItem = document.querySelector('.todoList .todoItem')
let doneItem = document.querySelector('.doneList .doneItem')
let list = localStorage.list ? JSON.parse(localStorage.list) : []

refresh()

input.onfocus = function () {
	icon.style.display = 'none'
	buttom.style.display = 'none'
	input.style.left = '7px'
	input.style.width = '350px'
}
input.onblur = function () {
	icon.style.display = 'block'
	buttom.style.display = 'block'
	input.style.left = '143px'
	input.style.width = '169px'
}
class item{
	constructor(content){
		this.content = content
		this.isDone = false
	}
}

input.onkeypress = function (e) {
	if(e.key == 'Enter' && input.value != ''){
		list.push(new item(input.value))
		input.value = ''
		refresh()
	}
}

function refresh() {
	todoItem.innerHTML = ""
	doneItem.innerHTML = ""
	list.forEach(function (item,index) {
		if(!item.isDone){
			todoItem.innerHTML +=  `<div class="item" data-index = "${index}">
										<input data-index = "${index}" type="checkbox">
										<span class="content">${item.content}</span>
										<span data-index = "${index}" class="delete"></span>
									</div>`
		}else{
			doneItem.innerHTML +=  `<div class="item" data-index = "${index}">
										<input data-index = "${index}" type="checkbox" checked = "checked">
										<span class="content">${item.content}</span>
										<span data-index = "${index}" class="delete"></span>
									</div>`
		}
		localStorage.list = JSON.stringify(list)
	})
}

todoItem.onchange = function (e) {
	list[e.target.dataset.index].isDone = true
	refresh()
}
doneItem.onchange = function(e) {
	list[e.target.dataset.index].isDone = false
	refresh()
}

//pc
document.body.onclick = function (e) {
	if(navigator.userAgent.indexOf("iPhone")==-1 && navigator.userAgent.indexOf("Android")==-1 && navigator.userAgent.indexOf("iPad")==-1){
		if(e.target.className == 'delete') {
			list.splice(e.target.dataset.index,1)
			refresh()
		}
	}
}

//mobile
document.body.addEventListener("touchstart",function(e){
	if(navigator.userAgent.indexOf("iPhone")!=-1 || navigator.userAgent.indexOf("Android")!=-1 || navigator.userAgent.indexOf("iPad")!=-1){
		if(e.target.className == 'delete') {
			list.splice(e.target.dataset.index,1)
			refresh()
		}
	}
})