import React, { memo } from 'react';
import { FiPhoneCall } from 'react-icons/fi';

// import { Container } from './styles';

interface Point{
    id: string,
    name: string,
    email: string,
    image: string,
    image_url: string,
    whatsapp: string,
    city: string,
    uf: string,
    latitude: string,
    longitude: string
}

interface PointProps{
    point: Point
}

const PointItem: React.FC<PointProps> = ({point}) => {
    return(
    <li key={point.id}>
        <img src={point.image_url} alt={point.name} />
        <footer>
            <strong>{point.name}</strong>
            <p>{point.email}</p>
            <div className="whatsapp-info">
                <FiPhoneCall id="whatsapp-icon" />
                <a href={`tel:${point.whatsapp}`}>{point.whatsapp}</a>
            </div>
            <div className="address-info">
                <strong>{point.uf}</strong>
                <strong>{point.city}</strong>
            </div>
        </footer>
    </li>
    )
};

export default memo(PointItem);
