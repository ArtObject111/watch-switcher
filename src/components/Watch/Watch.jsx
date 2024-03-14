import React from "react";
import s from "./Watch.module.css"
import Preloader from "../common/Preloader/Preloader";

const Watch = (props) => {
    //Get current time
    let hh = props.currentHours
    let mm = props.currentMinutes
    let ss = props.currentSeconds

    //formatting "00:" of electronicClockValues
    let setFormat = (digit) => {
        return digit < 10 ? `0` + digit : digit
    }
    //formatting hours, if value > 24 of electronicClockValues
    let setFormatHours = (curHours) => {
        return (curHours >= 24) ? Math.abs(24 - curHours) : curHours
    }
    //Clock hand positions changes
    const deg = 6;
    let hrStyle = (n) => {
        return {
            transform: `rotateZ(${(hh + n) * 30 + mm * deg / 12}deg)`
        }
    }
    /*let hrStyle = {transform: `rotateZ(${hh * 30 + mm * deg / 12}deg)`}*/
    let mnStyle = {transform: `rotateZ(${mm * deg}deg)`}
    let scStyle = {transform: `rotateZ(${ss * deg}deg)`}

    //changing timezone callback, transferring event for getting UTC from select-list
    // and id of define watch
    let changeTimezone = (event, id) => {
        props.changeTimezone(Number(event.target.value), id)
    }
    //options elements for selector
    let selectorElement = props.timezonesData.map(t => {
        return <option value={Number(t.timezone)} key={t.id}>{t.name}</option>
    })

    //Settings watches amount limit
    let setDisplayLimit = () => {
        if (props.watchesData.length >= props.maxWatchesAmount) {
            return true
        }
    }

    // if (props.isFetching) {
    //     return <Preloader/>
    // }

    return <>
        <div className={s.watchBlockWrapper}>
            {/*Banner notifying about watches absence*/}
            {/* {props.isFetching ? <Preloader/> : null} */}
            <div className={s.absenceBannerBlock}>
                <div className={s.absenceBanner} hidden={props.watchesData.length !== 0}>Страница часов пуста :( <br/>
                    Чтобы добавить часы, нажмите "+"
                </div>
            </div>
            {props.isFetching ? <Preloader/> :
                props.watchesData.map(w =>
                    <div key={w.id} className={s.watchBlock}>
                        <div className={s.deleteWatchBlock} onClick={() => props.deleteWatch(w.id)}
                             title={"Удалить часы"}>

                        </div>
                        {/*Displaying analog watch*/}
                        <div className={s.clock}>
                            <div className={s.hour}> {/*wrapper for hour string*/}
                                <div className={s.hr} style={hrStyle(w.curTimezone)}></div>
                            </div>
                            <div className={s.min} style={mnStyle}> {/*wrapper for min string*/}
                                <div className={s.mn}></div>
                            </div>
                            <div className={s.sec} style={scStyle}> {/*wrapper for sec string*/}
                                <div className={s.sc}></div>
                            </div>
                        </div>
                        {/*Displaying electronic watch in format hh.mm.ss*/}
                        <div className={s.e_clock}>
                            {setFormat(setFormatHours(hh + w.curTimezone))}
                            :{setFormat(mm)}:{setFormat(ss)}
                        </div>
                        {/*Displaying a cities selector*/}
                        <div className={s.timezoneSwitcher}>
                            <select value={w.curTimezone} onChange={(event) => changeTimezone(event, w.id)}>
                                {selectorElement}
                            </select>

                        </div>
                    </div>)
            }
            {/*Display plus symbol*/}
            <div className={s.addWatchBlock}>

                {/*Banner notifying about watches limit*/}
                <div className={s.limitBanner} hidden={!setDisplayLimit()}>Добавлено максимальное количество часов</div>
                <div className={s.addWatch} onClick={props.addWatch} title={"Добавить часы"}
                     hidden={setDisplayLimit()}></div>
            </div>
        </div>
    </>
}

export default Watch;