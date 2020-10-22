import React, { useState } from 'react';
import { Button } from '@uprise/button';
import { Card } from '@uprise/card';
import { Container, Row } from '@uprise/grid';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import Calender from "../../appointment/calender";
import moment from "moment";
import mockData from "../../../mock/mock.json"
import axios from "axios";

function ShowEvents() {
  const [view, updateView] = useState(false);
  const [date, setDate] = useState(moment());
  const [response, setResponse] = useState({fifteenMinSlot: [], thirtyMinSlot: [], sixtyMinSlot: []})
  const [loading, setLoading] = useState(false);
   let events = [] ;
  const clickHandler=()=>{
    updateView(true);
    let res = {...response};
    ["fifteenMinSlot", "thirtyMinSlot", "sixtyMinSlot"].map(async (d) => {
      await axios.post("http://localhost:5000/getFreeSlots", {range: d})
        .then(r => {
          res[d] = r.data;
          setResponse(res);
          setLoading(true);
        }).catch(err => console.log(err));
    })

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
 }
 

 ["fifteenMinSlot", "thirtyMinSlot", "sixtyMinSlot"].forEach(d => {
   mockData[d].map(w => {
     if(response[d] && response[d][moment(date, "L").format("L").split("/").join("")] && response[d][moment(date, "L").format("L").split("/").join("")].length > 0) {
    if(!response[d][moment(date, "L").format("L").split("/").join("")].includes(w)) {
      events.push(
        <div style={{textAlign: "center", padding: "15px", margin: "10px", backgroundColor: "orange", borderRadius: "30px"}}>
        {w}
      </div>
       )
    }
  }
   })
 })
  return (
    <div>
      <Container >
          <Card className="Center">    
              <Row style={{justifyContent: "space-evenly"}}>
               <Calender date={date} setDate={(d) => setDate(d)}/>
              </Row>
               <Button className="Button" onClick={() => clickHandler()} title="Show All Events" />
            </Card>
            { view && loading &&
            <div className="card">
              {events && events.length > 0 ? events : <div style={{textAlign: "center", color: "red"}}>No Events to display</div>}
            </div>
          }
        </Container>
  </div>
  )
}

export default ShowEvents;

