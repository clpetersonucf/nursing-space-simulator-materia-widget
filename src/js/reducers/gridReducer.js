import { rotateCell, deleteItem, insertItem, isCellAvailable } from "../grid";

import {
	SELECT_ASSET_TYPE,
	SELECT_ASSET,
	DESELECT_ASSET,
	ROTATE_ASSET,
	REMOVE_ASSET,
	INSERT_ASSET,
	UPDATE_ASSET_POSITION
} from "../actions/grid_actions";

import { INIT_DATA } from "../actions";

export default function(
	state = { manipulationMode: false, selectedAsset: null },
	action
) {
	switch (action.type) {
		case INIT_DATA: {
			return {
				...state,
				grid: action.payload.grid
			};
		}

		case SELECT_ASSET_TYPE: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: gridCopy,
				selectedAsset: action.payload,
				manipulationMode: false,
				currentX: null,
				currentY: null
			};
		}

		case SELECT_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));

			let oldSelectedAsset;
			oldSelectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;

			if (
				oldSelectedAsset &&
				oldSelectedAsset.id !== action.payload.asset.id &&
				oldSelectedAsset.canReplace.includes(action.payload.asset.category)
			) {
				return {
					...state,
					manipulationMode: true,
					selectedAsset: oldSelectedAsset,
					currentX: action.payload.x,
					currentY: action.payload.y,
					grid: insertItem(
						gridCopy,
						oldSelectedAsset.id,
						action.payload.x,
						action.payload.y
					)
				};
			} else {
				return {
					...state,
					grid: gridCopy,
					manipulationMode: true,
					selectedAsset: action.payload.asset,
					currentX: action.payload.x,
					currentY: action.payload.y
				};
			}
		}

		case DESELECT_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: gridCopy,
				manipulationMode: false,
				selectedAsset: null,
				currentX: null,
				currentY: null
			};
		}

		case ROTATE_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: rotateCell(gridCopy, action.payload.x, action.payload.y)
			};
		}

		case REMOVE_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: deleteItem(gridCopy, action.payload.x, action.payload.y),
				manipulationMode: false,
				selectedAsset: null,
				currentX: null,
				currentY: null
			};
		}

		case INSERT_ASSET: {
			const selectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			if (
				!selectedAsset ||
				!isCellAvailable(gridCopy, action.payload.x, action.payload.y)
			) {
				return {
					...state,
					grid: gridCopy
				};
			} else {
				return {
					...state,
					grid: insertItem(
						gridCopy,
						selectedAsset.id,
						action.payload.x,
						action.payload.y
					),
					manipulationMode: true,
					currentX: action.payload.x,
					currentY: action.payload.y
				};
			}
		}

		case UPDATE_ASSET_POSITION: {
			const selectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			let newGrid;
			switch (action.payload) {
				case "xUp":
					if (isCellAvailable(gridCopy, state.currentX + 1, state.currentY)) {
						newGrid = deleteItem(gridCopy, state.currentX, state.currentY);
						return {
							...state,
							currentX: state.currentX + 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								state.currentX + 1,
								state.currentY
							)
						};
					}
				case "xDown":
					if (isCellAvailable(gridCopy, state.currentX - 1, state.currentY)) {
						newGrid = deleteItem(gridCopy, state.currentX, state.currentY);
						return {
							...state,
							currentX: state.currentX - 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								state.currentX - 1,
								state.currentY
							)
						};
					}
				case "zUp":
					if (isCellAvailable(gridCopy, state.currentX, state.currentY - 1)) {
						newGrid = deleteItem(gridCopy, state.currentX, state.currentY);
						return {
							...state,
							currentY: state.currentY - 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								state.currentX,
								state.currentY - 1
							)
						};
					}
				case "zDown":
					if (isCellAvailable(gridCopy, state.currentX, state.currentY + 1)) {
						newGrid = deleteItem(gridCopy, state.currentX, state.currentY);
						return {
							...state,
							currentY: state.currentY + 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								state.currentX,
								state.currentY + 1
							)
						};
					}
			}
			return { ...state, grid: gridCopy };
		}
		default: {
			return state;
		}
	}
}
