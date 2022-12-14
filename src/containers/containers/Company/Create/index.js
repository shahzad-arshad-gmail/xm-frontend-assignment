import React, {useEffect, useState} from 'react'
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Pie, PieChart, Tooltip} from "recharts";
import ROUTES from "../../../routes/paths";
import {useNavigate} from "react-router-dom";
import {getAllHistoricalQuotes, getAllSybols} from "../../../utils/apiCall";
import DatePicker from "../../../components/DatePicker";

function CompanyCreate() {
    const [loading, setLoading] = useState()
    const [symbols, setSymbols] = useState([])
    const navigate = useNavigate();
    const initState = {
        id: null,
        companySymbol: "",
        companyEmail: "",
        companyStartDate: new Date(),
        companyEndDate: new Date(),
        errors: {}
    };
    const [company, setCompany] = useState(initState)

    useEffect(() => {
        (async () => {
            const result = await getAllSybols();
            console.log(result)
            setSymbols(result)

        })();
    }, []);

    const handleClick = () => {
        navigate(ROUTES.DEFAULT)
    }

    /**
     * handle Start date change
     * @param date Date type
     */
    const handleStartDateChange = (date) => {
        setCompany({...company, companyStartDate: date, companyEndDate: date})
    }

    /**
     * handle End date change
     * @param date Date type
     */
    const handleEndDateChange = (date) => {
        setCompany({...company, companyEndDate: date})
    }

    /**
     * email change
     */
    const handleEmailChange = (e) => {
        setCompany({...company, companyEmail: e.target.value})
    }

    /**
     * email change
     */
    const handleSymbolChange = (e) => {
        setCompany({...company, companySymbol: e.target.value})
    }


    return (
        <>
            <div className="App">
                <div className={'float-right'}>
                    <Button className={"w-52 float-right"} onClick={handleClick} variant="outlined">Back </Button>
                </div>
            </div>

            <div className="App">
                <h1>Create Company Symbol</h1>
            </div>

            <div className={'ml-20 content-center'} style={{border: '1px solid', padding: '92px'}}>
                <div className={"w-60"}>
                    <FormControl fullWidth>
                        <label className="label-class">Company Symbol</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={company.companySymbol}
                            label="Symbol"
                            onChange={handleSymbolChange}
                            error={company.errors.companySymbol}
                        >
                            {symbols.map((item) => (
                                <MenuItem value={item.id} key={item.id}>{item.value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={"w-64 ml-90 mt-8"}>
                    <label className="label-class">Email</label>
                    <TextField value={company.companyEmail}
                               onChange={handleEmailChange}
                               id="outlined-basic"
                               label="Email"
                               variant="outlined"
                               error={company.errors.companyEmail}
                    />

                </div>

                <div className={"w-64 ml-90 mt-8"}>
                    <label className="label-class">Start Date</label>
                    <DatePicker
                        dateVal={company.companyStartDate}
                        minDate={new Date()}
                        handleChange={handleStartDateChange}
                        error={company.errors.companyStartDate}
                    />
                </div>

                <div className={"w-64 ml-90 mt-8"}>
                    <label className="label-class">End Date</label>
                    <DatePicker
                        dateVal={company.companyEndDate}
                        minDate={company.companyStartDate}
                        handleChange={handleEndDateChange}
                        error={company.errors.companyEndDate}
                    />
                </div>
            </div>


        </>

    )
}

export default CompanyCreate
