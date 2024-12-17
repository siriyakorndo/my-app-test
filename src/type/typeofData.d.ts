interface cardInnerType {
  id: string;
  patientName: string;
  patientCode: string;
  daysLeft: number;
  status: string;
  roomId: number;
}

interface Patient {
  id: string;
  name: string;
  patientCode: string;
  tel: string;
  status: string;
}

interface MeetingData {
  meetingId: string;
  patient: {
    id: string;
    name: string;
    patientCode: string;
    tel: string;
    status: string;
  };
  doctorId: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  service: string;
}

interface ScheduleTask {
  task: string;
  startTime: string;
  endTime: string;
  doctorId?:string
}
