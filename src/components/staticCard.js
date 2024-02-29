

import React from 'react'

export const StaticCard = () => {
    return (
        <>
            <div className="card text-center" style={{ height: '168px', width: '100%' }} >
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '12px 24px 6px 23px' }}>
                    <img src='/favicon.ico' alt='logo' style={{ width: '50px', height: '50px' }} />
                    <span style={{ color: 'dark', fontSize: '2rem' }}>$1000</span>
                    <h5 className="card-title" style={{ color: '#3f51b5', fontSize: '1rem' }}>Revenue</h5>
                </div>
            </div>

        </>
    )
}
