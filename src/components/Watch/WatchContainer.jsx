import React from "react";
import Watch from "./Watch";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    addWatchActionCreator,
    changeTimezoneActionCreator,
    deleteWatchActionCreator, getTimezonesThunkCreator,
    setTimezonesActionCreator,
    updateCurrentTimeActionCreator
} from "../../redux/watch-reducer";

class WatchContainer extends React.Component {
    componentDidMount() {
        this.props.getTimezones()//call thunk

        let getCurrentTime = () => {
            let day = new Date();
            let hours = day.getUTCHours()
            let minutes = day.getMinutes()
            let seconds = day.getSeconds()
            this.props.updateCurrentTimeActionCreator({hours, minutes, seconds})
        }

        setInterval(getCurrentTime, 1000)
    }

    render() {
        return (
            <Watch watchesData = {this.props.watchesData}
                   maxWatchesAmount = {this.props.maxWatchesAmount}
                   timezonesData = {this.props.timezonesData}
                   currentHours = {this.props.currentHours}
                   currentMinutes = {this.props.currentMinutes}
                   currentSeconds = {this.props.currentSeconds}
                   currentTimezone = {this.props.currentTimezone}
                   isFetching={this.props.isFetching}
                   addWatch = {this.props.addWatchActionCreator}
                   deleteWatch = {this.props.deleteWatchActionCreator}
                   changeTimezone = {this.props.changeTimezoneActionCreator}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        watchesData: state.watchPage.watchesData,
        maxWatchesAmount: state.watchPage.maxWatchesAmount,
        timezonesData: state.watchPage.timezonesData,
        currentTimezone: state.watchPage.currentTimezone,
        currentHours: state.watchPage.currentTime.hours,
        currentMinutes: state.watchPage.currentTime.minutes,
        currentSeconds: state.watchPage.currentTime.seconds,
        isFetching: state.watchPage.isFetching
    }
}

export default compose(connect(mapStateToProps, {setTimezonesActionCreator, addWatchActionCreator,
    deleteWatchActionCreator, updateCurrentTimeActionCreator, changeTimezoneActionCreator,
    getTimezones: getTimezonesThunkCreator}))(WatchContainer);