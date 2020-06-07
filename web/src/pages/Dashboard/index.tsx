import React, { useEffect, useState } from 'react';

import './styles.css';
import Header from '../../components/Header';
import api from '../../services/api';
import PointItem from '../../components/PointItem';
import { trackPromise } from 'react-promise-tracker';

interface Point{
    id: string,
    name: string,
    email: string,
    image: string,
    whatsapp: string,
    city: string,
    uf: string,
    latitude: string,
    longitude: string
}

const Dashboard = () => {
    const [ points, setPoints ] = useState<Point[]>([])

    useEffect(() => {
        trackPromise(
            api.get('points?items=1,2,3,4,5,6').then(response => {
            setPoints(response.data);
        }));
    }, []);

    return(
        <div id="page-dashboard-point">
            <Header/>
            <main>
                <ul className="points-grid">
                    { points.map(point => (
                         <PointItem key={point.id} point={point}/>
                    ))}
                </ul>
            </main>
        </div>
    )
};

export default Dashboard;
