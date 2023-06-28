// FilterComponent
import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const FilterComponent = ({ onChange }: any) => {
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
        setFilter(newFilter);
        onChange(newFilter); // Invocar la función onChange para propagar el cambio al componente padre
    };

    return (
        <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'white' }}>
            <ToggleButtonGroup value={filter} exclusive onChange={handleFilterChange}>
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="shop">Shops</ToggleButton>
                <ToggleButton value="worm">Worms</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
};

export default FilterComponent;
