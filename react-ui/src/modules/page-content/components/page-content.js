import React from 'react';
import { Outlet } from 'react-router';

export default function PageContent() {
    return (
        <main>
            <Outlet/>
        </main>
    );
}