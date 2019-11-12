let todoItems = [];

function addTodo(text) {
	try {
		postData('/tasks', {
			title: text
		}).then(data => {
			console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
		});
	} catch (error) {
		console.error(error);
	}

	const todo = {
		text,
		checked: false,
		id: Date.now()
	};

	todoItems.push(todo);

	const list = document.querySelector('.js-todo-list');
	list.insertAdjacentHTML(
		'beforeend',
		`
    <li class="todo-item" data-key="${todo.id}">
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
      </button>
    </li>
  `
	);
}

function toggleDone(key) {
	const index = todoItems.findIndex(item => item.id === Number(key));
	todoItems[index].checked = !todoItems[index].checked;

	const item = document.querySelector(`[data-key='${key}']`);
	if (todoItems[index].checked) {
		item.classList.add('done');
	} else {
		item.classList.remove('done');
	}
}

function deleteTodo(key) {
	todoItems = todoItems.filter(item => item.id !== Number(key));
	const item = document.querySelector(`[data-key='${key}']`);

	try {
		delData('/tasks', {
			title: item.childNodes[5].innerText
		}).then(data => {
			if (data.error) alert(data.error);
			else item.remove();
			console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
		});
	} catch (error) {
		console.error(error);
	}
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
	event.preventDefault();
	const input = document.querySelector('.js-todo-input');

	const text = input.value.trim();
	if (text !== '') {
		addTodo(text);
		input.value = '';
		input.focus();
	}
});

const list = document.querySelector('.js-todo-list');
list.addEventListener('click', event => {
	if (event.target.classList.contains('js-tick')) {
		const itemKey = event.target.parentElement.dataset.key;
		toggleDone(itemKey);
	}

	if (event.target.classList.contains('js-delete-todo')) {
		const itemKey = event.target.parentElement.dataset.key;
		deleteTodo(itemKey);
	}
});

async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}

async function delData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrer: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return await response.json(); // parses JSON response into native JavaScript objects
}
