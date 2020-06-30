import React from 'react'
import { MenuItem, FormControl, InputLabel, Select, TextField, DialogContent, DialogContentText } from '@material-ui/core'

const StylistModal = (props) => {
    return (
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <div className="row">
                    <FormControl variant="outlined" className="col-sm text-center">
                        <InputLabel>Title</InputLabel>
                        <Select
                            name={"Stylist Title"}
                            // value={this.state.currentNumber}
                            onChange={props.change}
                            label="Title"
                            className="col-8"
                            required
                            placeholder="title"
                            margin="none"
                        >

                            {/* <MenuItem key={new Date()} name={"None"} value={"none"} disabled>None</MenuItem> */}
                            <MenuItem key={new Date()} name={"Mr"} value={"Mr."}>Mr.</MenuItem>
                            <MenuItem key={new Date()} name={"Mr"} value={"Ms."}>Ms.</MenuItem>
                            <MenuItem key={new Date()} name={"Mr"} value={"Mrs."}>Mrs.</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        variant="outlined"
                        margin="none"
                        onChange={props.change}
                        required
                        id={this.state.currentNumber}
                        label={"Stylist Name"}
                        name="sal-name"
                        autoComplete=""
                        className="col-10"
                    />
                </div>
            </DialogContentText>
        </DialogContent>
    )
}

export default StylistModal
