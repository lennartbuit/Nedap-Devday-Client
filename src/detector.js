
// The methods below will be called with the following data:
// - An array of shifts
// - A trace with clockings
//
//
// A shift is an object consisting of:
//   - shift_name
//     Name of the shift
//   - start_time
//     Start time of the shift in seconds from the start of the day
//   - stop_time
//     Stop time of the shift in seconds from the start of the day
//   - walk_in_time
//     Time that workers can clock in before or clock out after the shift in seconds
//   - customer
//     Customer at which the shift is taking place
//   - location
//     Location within a customer that the shift is taking place
//
// For example:
//   { "shift_name": "Nedap 1",
//     "start_time": 28800,
//     "stop_time": 57600,
//     "customer": "Nedap",
//     "location": "Staffing Solutions"}
//
// A trace consists of an ID and an array of clockings. It consists of:
//   - id
//     Uniquely identifying ID for this trace
//   - clockings
//     An array of clockings (sorted by time)
//
// For example:
//   { "id": 34229,
//     "clockings": [ ... ] }
//
//
// A clocking consists of:
//   - time
//     Time of the clocking since the start of the day
//   - status
//     "IN" for inclockings, "OUT" for outclockings
//   - location
//     The location that someone clocks at
//   - customer
//     The customer that the clocking is registered at
//
// For example:
//   { "time": 28765,
//     "status": "IN",
//     "location": "Staffing Solutions",
//     "customer": "Nedap" }
//

export const violatesRule1 = (shifts, trace) => {
  return false;
}

export const violatesRule2 = (shifts, trace) => {
  return false;
}

export const violatesRule3 = (shifts, trace) => {
  return false;
}

export const violatesRule4 = (shifts, trace) => {
  return false;
}

export const violatesRule5 = (shifts, trace) => {
  return false;
}

export const violatesRule6 = (shifts, trace) => {
  return false;
}

export const violatesRule7 = (shifts, trace) => {
  return false;
}

export const violatesRule8 = (shifts, trace) => {
  return false;
}

export const violatesRule9 = (shifts, trace) => {
  return false;
}
