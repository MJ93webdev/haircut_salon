import React from 'react'

function TimePicker() {
  const [freeAppointments, setFreeAppointments] = useState([]);
  const [chosenAppointment, setChosenAppointment] = useState(null);
  const appDuration = location.state.service.duration || {};
  // free time in between appointments ( for cigarette, cleaning the hair )
  const freeTime = 10;

    //work time 9h ==> 17h
  const shiftStart = 9 * 60;
  const shiftEnd = 17 * 60;

    const handleSelectTime = (time)=> {
    setChosenAppointment(freeAppointments.filter(app => app === time))
    setFreeAppointments([]);
  }

    const createAppTime = async (e)=>{
    // fetch appointments from db 
    const appDocCollection = collection(db,"appointments");
    const appQuery = query(appDocCollection,where("time", ">=", Timestamp.fromDate(e)));
    const res = await getDocs(appQuery);
    const appForDay = []
    if(res.docs.length > 0){
      res.docs.forEach(doc => {
        console.log(doc.data().time);
        const date = doc.data().time.toDate();
        if(date.getDay() === e.getDay()){
          appForDay.push(doc.data().time);
        }
      })
      console.log(appForDay)
    }
}



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

        e.setHours(hours);
        e.setMinutes(Math.round(minutes));
        const date = new Date(e);
        if(appForDay.length > 0){
          appForDay.forEach(appointment => {
            if(date.getTime() !== appointment.toDate().getTime()){
              freeApp.push(parseTime(date));
            }
          })
        }else{
          freeApp.push(parseTime(date))
        }

        appCounter = 0;
      }
      appCounter ++;
    }
    setFreeAppointments(freeApp);
  }

  const parseTime = (time)=>{
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


  return (
    <div>TimePicker</div>
  )
}

export default TimePicker