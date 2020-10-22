import React, { useState, useEffect } from 'react';
import './index.css';
import { Col, Container, ContainerFluid, Row } from '@uprise/grid';
import { Button } from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios from "axios";
import moment from "moment";

function Submit(){
    return(
      <div style={{textAlign: "center"}}>
          <CheckCircleIcon color="secondary"  style={{ fontSize: 100 }}/>
          <p>Booking Successful!!</p>
      </div>
    );
}

function Slots(props){
    const handleClick = (e) => {
        props.setDateSelect(e);
        let result = [...props.freeSlots];
        result.splice(result.indexOf(e), 1);
        axios.post("http://localhost:5000/bookSlot", {range: props.timeRange, appDate: moment(props.date, "L").format("L").split("/").join(""), data: result})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    useEffect(()=> {
        if(!props.data) {
        axios.get(`http://localhost:5000/getFreeSlots/${props.timeRange}`)
        .then(res => {
            props.setData(res.data)
        })
        .catch(err => console.log("1111111", err));
    }
    },[]);

    let a = props.data;
    let slots= props.mockData && props.mockData.map((b)=>{
        return(
        <span style={{margin: "10px"}}>
            <Button disabled={a && !a.includes(b) ? true : false} variant={a && !a.includes(b) ? "outlined" : "contained"} color={a && a.includes(b) ? "primary" : ""} onClick={() => handleClick(b)}>{b}</Button>
        </span>
        );
    })
    return (
      <div className="card">
          { !props.dateSelect ? (
        <>
          <h2>Click on any of the time slots to book</h2>
          <Container>
          <Row>
            {props.data && slots}
         </Row>
          </Container>
          </>
          )  : (
              <Submit />
          )
        }
      </div>
    );
}


export default Slots;