import React from 'react';
import AuthenticationForm from '../authentication-form';
import { useUserInfo } from '../user-info-provider';
import Header from '../app-header';
import { Routes, Route } from 'react-router';
import GeneralInfo from '../general-information';
import Timesheets from '../timesheets';
import Subordinates from '../subordinates';
import Approval from '../approval';
import SalaryCalculation from '../salary-calculation';
import SalaryRules from '../salary-rules';
import Employees from '../employees';
import Projects from '../projects';
import PageContent from '../page-content';

function App() {
    const { userId } = useUserInfo();

    if (!userId) {
        return <AuthenticationForm />;
    }

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<PageContent />}>
                    <Route path="/generalInfo" element={<GeneralInfo />} />
                    <Route path="/timesheets" element={<Timesheets />} />
                    <Route path="/subordinates" element={<Subordinates />} />
                    <Route path="/approving" element={<Approval />} />
                    <Route path="/salaryCalculation" element={<SalaryCalculation />} />
                    <Route path="/salaryRules" element={<SalaryRules />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/projects" element={<Projects />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
