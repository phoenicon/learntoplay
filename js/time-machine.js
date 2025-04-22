// Time Machine Feature Integration
document.addEventListener('DOMContentLoaded', function() {
  // Connect to API integration
  if (window.API) {
    console.log("Connecting Time Machine to API integration...");
    initializeTimeMachine();
  } else {
    console.warn("API integration not available. Time Machine will operate in local mode.");
    initializeTimeMachine(true);
  }
});

function initializeTimeMachine(localMode = false) {
  window.TimeMachine = {
    localMode: localMode,
    currentState: {
      date: new Date(),
      snapshot: null
    },
    
    // Save current state
    saveState: async function() {
      const state = {
        date: new Date(),
        progress: this.collectProgressData(),
        notes: this.collectNotesData(),
        answers: this.collectAnswersData()
      };
      
      if (this.localMode) {
        // In local mode, save to localStorage
        console.log('TimeMachine: Saving state locally', state);
        localStorage.setItem('tm_state_' + Date.now(), JSON.stringify(state));
        return state;
      } else {
        // In API mode, save to Pinecone
        console.log('TimeMachine: Saving state to Pinecone', state);
        const userId = 'charlie'; // In a real app, this would be the actual user ID
        const result = await window.API.pineconeDB.storeTimeMachineState(userId, state);
        return result;
      }
    },
    
    // Travel to a specific date
    travelTo: async function(targetDate) {
      console.log('TimeMachine: Traveling to', targetDate);
      
      const indicator = document.getElementById('time-machine-indicator');
      if (indicator) {
        indicator.textContent = '🕰️ Viewing: ' + targetDate.toLocaleDateString();
        indicator.style.display = 'flex';
      }
      
      if (this.localMode) {
        // In local mode, just update the UI
        return { success: true, message: 'Traveled to ' + targetDate.toLocaleDateString() };
      } else {
        // In API mode, retrieve state from Pinecone
        const userId = 'charlie'; // In a real app, this would be the actual user ID
        const result = await window.API.pineconeDB.getTimeMachineState(userId, targetDate.toISOString());
        
        if (result.status === 'success') {
          // Update UI with retrieved state
          this.updateUIWithState(result.state);
          return { success: true, message: 'Traveled to ' + targetDate.toLocaleDateString() };
        } else {
          return { success: false, message: 'Failed to travel to ' + targetDate.toLocaleDateString() };
        }
      }
    },
    
    // Return to present
    returnToPresent: function() {
      console.log('TimeMachine: Returning to present');
      
      const indicator = document.getElementById('time-machine-indicator');
      if (indicator) {
        indicator.style.display = 'none';
      }
      
      // Reload the page to get the current state
      window.location.reload();
      
      return { success: true, message: 'Returned to present' };
    },
    
    // Update UI with state
    updateUIWithState: function(state) {
      // This would update various UI elements based on the state
      console.log('Updating UI with state:', state);
      
      // Example: Update progress bars
      if (state.progress) {
        const updateProgress = (subject, progress) => {
          const progressElement = document.querySelector(`.progress-${subject.toLowerCase()}`);
          if (progressElement) {
            progressElement.style.width = `${progress}%`;
          }
          
          const progressTextElement = document.querySelector(`.progress-info span:last-child`);
          if (progressTextElement) {
            progressTextElement.textContent = `${progress}%`;
          }
        };
        
        if (state.progress.psychology) updateProgress('psychology', state.progress.psychology.progress);
        if (state.progress.geography) updateProgress('geography', state.progress.geography.progress);
        if (state.progress.sociology) updateProgress('sociology', state.progress.sociology.progress);
      }
      
      // Example: Update daily focus
      if (state.notes && state.notes.dailyFocus) {
        const dailyFocusElement = document.getElementById('todayTopic');
        if (dailyFocusElement) {
          dailyFocusElement.value = state.notes.dailyFocus;
        }
      }
    },
    
    // Helper methods to collect data
    collectProgressData: function() {
      // This would collect all progress data from the page
      return {
        psychology: { progress: 60, lastUpdated: new Date() },
        geography: { progress: 75, lastUpdated: new Date() },
        sociology: { progress: 85, lastUpdated: new Date() }
      };
    },
    
    collectNotesData: function() {
      // This would collect all notes data from the page
      return {
        cornellNotes: document.querySelectorAll('.cornell-container').length,
        dailyFocus: document.querySelector('#todayTopic')?.value || ''
      };
    },
    
    collectAnswersData: function() {
      // This would collect all practice answers
      return {
        saved: document.querySelectorAll('.practice-answer').length
      };
    }
  };
  
  // Set up time machine controls if they exist
  const timeTravelBtn = document.getElementById('time-travel-btn');
  const returnPresentBtn = document.getElementById('return-present-btn');
  const timeMachineDate = document.getElementById('time-machine-date');
  
  if (timeTravelBtn && timeMachineDate) {
    timeTravelBtn.addEventListener('click', () => {
      const targetDate = new Date(timeMachineDate.value);
      if (!isNaN(targetDate.getTime())) {
        window.TimeMachine.travelTo(targetDate);
      }
    });
  }
  
  if (returnPresentBtn) {
    returnPresentBtn.addEventListener('click', () => {
      window.TimeMachine.returnToPresent();
    });
  }
  
  // Auto-save state periodically
  setInterval(() => {
    window.TimeMachine.saveState();
  }, 300000); // Every 5 minutes
}
