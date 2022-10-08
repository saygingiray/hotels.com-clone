import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};




function MenuSelectionMultiple(props) {
    const theme = useTheme();
    //   const [personName, setPersonName] = React.useState([]);

    //   const handleChange = (event) => {
    //     const {
    //       target: { value },
    //     } = event;
    //     setPersonName(
    //       // On autofill we get a stringified value.
    //       typeof value === 'string' ? value.split(',') : value,
    //     );
    //   };
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                props.person.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    return (
        <div>
            <FormControl sx={{ mt: 1.5, width: 250 }}>
                <InputLabel id="demo-multiple-chip-label">Type of Property</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={props.person}
                    onChange={props.handle}
                    input={<OutlinedInput id="select-multiple-chip" label="Type of Property" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, props.person, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default function PropertyType(props) {



    return (
        <>
            <div className="textMediumBold">Property Type</div>
            <div className="d-flex flex-row align-items-center mt-2">
                <MenuSelectionMultiple names={props.list} person={props.filter} handle={props.handle}
                />
            </div>


        </>)
}