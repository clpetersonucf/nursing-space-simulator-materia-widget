import React, { Component } from "react";
import Joyride from "react-joyride";
import { connect } from "react-redux";

// Custom React Components
import HUD from "./hud";
import VRScene from "./vr_scene";

// Redux Actions and Custom Libraries
import { initData } from "../actions";
import { startTourSection, endTour } from "../actions/tour_actions";

export class App extends Component {
	componentDidMount() {
		this.props.initData(this.props.qset);
	}

	componentWillUpdate(nextProps) {
		if (nextProps.runNextSet === true && this.props.tourRunning) {
			this.joyride.setState({ index: 0 }, () => this.joyride.start(true));
			this.props.startTourSection();
		}
	}

	joyrideCallback(data) {
		if (data.isTourSkipped === true) this.props.endTour();
	}

	render() {
		return (
			<div
				id="app"
				// When in first person, app container style must be modified to absolute position to support built in aframe UI
				style={this.props.thirdPerson ? {} : { position: "absolute" }}>
				<Joyride
					callback={this.joyrideCallback.bind(this)}
					debug={false}
					disableOverlay={false}
					locale={{
						back: <span>Back</span>,
						close: <span>Close</span>,
						last: <span>Ok</span>,
						next: <span>Next</span>,
						skip: <span>Skip Tour</span>
					}}
					ref={c => (this.joyride = c)}
					run={false}
					showSkipButton={true}
					showStepsProgress={false}
					stepIndex={0}
					steps={this.props.currentSteps}
					type={"continuous"}
				/>
				<VRScene />
				<HUD />
			</div>
		);
	}
}

function mapStateToProps({ tour, position }) {
	return {
		currentSteps: tour.currentSteps,
		runNextSet: tour.runNextSet,
		thirdPerson: position.thirdPerson,
		tourRunning: tour.tourRunning
	};
}

export default connect(mapStateToProps, {
	endTour,
	initData,
	startTourSection
})(App);
