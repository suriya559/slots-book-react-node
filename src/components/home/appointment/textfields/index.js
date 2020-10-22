import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import React from 'react';
import './index.css';

function TextField(props){

  const handleChange = (e) => {
    props.setTimeRange(e.target.value);
    props.updateView(false);
    props.setData(null);
    props.setFreeSlots([]);
  }
  return (
    <div>
       <h4>Select your timezone</h4>
       <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-age-native-simple">TimeZome</InputLabel>
        <Select
          native
          label="TimeZome"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value={"India"}>India</option>
          <option value={"USA"}>USA</option>
          <option value={"UK"}>UK</option>
        </Select>
      </FormControl>

      <h4>Select call duration</h4>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-age-native-simple">TimeZome</InputLabel>
        <Select
          native
          //value={state.age}
          onChange={handleChange}
          label="TimeZome"
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value="15">15 Minutes</option>
          <option value="30">30 Minutes</option>
          <option value="60">60 Minutes</option>
        </Select>
      </FormControl>
    </div>
  );
}

export default TextField;