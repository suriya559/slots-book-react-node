import React, { useState, useEffect }from 'react';
import { Col, Container, ContainerFluid, Row } from '@uprise/grid';
import Calender from './calender/index';
import TextField from './textfields/index';
import { Button, TaskButton } from '@uprise/button';
import { Card } from '@uprise/card';
import './index.css';
import Slots from '../slots/index';
import axios from "axios";
import moment from "moment";
import mockData from "../../mock/mock.json"

function Appointment(props){
   const [view, updateView] = useState(false);
   const [dateSelect, setDateSelect] = useState('');
   const [timeRange, setTimeRange] = useState("15");
   const [data, setData] = useState(null);
   const [freeSlots, setFreeSlots] = useState([]);
   const [date, setDate] = useState(moment());
   const [error, setError] = useState(false);

  useEffect(() => {
   window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  },[view])
  const handleDateSelect = (e) => {
      setDateSelect(e);
      //window.scrollTo(0,document.body.scrollHeight);
      setTimeout(() => {
         updateView(false);
      }, 1000)
  }

  const clickHandler=()=>{
      window.scrollTo(0,document.body.scrollHeight);
      if(moment(new Date(), "L").format("L") === moment(date, "L").format("L") || !moment().isSameOrAfter(moment(date, "LLL"))) {
      setError(false);
      updateView(true);
      setDateSelect("");
      let x = timeRange === "15" ? "fifteenMinSlot" : timeRange === "30" ? "thirtyMinSlot" : timeRange === "60" ? "sixtyMinSlot" : "";
      axios.post("http://localhost:5000/getFreeSlots", {range: x})
      .then(res => {
         if(res.data[moment(date, "L").format("L").split("/").join("")]) {
            setFreeSlots(res.data[moment(date, "L").format("L").split("/").join("")]);
            setData(res.data[moment(date, "L").format("L").split("/").join("")])
         } else {
            axios.get(`http://localhost:5000/getFreeSlots/${timeRange}`)
            .then(res => {
                axios.post("http://localhost:5000/bookSlot", {range: timeRange, appDate: moment(date, "L").format("L").split("/").join(""),data: res.data})
                  .then(res => console.log(res))
                  .catch(err => console.log(err))
                setData(res.data)
            })
            .catch(err => console.log("1111111", err));
         }
      })
      .catch(err => console.log("5555555", err))
   } else {
      setError(true);
   }
   }
   let x = timeRange === "15" ? "fifteenMinSlot" : timeRange === "30" ? "thirtyMinSlot" : timeRange === "60" ? "sixtyMinSlot" : "";
   return(
        <Container >
          <Card className="Center">    
              <Row style={{justifyContent: "space-evenly"}}>
               <Calender date={date} setDate={(d) => setDate(d)} timeRange={timeRange}/>
               <TextField setFreeSlots={setFreeSlots} setData={setData} updateView={updateView} setTimeRange={(t) => setTimeRange(t)}/>
              </Row>
               <Button className="Button" onClick={clickHandler} title="Get Free Slots" />
               {error && <div style={{color: "red", textAlign: "center", padding: "10px"}}>Cannot book Appointment for past dates</div>}
            </Card>
            {view && !error && <Slots date={date} freeSlots={freeSlots} setData={setData} data={data} mockData={mockData[x]} timeRange={timeRange} setDateSelect={(e) => handleDateSelect(e)} dateSelect={dateSelect}/>}
        </Container>
   );
}

export default Appointment;