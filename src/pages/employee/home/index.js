import React from "react";
import Layoutemployee from "../../../components/layout/employee";
import ScheduleBoard from "./ScheduleBoard";
import FillterDateHome from "./FillterDate";

const Homeemployee = () => {
    return(
        <Layoutemployee>
            <FillterDateHome/>
            <ScheduleBoard/>
        </Layoutemployee>
    )
}

export default Homeemployee;