import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Alert, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { time } from '../actions/timeActions';

function StatsScreen() {
    
    const dispatch = useDispatch()
    let date = []
    let modifDate = []
    let sadCounter = 0
    let happyCounter = 0
    
    let finalDate = []

    const month = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    const history = useNavigate()
    
    const userTimes = useSelector(state => state.time)

    const {error, loading, timeInfo} = userTimes

    let i = 1

    let token = null

    let redirect = ""

    let obj = {}

    useEffect(()=>{
        const userInfo = localStorage.getItem("userInfo")

        if(userInfo){
            token = "Bearer " + JSON.parse(userInfo).token
        }else{
            redirect = "/"
            history(redirect)
        }

        dispatch(time(token))
        
    },[])

  return (
    <Container>
        <h1>Stats</h1>
        {timeInfo.map((t)=>{
            let tDate = new Date(t.date)
            let result = timeInfo.filter(element=>
                new Date(element.date).getMonth() == tDate.getMonth() && new Date(element.date).getFullYear() == tDate.getFullYear()
            )
            
            let resultDate = new Date(result[0].date)
            let resultDateConcat = resultDate.getFullYear() + "-" + month[resultDate.getMonth()]
            
            obj[resultDateConcat] = result
            
            if (date.filter(d => JSON.stringify(d) == JSON.stringify(obj)).length == 0) {
                date.push(obj)
            }
            
        })}
        {
            date.forEach((d)=>{
                let obj = {}
                for (const [key, value] of Object.entries(d)) {
                    for (const [key2, value2] of Object.entries(value)) {
                        
                        if (value2.toggle_status == 0){
                            sadCounter += value2.interval
                        }else{
                            happyCounter += value2.interval
                        }
                    }
                    obj[key] = {
                        sad: Math.round(sadCounter/60),
                        happy: Math.round(happyCounter/60)
                    }

                    sadCounter = 0
                    happyCounter = 0

                    if (modifDate.filter(d => JSON.stringify(d) == JSON.stringify(obj)).length == 0) {
                        modifDate.push(obj)
                    }
                }
            })
            
            
            
        }
        {modifDate && modifDate.map((item)=>{    
            for (var key in item) {
                finalDate.push({
                    month: key,
                    value: item[key]
                })
            }
        })}

        <Table striped bordered hover key={"s"}>
            <thead>
                <tr>
                <th>Date</th>
                <th>Happy</th>
                <th>Sad</th>
                </tr>
            </thead>
            {finalDate && finalDate.map((e)=>{
                i++
                return(
                        <tbody key={i}>
                            <tr>
                            {console.log(e)}
                            <td>{e.month}</td>
                            <td>{e.value.happy < 60 ? (e.value.happy + " Minutes") : (Math.round(e.value.happy/60) + " Hours")}</td>
                            <td>{e.value.sad < 60 ? (e.value.sad + " Minutes") : (Math.round(e.value.sad/60) + " Hours")}</td>
                        </tr>
                    </tbody>
                    )
            })}
            </Table>
    </Container>
  )
}

export default StatsScreen