import React from "react";
import Loader from "react-loader-spinner";
import { usePromiseTracker } from "react-promise-tracker";
import './styles.css';

const LoadingIndicator: React.FunctionComponent = () => {
    const { promiseInProgress } = usePromiseTracker({delay: 500});

    return (
        promiseInProgress ? (
            <div className='loading-spinner'>
                <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
            </div>
        ) :
        <></>
    );
};


export default LoadingIndicator;
