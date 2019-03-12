import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  userEmail: string;

  constructor(
    private afAuth: AngularFireAuth,
  ) {
    afAuth.authState.subscribe(userData => {
      if (userData) {
        this.userEmail = userData.email;
        this.loadCalendarApi();
      }
    });
  }

  loadCalendarApi() {
    // this.loadCalendarApi();
    window.gapi.load('client', () => {

      // It's OK to expose these credentials, they are client safe.
      window.gapi.client.init({
        apiKey: 'AIzaSyCsjvaC-Vbj1pvathm6aRXXTVAvb9iS-cE',
        clientId: '996603587022-h09eou98jtkmkfuegfr09jukl3eos98f.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });
      window.gapi.client.load('calendar', 'v3', () => {});
    });
  }

  addEvent() {
    const request = window.gapi.client.calendar.events.insert({
      calendarId: this.userEmail,
      resource: this.getCalendarEvent()
    });

    request.execute();
  }

  private getCalendarEvent() {
    return {
      summary: 'TABATA',
      description: 'A chance to hear more about Google\'s developer products.',
      start: {
        dateTime: new Date(),
        timeZone: 'America/Los_Angeles'
      },
      end: {
        dateTime: new Date(),
        timeZone: 'America/Los_Angeles'
      },
      reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', 'minutes': 24 * 60},
          {method: 'popup', 'minutes': 10}
        ]
      }
    };
  }
}

