import { useSession, useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

function EventScheduler() {
  const [ start, setStart ] = useState();
  const [ end, setEnd ] = useState();
  const [ eventName, setEventName ] = useState("");
  const [ eventDescription, setEventDescription ] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();
  
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

  async function signOut() {
    await supabase.auth.signOut();
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
      alert("Event created, check your Google Calendar!");
    });
  }

  return (
    <div>
      <div style={{width: "70%", margin: "30px auto",textAlign:"left"}}>
        {session ?
          <>
            <p className=' text-2xl font-bold'>Logged in as {session.user.email}</p>
            <p>Start of your event: </p>
            <DateTimePicker onChange={setStart} value={start} />
            <p>End of your event: </p>
            <DateTimePicker onChange={setEnd} value={end} />
            <p>Event name: <input type="text" onChange={(e) => setEventName(e.target.value)} placeholder='Title'/></p>
            <p>Event description: <input type="text" onChange={(e) => setEventDescription(e.target.value)} placeholder='Description'/></p>
            <br />
            <div style={{textAlign:"center"}}>
              <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>
              <p></p>
              <button onClick={() => signOut()}>Sign Out</button>
            </div>
          </>
          :
          <>
            <h2>Not Signed in</h2>
            <button onClick={() => googleSignIn()}>Sign In With Google</button>
          </>
        }
      </div>
    </div>
  );
}

export default EventScheduler;