import "cally"

function AdminCalendar({handleDateChange}) {
  return (
    <div className="block mt-24 mx-auto dropdown bg-base-100 rounded-box shadow-lg w-fit h-fit">
    <calendar-date class="cally" onchange={e=>handleDateChange(e.target.value)}>
        <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
        <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
        <calendar-month></calendar-month>
    </calendar-date>
    </div>
  )
}

export default AdminCalendar