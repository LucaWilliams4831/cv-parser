import React , { useState, useEffect, useContext } from 'react';

import { PositionContext } from './position-context';
import { useHttpClient } from './hooks/http-hook';

import PositionList from './PositionList';
import LoadingSpinner from './utils/LoadingSpinner';
import ErrorModal from './utils/ErrorModal';


const AllPositions = () => {
    const positionContext = useContext(PositionContext);
    const [loadedPositions, setLoadedPositions] = useState();
    const [countPositions, setCountPositions] = useState(0);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const responseData = await sendRequest(
                    'http://95.216.88.188:8000/users'
                );
                setLoadedPositions(responseData);
                setCountPositions(responseData.length);
                console.log(responseData);
            } catch (err) {}
        };
        fetchPositions();
    }, [sendRequest]);

    let filteredPositions = [];
    let c = countPositions;
    for (let i=0; i<countPositions; i++) {
        if (loadedPositions[i].designation && loadedPositions[i].designation.toLowerCase().includes(positionContext.position.toLowerCase())) {
            filteredPositions.push(loadedPositions[i]);
        }
        c = filteredPositions.length
    }

    let positionVar;
    if (positionContext.position) {
        positionVar = <h4>Showing {c} results for {positionContext.position}</h4>
    } else {
        positionVar = <h4>Showing all results</h4>
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && (
                <React.Fragment>
                <div>
                    {positionVar}
                </div>
                <hr></hr>
                {loadedPositions && <PositionList items={filteredPositions} />}               
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AllPositions;