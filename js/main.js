// Main JavaScript for Charlie's Exam Hub

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
  // Countdown Timer
  updateCountdown();
  setInterval(updateCountdown, 60000); // Update every minute
  
  // Tab functionality
  setupTabs();
  
  // API Integration Points
  initializeAPIIntegrations();
  
  // Time Machine Functionality
  initializeTimeMachine();
});

// Countdown Timer Function
function updateCountdown() {
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;
  
  // Example exam date - should be dynamically set based on user data
  const examDate = new Date('May 13, 2025 09:00:00');
  const currentDate = new Date();
  
  const diffTime = examDate - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  countdownElement.textContent = diffDays + ' days';
  
  // Update urgency classes
  const daysLeftElements = document.querySelectorAll('.days-left');
  daysLeftElements.forEach(element => {
    const days = parseInt(element.getAttribute('data-days') || '0');
    element.classList.remove('urgent', 'near', 'comfortable');
    
    if (days <= 7) {
      element.classList.add('urgent');
    } else if (days <= 14) {
      element.classList.add('near');
    } else {
      element.classList.add('comfortable');
    }
  });
}

// Tab Functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.add('hidden'));
      
      // Add active class to clicked tab
      button.classList.add('active');
      
      // Show corresponding content
      const target = button.getAttribute('data-target');
      document.getElementById(target).classList.remove('hidden');
    });
  });
}

// API Integration Points
function initializeAPIIntegrations() {
  // Twelve Labs AI Integration
  window.TwelveLabsAI = {
    analyzeVideo: async function(videoUrl) {
      console.log('TwelveLabsAI: Analyzing video', videoUrl);
      // This would be replaced with actual API call
      return {
        status: 'success',
        topics: ['Water Cycle', 'Carbon Cycle', 'Human Impact'],
        recommendations: ['Geography Paper 1', 'Environmental Case Studies']
      };
    },
    getRecommendations: async function(userId) {
      console.log('TwelveLabsAI: Getting recommendations for user', userId);
      // This would be replaced with actual API call
      return {
        status: 'success',
        recommendations: [
          { id: 1, title: 'OCD Biological Approach', confidence: 0.87 },
          { id: 2, title: 'Water Cycle Processes', confidence: 0.92 }
        ]
      };
    }
  };
  
  // Pinecone Vector Database Integration
  window.PineconeDB = {
    storeVector: async function(vectorData) {
      console.log('PineconeDB: Storing vector data', vectorData);
      // This would be replaced with actual API call
      return { status: 'success', id: 'vec_' + Date.now() };
    },
    searchVectors: async function(query, topK = 5) {
      console.log('PineconeDB: Searching vectors for', query);
      // This would be replaced with actual API call
      return {
        status: 'success',
        results: [
          { id: 'vec_123', score: 0.95, data: { title: 'Psychopathology Notes' } },
          { id: 'vec_456', score: 0.87, data: { title: 'Biopsychology Notes' } }
        ]
      };
    }
  };
  
  // AMD GPU Acceleration Integration
  window.AMDAcceleration = {
    status: function() {
      return { available: true, device: 'AMD Radeon Pro' };
    },
    accelerateComputation: async function(data) {
      console.log('AMDAcceleration: Accelerating computation', data);
      // This would be replaced with actual API call
      return { status: 'success', result: 'Computation completed 5x faster' };
    }
  };
  
  // Update API status indicators if they exist
  updateAPIStatusIndicators();
}

function updateAPIStatusIndicators() {
  const twelveLabsStatus = document.getElementById('twelve-labs-status');
  const pineconeStatus = document.getElementById('pinecone-status');
  const amdStatus = document.getElementById('amd-status');
  
  if (twelveLabsStatus) {
    twelveLabsStatus.textContent = 'Connected';
    twelveLabsStatus.classList.add('connected');
    twelveLabsStatus.classList.remove('disconnected');
  }
  
  if (pineconeStatus) {
    pineconeStatus.textContent = 'Connected';
    pineconeStatus.classList.add('connected');
    pineconeStatus.classList.remove('disconnected');
  }
  
  if (amdStatus) {
    const amdAvailable = window.AMDAcceleration.status().available;
    amdStatus.textContent = amdAvailable ? 'Connected' : 'Disconnected';
    amdStatus.classList.toggle('connected', amdAvailable);
    amdStatus.classList.toggle('disconnected', !amdAvailable);
  }
}

// Time Machine Functionality
function initializeTimeMachine() {
  window.TimeMachine = {
    currentState: {
      date: new Date(),
      snapshot: null
    },
    
    // Save current state
    saveState: function() {
      const state = {
        date: new Date(),
        progress: this.collectProgressData(),
        notes: this.collectNotesData(),
        answers: this.collectAnswersData()
      };
      
      // In a real implementation, this would save to Pinecone or another database
      console.log('TimeMachine: Saving state', state);
      localStorage.setItem('tm_state_' + Date.now(), JSON.stringify(state));
      return state;
    },
    
    // Travel to a specific date
    travelTo: function(targetDate) {
      console.log('TimeMachine: Traveling to', targetDate);
      // In a real implementation, this would retrieve from Pinecone or another database
      // For now, we'll just update the indicator
      
      const indicator = document.getElementById('time-machine-indicator');
      if (indicator) {
        indicator.textContent = 'Viewing: ' + targetDate.toLocaleDateString();
        indicator.style.display = 'flex';
      }
      
      // This would load the actual state from that date
      return { success: true, message: 'Traveled to ' + targetDate.toLocaleDateString() };
    },
    
    // Return to present
    returnToPresent: function() {
      console.log('TimeMachine: Returning to present');
      
      const indicator = document.getElementById('time-machine-indicator');
      if (indicator) {
        indicator.style.display = 'none';
      }
      
      // This would load the current state
      return { success: true, message: 'Returned to present' };
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

// Cornell Notes Functionality
function initializeCornellNotes() {
  const cornellifyBtn = document.getElementById('cornellify-btn');
  const sourceText = document.getElementById('sourceText');
  const cuesContainer = document.getElementById('cues-container');
  const notesContainer = document.getElementById('notes-container');
  const summaryContainer = document.getElementById('summary-container');
  
  if (cornellifyBtn && sourceText) {
    cornellifyBtn.addEventListener('click', () => {
      const text = sourceText.value;
      if (!text.trim()) return;
      
      // In a real implementation, this would use AI to generate Cornell notes
      // For now, we'll just split the text into sections
      
      const lines = text.split('\n').filter(line => line.trim());
      
      // Generate cues (questions)
      if (cuesContainer) {
        cuesContainer.innerHTML = '';
        const ul = document.createElement('ul');
        
        for (let i = 0; i < Math.min(5, lines.length); i++) {
          const line = lines[i];
          const question = generateQuestionFromLine(line);
          
          const li = document.createElement('li');
          li.textContent = question;
          ul.appendChild(li);
        }
        
        cuesContainer.appendChild(ul);
      }
      
      // Generate notes
      if (notesContainer) {
        notesContainer.innerHTML = '';
        
        for (const line of lines) {
          const p = document.createElement('p');
          p.textContent = line;
          notesContainer.appendChild(p);
        }
      }
      
      // Generate summary
      if (summaryContainer) {
        summaryContainer.innerHTML = '';
        
        const p = document.createElement('p');
        p.textContent = `Summary of ${lines.length} key points about ${lines[0] || 'this topic'}.`;
        summaryContainer.appendChild(p);
      }
    });
  }
}

// Helper function to generate a question from a line of text
function generateQuestionFromLine(line) {
  line = line.trim();
  
  if (line.endsWith('.')) {
    line = line.substring(0, line.length - 1);
  }
  
  if (line.includes(' is ')) {
    return 'What is ' + line.split(' is ')[0] + '?';
  } else if (line.includes(' are ')) {
    return 'What are ' + line.split(' are ')[0] + '?';
  } else if (line.length > 50) {
    return 'Can you explain: ' + line.substring(0, 40) + '...?';
  } else {
    return 'What about: ' + line + '?';
  }
}

// Daily Focus Tracker Functionality
function initializeDailyFocusTracker() {
  const focusForm = document.getElementById('focus-tracker-form');
  
  if (focusForm) {
    focusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const todayTopic = document.getElementById('todayTopic').value;
      const nextFocus = document.getElementById('nextFocus').value;
      const confidence = document.getElementById('confidence').value;
      const note = document.getElementById('note').value;
      
      // In a real implementation, this would save to a database
      // For now, we'll just log to console and show a success message
      
      console.log('Daily Focus Tracker:', {
        todayTopic,
        nextFocus,
        confidence,
        note,
        date: new Date()
      });
      
      alert('Focus tracker entry saved!');
      
      // Save to time machine state
      if (window.TimeMachine) {
        window.TimeMachine.saveState();
      }
    });
  }
}

// Practice Answer Writer Functionality
function initializePracticeAnswerWriter() {
  const answerForm = document.getElementById('practice-answer-form');
  
  if (answerForm) {
    answerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const question = document.getElementById('questionInput').value;
      const answer = document.getElementById('answerInput').value;
      const selfAssessment = document.getElementById('selfAssessment').value;
      
      // In a real implementation, this would save to a database
      // For now, we'll just log to console and show a success message
      
      console.log('Practice Answer:', {
        question,
        answer,
        selfAssessment,
        date: new Date()
      });
      
      alert('Practice answer saved!');
      
      // Save to time machine state
      if (window.TimeMachine) {
        window.TimeMachine.saveState();
      }
    });
  }
}

// Initialize all tool functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeCornellNotes();
  initializeDailyFocusTracker();
  initializePracticeAnswerWriter();
});
