import React, {useEffect, useState} from 'react'
import {Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Pie, PieChart, Tooltip} from "recharts";
import ROUTES from "../../../routes/paths";
import {useNavigate} from "react-router-dom";
import {getAllHistoricalQuotes, getAllSymbols, saveCompanyObj} from "../../../utils/apiCall";
import DatePicker from "../../../components/DatePicker";
import moment from 'moment'

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
            const result = await getAllSymbols();
            console.log(result)
            setSymbols(result)

        })();
    }, []);

    const handleClick = () => {
        navigate(ROUTES.DEFAULT)
    }

    /**
     * handle form validation
     * @param value Exception status
     */
    const saveCompany = async () => {
        const saveObject = {
            email: company.companyEmail,
            symbol_id: company.companySymbol,
            start_date: moment(company.companyStartDate).format(
                'YYYY-MM-DD',
            ),
            end_date: moment(company.companyEndDate).format(
                'YYYY-MM-DD',
            )


        }

        const response = await saveCompanyObj(saveObject)

console.log(response,"response")
        if (response.errors) {
            const errors = {}
            errors.companySymbol = ''
            // errors.companyEmail = ''
            errors.companyStartDate = ''
            errors.companyEndDate = ''
            errors.companyEmail = response.errors.email[0]
            if (response.errors.email) {
               alert(response.errors.email[0])
            }
        }
    }

    /**
     * handle form validation
     * @param value Exception status
     */
    const isFormValid = async () => {


        const errors = {}
        errors.companySymbol = ''
        errors.companyEmail = ''
        errors.companyStartDate = ''
        errors.companyEndDate = ''


        let formIsValid = true

        if (!company.companySymbol || company.companySymbol === '') {
            formIsValid = false
            errors.companySymbol = 'Company Symbol is required field'
        }

        if (!company.companyStartDate || company.companyStartDate === '') {
            formIsValid = false
            errors.companyStartDate = 'Company Start Date is required field'
        }

        if (!company.companyEmail || company.companyEmail === '') {
            formIsValid = false
            errors.companyEmail = 'Company Email is required field'
        }

        if (company.companyEmail) {

            if (!validateEmail(company.companyEmail)) {
                formIsValid = false
                errors.companyEmail = 'You have entered an invalid email address!'
            }
        }


        if (!company.companyEndDate || company.companyEndDate === '') {
            formIsValid = false
            errors.companyEndDate = 'Company End Date is required field'
        }

        if (formIsValid) {
            await saveCompany()

        }

        setCompany({...company, errors})

        return Promise.resolve(formIsValid)
    }

    /**
     * handle Start date change
     * @param date Date type
     */
    const handleStartDateChange = (date) => {
        setCompany({...company, companyStartDate: date, companyEndDate: date})
    }

    const validateEmail = (email) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
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
                            label="Age"
                            onChange={handleSymbolChange}
                            error={company.errors.companySymbol}
                        >
                            {symbols.map((item) => (
                                <MenuItem value={item.id} key={item.id}>{item.value}</MenuItem>
                            ))}
                        </Select>
                        {company.errors.companySymbol && (<FormHelperText
                            className={'!text-red-700'}>{company.errors.companySymbol}</FormHelperText>)}
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
                    {company.errors.companyEmail && (
                        <FormHelperText className={'!text-red-700'}>{company.errors.companyEmail}</FormHelperText>)}

                </div>

                <div className={"w-64 ml-90 mt-8"}>
                    <label className="label-class">Start Date</label>
                    <DatePicker
                        dateVal={company.companyStartDate}
                        handleChange={handleStartDateChange}
                        error={company.errors.companyStartDate}
                    />
                    {company.errors.companyStartDate && (
                        <FormHelperText
                            className={'!text-red-700'}>{company.errors.companyStartDate}</FormHelperText>)}

                </div>

                <div className={"w-64 ml-90 mt-8"}>
                    <label className="label-class">End Date</label>
                    <DatePicker
                        dateVal={company.companyEndDate}
                        handleChange={handleEndDateChange}
                        error={company.errors.companyEndDate}
                    />
                    {company.errors.companyEndDate && (
                        <FormHelperText
                            className={'!text-red-700'}>{company.errors.companyEndDate}</FormHelperText>)}

                </div>
                <Button className={"w-52 float-right"} onClick={isFormValid} variant="outlined">Save </Button>

            </div>


        </>

    )
}

export default CompanyCreate
