import { createSelector } from 'reselect';
import { statuses } from '../config';

/**
 * Возвращает селектор, который возвращает полный список сущностей выбранного типа
 * @param {"boards" | "lists" | "tasks"} type Тип искомых сущностей
 * @return {Function} selector - функция, которая принимает Redux state,
 * возвращает полный список выбранного типа из Redux state
 * @param {Redux.state} state Redux state
 * @return {Array} Массив сущностей выбранного типа
 */
export const getItems = type => state => state[type];

/**
 * Возвращает селектор, который возвращает список сущностей со статусом active выбранного типа
 * @param {"boards" | "lists"} type Тип искомых сущностей
 * @return {Function} selector - функция, которая принимает Redux state,
 * возвращает список сущностей со статусом active выбранного типа из Redux state
 * @param {Redux.state} state Redux state
 * @return {Array} Массив сущностей со статусом active выбранного типа
 */
export const getActiveItems = type =>
	createSelector(
		getItems(type),
		items => items.filter(item => item.status === statuses[type].active)
	);

/**
 * Возвращает селектор, который возвращает список сущностей со статусом recycle выбранного типа
 * @param {"boards" | "lists"} type Тип искомых сущностей
 * @return {Function} selector - функция, которая принимает Redux state,
 * возвращает список сущностей со статусом recycle выбранного типа из Redux state
 * @param {Redux.state} state Redux state
 * @return {Array} Массив сущностей со статусом recycle выбранного типа
 */
export const getRecycleItems = type =>
	createSelector(
		getItems(type),
		items => items.filter(item => item.status === statuses[type].recycle)
	);

/**
 * Возвращает селектор, который возвращает сущность выбранного типа и с выбранным id
 * @param {"boards" | "lists" | "tasks"} type Тип искомой сущности
 * @param {string} itemId  id искомой сущности
 * @return {Function} selector - функция, которая принимает Redux state,
 * возвращает сущность с выбранными ранее типом и id из Redux state
 * @param {Redux.state} state Redux state
 * @return {Object}  Сущность выбранного типа с выбранным id
 */
export const findItem = (type, itemId) =>
	createSelector(
		getItems(type),
		items => items.find(item => item.id === itemId)
	);

/**
 * Возвращает название поля, в котором находится список id-в дочерних сущностей
 * в зависимости от переданного типа родительской сущности "type"
 * @param {"boards" | "lists"} type Тип родительской сущности
 * @return {string} имя поля, в котором находится список id-в дочерних сущностей выбранного элемента
 */
const getChildrenFieldName = type => {
	switch (type) {
		case 'boards':
			return 'listsInBoard';
		case 'lists':
			return 'tasksInList';
		default:
			throw new Error('No such type. Type must be "boards" or "lists"');
	}
};

/**
 * Возвращает селектор, который возвращает массив id-в дочерних сущностей
 * @param {"boards" | "lists"} type Тип родительской сущности
 * @param {string} parentId  id родительской сущности
 * @return {Function} selector - функция, которая принимает Redux state,
 * возвращает массив id-в дочерних сущностей из Redux state
 * @param {Redux.state} state Redux state
 * @return {Object} массив id-в дочерних сущностей
 */
export const getListOfChildrenId = (type, parentId) =>
	createSelector(
		findItem(type, parentId),
		parent => {
			const res = parent[getChildrenFieldName(type)];
			return res;
		}
	);

/**
 * Возвращает селектор, который возвращает массив дочерних сущностей
 * @param {"boards" | "lists"} type Тип родительской сущности
 * @param {string} parentId  id родительской сущности
 * @param {Array} childrenFullList массив, содержащий весь список сущностей,
 * среди которых производится поиск дочерних
 * @return {Function} selector - функция, которая принимает Redux state,
 * возвращает массив дочерних сущностей из Redux state
 * @param {Redux.state} state Redux state
 * @return {Object} массив дочерних сущностей
 */
export const getChildren = (type, parentId, childrenFullList) =>
	createSelector(
		getListOfChildrenId(type, parentId),
		childrenIdList => {
			const res = childrenIdList.map(id =>
				childrenFullList.find(child => child.id === id)
			);
			return res;
		}
	);

/**
 * Возвращает селектор, который возвращает массив дочерних сущностей со статусом active
 * @param {"boards" | "lists"} type Тип родительской сущности
 * @param {string} parentId  id родительской сущности
 * @param {Array} childrenFullList массив, содержащий весь список сущностей,
 * среди которых производится поиск дочерних
 * @return {Function} selector - функция, которая принимает Redux state,
 * возвращает массив дочерних сущностей со статусом active из Redux state
 * @param {Redux.state} state Redux state
 * @return {Object} массив дочерних сущностей со статусом active
 */
export const getActiveChildren = (type, parentId, childrenFullList) =>
	createSelector(
		getChildren(type, parentId, childrenFullList),
		children => children.filter(child => child.status === statuses[type].active)
	);
