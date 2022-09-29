import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ROUTES from './paths'
import Company from "../containers/Company";
import CompanyCreate from "../containers/Company/Create";


export default function AppRoutes() {

    return (
        <Routes>
            <Route
                path={ROUTES.CREATE}
                exact
                element={
                    <CompanyCreate/>
                }
            />
            <Route
                path={ROUTES.DEFAULT}
                exact
                element={
                    <Company/>
                }
            />

        </Routes>
    )
}
