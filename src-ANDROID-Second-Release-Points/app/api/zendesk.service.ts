// src/app/services/zendesk.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZendeskService {
  private scriptId = 'ze-snippet';
  private zendeskInitialized = false;

  constructor() {}

  loadZendesk(locale: string = 'en') {
    if (!document.getElementById(this.scriptId)) {
      const script = document.createElement('script');
      script.id = this.scriptId;
      script.src = 'https://static.zdassets.com/ekr/snippet.js?key=a754f11b-47e2-491d-8597-7b4b9181eccc';
      script.onload = () => {
        // Initialize Zendesk with locale
        if (window['zE']) {
          // Hide the Zendesk chat bubble initially
          window['zE']('webWidget', 'hide');
          
          // Open Zendesk chat directly after the script loads
          window['zE']('messenger', 'open', {
            locale: locale
          });

          this.zendeskInitialized = true;
        }
      };
      document.body.appendChild(script);
    } else {
      // If the script is already loaded, just open the chat
      if (window['zE']) {
        // Open Zendesk chat directly
        window['zE']('messenger', 'open', {
          locale: locale
        });
      }
    }
  }

  unloadZendesk() {
    const script = document.getElementById(this.scriptId);
    if (script) {
      document.body.removeChild(script);
      
      // Optionally, you can also remove the Zendesk widget if needed
      const widget = document.getElementById('webWidget');
      if (widget && widget.parentNode) {
        widget.parentNode.removeChild(widget);
      }
    }
  }
}
