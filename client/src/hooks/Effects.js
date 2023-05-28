import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const minute = 60000;
export const unixEpoch = dayjs(0);

function updateTimeEffect(time, setTimeText) { 
  if (dayjs(time).isSameOrBefore(unixEpoch)) {  
    setTimeText('');
    return;
  }

  const interval = setInterval(() => {
    setTimeText(dayjs(time).fromNow());
  }, minute);

  return () => clearInterval(interval);
}

/** update time from now every minute. **/
export function useTimeUpdater(time){
  const [timeText, setTimeText] = useState(dayjs(time).fromNow())
  useEffect(()=>updateTimeEffect(time, setTimeText), [time]);
  return timeText
}

