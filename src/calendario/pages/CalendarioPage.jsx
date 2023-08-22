import { Calendar } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarModal, CalendarioEvent, Navbar } from "../"
import { addHours } from 'date-fns';
import { getMessages, localizer } from '../../helpers';
import { useState } from 'react';
import { useUiStore } from '../../hooks';



const myEventsList = [
  {
    start: new Date(),
    end:  addHours (new Date(), 2) ,
    title: "Some title",
    notes: "welcome to the page",
    user: {
      _id: '123',
      name: 'rommys'
    }
  }
];




export const CalendarioPage = () => {

  const { openDateModal } = useUiStore();
  
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
    return style
  }

  const onDoubleClick = (event) => {
    console.log({onDoubleClick: event});
    openDateModal();
  }

  const onClick = () => {
    console.log({onClick: event})
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }
  
  return (
    <div>
      <Navbar/>

      <Calendar
        culture='es'
        localizer={localizer}
        events={myEventsList}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessages()}
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarioEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onClick}
        onView={onViewChanged}
      />
      <CalendarModal/>
    </div>
  )
}

