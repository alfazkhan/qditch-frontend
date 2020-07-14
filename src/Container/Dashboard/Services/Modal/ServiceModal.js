import React, { useEffect, useState } from 'react'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Button, Box, TextField, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';



const ServiceModal = (props) => {





    useEffect(() => {



    }, [props])

    function validate(evt) {
        var theEvent = evt || window.event;
      
        // Handle paste
        if (theEvent.type === 'paste') {
            // eslint-disable-next-line no-restricted-globals
            key = event.clipboardData.getData('text/plain');
        } else {
        // Handle key press
        // eslint-disable-next-line no-restricted-globals
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
      }
 

    return (

        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <div>
                    <div className="row mt-3" key={new Date()}>
                        {props.action === "CustomEdit" || props.action === "CustomAdd"
                            ? <TextField
                                variant="outlined"
                                // margin="normal"
                                required
                                id={'name'}
                                onChange={props.change}
                                label="Service Name"
                                // value={props.values.name}
                                autoComplete=""
                                className={window.innerWidth < 768 ? "col-12": "col"}
                            />
                            : <FormControl variant="outlined" className={window.innerWidth < 768 ? "col-12": "col"}>
                                <InputLabel>Select Service</InputLabel>
                                <Select
                                    name='selectedServices'
                                    onChange={props.change}
                                    label="Select Service"
                                    // value={props.values.name}
                                    className={window.innerWidth < 768 ? "col-12": "col"}
                                >

                                    {props.services.map((value, index) => {
                                        // console.log(props.services)
                                        return <MenuItem key={index} value={index} >{value}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>}

                        {props.action === "CustomEdit" || props.action === "CustomAdd"
                            ? <FormControl variant="outlined" className="col-sm">
                                <InputLabel>Select Category</InputLabel>
                                <Select
                                    name='category'
                                    onChange={props.change}
                                    // value={props.values.category}
                                    label="Select Category"
                                    className={window.innerWidth < 768 ? "col-12": "col"}
                                >
                                    {props.categories}

                                </Select>
                            </FormControl>
                            : null}

                        <TextField
                            variant="outlined"
                            // margin="normal"
                            required
                            id={'prices'}
                            onChange={props.change}
                            label="Price (&#x20b9;)"
                            // value={props.values.price}
                            onKeyPress={validate}
                            autoComplete=""
                            className={window.innerWidth < 768 ? "col-12": "col"}
                        />
                        <TextField
                            variant="outlined"
                            // margin="normal"
                            required
                            id={'durations'}
                            onChange={props.change}
                            label={"Duration(Min)"}
                            onKeyPress={validate}
                            // value={props.values.duration}
                            autoComplete=""
                            className={window.innerWidth < 768 ? "col-12": "col"}
                        />
                    </div>
                </div>
            </DialogContentText>
        </DialogContent>
    )
}

export default ServiceModal
