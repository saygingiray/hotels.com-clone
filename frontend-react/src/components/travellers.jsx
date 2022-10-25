import React from "react";
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function TravellersComponent(props){


    const ChildrenAges = (props) => {

        return (
            
                <FormControl sx={{ minWidth: 165 }} >
                    <InputLabel id="Children Age">Age of Children {Number(props.number)}</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.valueLOOP}
                        label="Age of Children 1"

//burada props içinde props var buraya dikkat.

                        onChange={props.childrenAgeSetX(props.number)}
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={13}>13</MenuItem>
                        <MenuItem value={14}>14</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                        <MenuItem value={16}>16</MenuItem>
                        <MenuItem value={17}>17</MenuItem>
                        <MenuItem value={18}>18</MenuItem>
                    </Select>
                </FormControl>
          
        )
    }

    const ChildrenLoopForAges = (props) => {
        let tempChildren = [];
        for (let i = 1; i <= props.childNumber; i++) {
            tempChildren.push(<ChildrenAges
             number={i} 
             key={i} 
             valueLOOP={props.childOBJX[i]} 
             childrenAgeSetX= {props.childrenAgeSet}
            />);
        }
        return tempChildren;
    };



return (<>

<div  >
                    <TextField
                        label="Travellers" variant="filled"
                        sx={{ input: { background: "white", width: (props.pageWidth > 650) ? "230px" : "176px" } }}
                        onClickCapture={props.onclickcaptureX}
                        value={props.valuefortextfield}

                    />
                    <Modal
                        open={props.modalopen}
                        onClose={props.modalonclose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"

                    >
                        <div className="d-flex p-4 flex-column" style={{
                            "position": 'absolute',
                            "top": (props.pageWidth > 650) ? "10%" : "5%",
                            "left": (props.pageWidth > 650) ? "35%" : "10%",
                            "right": (props.pageWidth < 650) ? "10%" : null,
                            "minWidth": "400px",
                            "maxWidth": "400px",
                            "minHeight": "600px",
                            "backgroundColor": "white"

                        }}>
                            <div><a href="#"><i className="bi bi-x-lg" onClick={props.modalonclose} style={{ "color": "red" }}></i></a> <span className="mx-3 textMediumBold" >Travellers</span></div>
                            <hr></hr>

                            <span className="textMediumBold">Room-1</span>

                            <div className="d-flex flex-row justify-content-between align-items-center my-2 textSmall" >                                
                                <div >Adults</div>
                                <div className="d-flex flex-row">
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        disabled={props.adultminusbuttondisabled}
                                        onClick={props.adultminusbuttonclicked}
                                    >-</button>
                                    <div className="d-flex mx-3 justify-content-center align-items-center" style={{ "width": "20px" }}>{props.adultnumber}</div>
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        onClick={props.adultplusbuttonclicked}
                                        disabled={props.adultplusbuttondisabled}
                                    >+</button>
                                </div>
                            </div>


                            <div className="d-flex flex-row justify-content-between align-items-center my-2 textSmall" >
                                <div className="align-items-center">Children <br></br> (Age 0-17) </div>
                                <div className="d-flex flex-row">
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        disabled={props.childrenminusbuttondisabled}
                                        onClick={props.childrenminusbuttonclicked}
                                    >-</button>
                                    <div className="d-flex mx-3 justify-content-center align-items-center" style={{ "width": "20px" }}>{props.childrennumber}</div>
                                    <button type="button" className="btn btn-outline-secondary plusMinusButtons p-0"
                                        disabled={props.childrenplusbuttondisabled}
                                        onClick={props.childrenplusbuttonclicked}
                                    >+</button>
                                </div>
                            </div>


                            <div className="d-flex flex-row justify-content-between flex-wrap mt-3" style={{ "maxWidth": "400px" }}>
                                {(props.childrennumber == 0) ? null : 
                                                                <ChildrenLoopForAges 
                                childNumber={props.childrennumber}
                                childOBJX={props.childOBJ}
                                childrenAgeSet={props.childrenAgeSet}
                                />}
                            </div>

                        </div>
                    </Modal>
                </div>

</>)}