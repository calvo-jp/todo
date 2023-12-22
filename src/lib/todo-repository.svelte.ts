export interface ITodo {
	id: string;
	title: string;
	complete?: boolean;
}

export class TodoRepository {
	todos = $state<ITodo[]>([]);

	constructor(initialValue?: ITodo[]) {
		if (initialValue) {
			this.todos = initialValue;
		} else {
			this.todos = [
				{
					id: crypto.randomUUID(),
					title: 'Todo 1',
					complete: true,
				},
				{
					id: crypto.randomUUID(),
					title: 'Todo 2',
				},
			];
		}
	}

	add(data: Omit<ITodo, 'id'>) {
		const id = crypto.randomUUID();

		this.todos.unshift({id, ...data});
	}

	update(id: string, data: Partial<Omit<ITodo, 'id'>>) {
		this.todos = this.todos.map((todo) =>
			todo.id === id ? {...todo, ...data} : todo,
		);
	}

	remove(id: string) {
		this.todos = this.todos.filter((todo) => todo.id !== id);
	}

	count() {
		return this.todos.length;
	}
}
