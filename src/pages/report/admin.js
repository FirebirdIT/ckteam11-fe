import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import axios from "axios";

import { DataGrid } from "@material-ui/data-grid";
import moment from "moment";

export const ReportAdmin = () => {

    const [before, setBefore] = useState("")
    const [after, setAfter] = useState("")
    const [selectedValie, setSelectedValue] = useState("")
    const [dataToShow, setDataToShow] = useState([])
    const [teamList, setTeamList] = useState([])

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
        getTeamReport(event.target.value)
    }

    useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var today = yyyy + '-' + mm + '-' + dd;
        var time = "00:00:00";
        var after_date = moment().format(`${today} ${time}`)
        var before_date = moment(after_date).add(25, 'hours').format("YYYY-MM-DD 03:00:00");
        setBefore(before_date)
        setAfter(after_date)

        axios
            .get(`${process.env.REACT_APP_API_KEY}/team/list`)
            .then((res) => {
                setTeamList(res.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const getTeamReport = (name) => {
        axios.post(`${process.env.REACT_APP_API_KEY}/report/volunteer`, {
            username: name,
            before_date: before,
            after_date: after
        })
            .then((res) => {
                setDataToShow([res.data.data])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const columns = [
        {
            field: 'username',
            headerName: 'Volunteer Username',
            width: 300,
            editable: false,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 200,
            editable: false,
        },
        {
            field: 'start',
            headerName: 'Start Date',
            width: 200,
            editable: false,
        },
        {
            field: 'end',
            headerName: 'End Date',
            width: 200,
            editable: false,
        },
    ];

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Username</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Username"
                    value={selectedValie}
                    onChange={handleChange}
                >
                    {
                        teamList.map((details) => (
                            <MenuItem value={details.username}>{details.username}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
            <br />
            <br />
            {
                dataToShow.length != 0 && (
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={dataToShow}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[50]}
                            disableSelectionOnClick
                        />
                    </div>
                )
            }
        </>
    )
}