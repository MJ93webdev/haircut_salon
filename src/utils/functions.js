import {collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "../firebase";

export const createAppTime = async (date, shiftStart, shiftEnd, appDuration,freeTime,maxAppointments)=>{
    // fetch appointments from db 
    console.log("given date: ",date)
    const appDocCollection = collection(db,"appointments");
    const appQuery = query(appDocCollection,where("fromTimeDate", ">=", Timestamp.fromDate(date)));
    const res = await getDocs(appQuery);
    const prevApps = []
    if(res.docs.length > 0){
      res.docs.forEach(doc => {
        console.log(doc.data().fromTimeDate);
        const newDate = doc.data().fromTimeDate.toDate();
        if(newDate.getDay() === date.getDay()){
          prevApps.push(doc.data().fromTimeDate);
        }
      })
      console.log("prevApps:",prevApps)
    }
    if(prevApps.length > maxAppointments) return;


    //counts when to add new appointment window(set by appDuration) 
    let appCounter = 0;
    // list of free appointment blocks that is going to be rendered
    let freeApp = [];
    // counts time from beggining to the end of shift, i represents minutes passed.
    for(let i=shiftStart; i <= shiftEnd; i++){
      //check if there is an appointment at the given date
      //create appointment
      if((appCounter === appDuration + freeTime || i === shiftStart) && !(i >= shiftEnd - appDuration )){
        let hours = Math.floor( i / 60 );
        let minutes = ((i / 60) % ( Math.floor( i / 60 ) )) * 60 

        date.setHours(hours);
        date.setMinutes(Math.round(minutes));
        const newDate = new Date(date);
        console.log("new date: ", newDate.getTime());
        
        if(prevApps.length > 0){
          console.log("prev app: ", prevApps[0].toDate().getTime());
            if(!prevApps.some(prevApp => prevApp.toDate().getTime() === newDate.getTime())){
              console.log("it doesn't exist!!!")
              freeApp.push(parseTime(newDate,appDuration));
            }
        }else{
          freeApp.push(parseTime(newDate,appDuration))
        }

        appCounter = 0;
      }
      appCounter ++;
    }
    console.log(freeApp)
    return(freeApp);
  }

  export const parseTime = (time, appDuration)=>{
    const fromTimeHours = time.getHours();
    const fromTimeMinutes =  time.getMinutes();
    let toTimeHours = "";
    let toTimeMinutes = "";
    
    if(time.getMinutes() + appDuration < 60){
       toTimeHours = time.getHours();
    }else{
       toTimeHours = time.getHours() + 1;
    }
    if(time.getMinutes() + appDuration <= 60){
       toTimeMinutes = time.getMinutes() + appDuration;
    }else{
       toTimeMinutes = (time.getMinutes() + appDuration) % 60;
    }

    const parsedFromTime = new Date(time);
    const parsedToTime = new Date(time);
    
    parsedFromTime.setHours(fromTimeHours);
    parsedFromTime.setMinutes(fromTimeMinutes);

    parsedToTime.setHours(toTimeHours);
    parsedToTime.setMinutes(toTimeMinutes);

    return({
      fromTime: parsedFromTime,
      toTime: parsedToTime
    }
    );
  }