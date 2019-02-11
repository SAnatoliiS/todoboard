export const cutItem = (state, itemId) =>
	state.filter(item => item.id !== itemId);

export const findItem = (state, itemId) =>
	state.find(item => item.id === itemId);

export const changeItemStatus = (state, itemId, newStatus) => {
	const targetItem = findItem(state, itemId);
	const restItems = cutItem(state, itemId);
	const updatedItem = { ...targetItem, status: newStatus };
	return [...restItems, updatedItem];
};
