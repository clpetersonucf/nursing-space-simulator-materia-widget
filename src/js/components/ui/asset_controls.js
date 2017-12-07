import React from "react";
import ReactDOM from "react-dom";
import DeleteSVG from "../assets/icon-svgs/delete";
import DeselectSVG from "../assets/icon-svgs/deselect";
import RotateSVG from "../assets/icon-svgs/rotate";
import ConfirmSVG from "../assets/icon-svgs/confirm";

import {
	selectAssetType,
	deselectAsset,
	rotateAsset,
	removeAsset,
	extendWall
} from "../../actions/grid_actions.js";

export default props => {
	if (props.extendWallMode)
		return (
			<div id="UI-selected-asset-options">
				<span id="selected-asset-label">
					<span className="selected-asset-label-title">
						Currently selected: {props.selectedAsset.title}
					</span>
				</span>
				<div>
					<button id="deselect" onClick={() => props.deselectAsset()}>
						<DeselectSVG />
					</button>
				</div>
			</div>
		);
	else
		return (
			<div id="UI-selected-asset-options">
				<span id="selected-asset-label">
					<span className="selected-asset-label-title">
						Currently selected: {props.selectedAsset.title}
					</span>
				</span>
				{props.manipulationMode ? (
					<div>
						<button id="confirm" onClick={() => props.deselectAsset()}>
							<ConfirmSVG />
						</button>
						<button
							id="rotate"
							onClick={() => props.rotateAsset(props.currentX, props.currentZ)}>
							<RotateSVG />
						</button>
						<button
							id="remove"
							onClick={() => props.removeAsset(props.currentX, props.currentZ)}>
							<DeleteSVG />
						</button>
						{props.selectedAsset.id == "wall-1" ?
							<button
								id="extendWall"
								onClick={() => props.extendWall(props.currentX, props.currentZ)}>
								<RotateSVG />
							</button>
							: null
						}
					</div>
				) : (props.selectedAsset.id == "pov_camera" ? (
					<div>
						<span id="selected-asset-tooltip">Click somewhere to jump into first-person view.</span>
						<button id="deselect" onClick={() => props.deselectAsset()}>
							<DeselectSVG />
						</button>
					</div>
					) : (<button id="deselect" onClick={() => props.deselectAsset()}>
							<DeselectSVG />
						</button>)
				)}
			</div>
		);
};
