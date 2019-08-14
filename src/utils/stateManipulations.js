export const cutItem = (state, itemId) =>
	state.filter(item => item.id !== itemId);

export const findItem = (state, itemId) =>
	state.find(item => item.id === itemId);

export const findItemIndex = (state, targetItem) =>
	state.findIndex(item => item.id === targetItem.id);

export const replaceItem = (state, newItem) => {
	const itemIndex = findItemIndex(state, newItem);
	const itemsBefore = state.slice(0, itemIndex);
	const itemsAfter = state.slice(itemIndex + 1, state.length);
	return [...itemsBefore, newItem, ...itemsAfter];
};

export const changeItemStatus = (state, itemId, newStatus) => {
	const targetItem = findItem(state, itemId);
	const updatedItem = { ...targetItem, status: newStatus };
	return replaceItem(state, updatedItem);
};

export const getNameField = type => {
	switch (type) {
		case 'list':
			return 'listsInBoard';
		case 'task':
			return 'tasksInList';
		default:
			throw new Error(
				`Type ${type} is not exist. Type must be "list" or "task"`
			);
	}
};

const getNewField = (childIdList, targetId, targetIndex) => {
	if (targetIndex === null) {
		return [...childIdList, targetId];
	}
	return [
		...childIdList.slice(0, targetIndex),
		targetId,
		...childIdList.slice(targetIndex, childIdList.length)
	];
};

export const addItemToParentList = (
	state,
	type,
	parentItemId,
	targetId,
	targetIndex
) => {
	const parentItem = findItem(state, parentItemId);
	const nameField = getNameField(type);
	const newField = getNewField(parentItem[nameField], targetId, targetIndex);
	const updatedParentItem = { ...parentItem, [nameField]: newField };
	return replaceItem(state, updatedParentItem);
};

const getNextProgressState = oldState => {
	switch (oldState) {
		case 'IN_PROGRESS':
			return 'DONE';
		case 'DONE':
			return 'IN_PROGRESS';
		default:
			throw new Error(
				`Progress state ${oldState} is not exist. It might be "IN_PROGRESS" or "DONE"`
			);
	}
};

export const changeItemProgressStatus = (state, taskId) => {
	const item = findItem(state, taskId);
	const newItem = { ...item, progress: getNextProgressState(item.progress) };
	return replaceItem(state, newItem);
};

const findParent = (state, childType, childId) => {
	const nameChildrenField = getNameField(childType);
	return state.find(item => item[nameChildrenField].includes(childId));
};

export const cutChild = (state, childType, childId) => {
	const parent = findParent(state, childType, childId);
	const nameChildrenField = getNameField(childType);
	const updatedChildren = parent[nameChildrenField].filter(
		id => id !== childId
	);
	const updatedParent = { ...parent, [nameChildrenField]: updatedChildren };
	return replaceItem(state, updatedParent);
};

export const replaceChild = (
	state,
	childType,
	childId,
	newParentId,
	newIndexOfChild
) => {
	const parentId = newParentId
		? newParentId
		: findParent(state, childType, childId).id;
	const stateWithoutOldChild = cutChild(state, childType, childId);
	return addItemToParentList(
		stateWithoutOldChild,
		childType,
		parentId,
		childId,
		newIndexOfChild
	);
};
