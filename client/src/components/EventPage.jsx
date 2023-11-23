import { useSession, useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Sidebar from './sidebar';
import { useParams } from "react-router-dom";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

function EventScheduler() {
  const [ start, setStart ] = useState(new Date());
  const [ end, setEnd ] = useState(new Date());
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();

  const uname = useParams().username
  
  if(isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function createCalendarEvent() {
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event Added to Your Google Calendar ✅");
    });
  }

  const clearForm = () => {
    setStart(new Date());
    setEnd(new Date());
    setEventName("");
    setEventDescription("");
  }

  return (
    <div>
      <Sidebar name={uname} />
      <div className=' ml-[17vw] flex gap-1'>
        <div className=' w-[65%] bg-slate-400 max-h-[650px] overflow-scroll rounded-2xl'>
          <p className=' px-4 py-2 font-semibold text-3xl'>Your Events</p>
          <div>
            {/* Events render here */}
            <p className=' px-4 py-2'>Testing...</p>
            
          </div>
        </div>
        <div className=' w-[35%] bg-indigo-500 rounded-2xl mx-1 max-h-[420px] min-h-[420px]'>
          {session ?
            <div className=' p-4 rounded-3xl flex-col'>
              <p className=' text-2xl font-bold'>Logged in as <span className=' text-slate-200'>{session.user.email}</span></p>
              <p className=' mt-4 text-xl font-semibold'>Create New Event</p>
              <div className=' mt-1 pt-4 flex flex-col'>
                <p className=' p-2 bg-blue-400 rounded-lg'>Start of your event: <DateTimePicker onChange={setStart} value={start} className=' bg-blue-300' calendarClassName={' bg-slate-400 rounded-2xl'} clockClassName={' bg-blue-500 rounded-full'}/></p>
                <p className=' mt-2 p-2 bg-blue-400 rounded-lg'>End of your event: <DateTimePicker onChange={setEnd} value={end} className=' bg-blue-300' calendarClassName={' bg-slate-400 rounded-2xl'} clockClassName={' bg-blue-500 rounded-full'}/></p>
              </div>
              <div className='flex flex-col flex-wrap'>
                <span className=' mt-2 p-2 bg-blue-400 rounded-md'>Event Name:<input className=' px-2 rounded-md ml-1' type="text" onChange={(e) => setEventName(e.target.value)} placeholder='Title' value={eventName}/></span>
                <span className=' mt-2 p-2 bg-blue-400 rounded-md'>Event Description:<input className=' px-2 rounded-md ml-1' type="text" onChange={(e) => setEventDescription(e.target.value)} placeholder='Description' value={eventDescription}/></span>
              </div>
              <div className='flex justify-center mt-6'>
                <button className='ml-2 px-4 py-2 bg-green-400 rounded-md hover:bg-green-500' onClick={() => createCalendarEvent()}>Add Event</button>
                <button className=' ml-4 px-4 py-2 bg-yellow-400 rounded-md hover:bg-yellow-500' onClick={clearForm}>Clear</button>
                <button className=' ml-4 px-4 py-2 bg-red-400 rounded-md hover:bg-red-500' onClick={async () => {await supabase.auth.signOut();}}>Sign Out</button>
              </div>
            </div>
            :
            <div className=' flex flex-col gap-10 justify-center items-center'>
              <h2 className=' text-3xl font-semibold mt-[100px]'>Not Signed in</h2>
              <button className=' m-4 p-2 bg-yellow-500 rounded-lg' onClick={() => googleSignIn()}>Sign In With Google</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default EventScheduler;