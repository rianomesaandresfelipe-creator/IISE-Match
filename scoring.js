const Weights = {
  q4: 3,
  q5: 2, q6: 2, q7: 2, q8: 2, q9: 2,
  q10: 3, q11: 3, q13: 3,
  q12: 2, q14: 2,
  q15: 1, q18: 1
};

class ScoringEngine {
  constructor() {
    this.rawScores = { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 };
    this.percentages = {};
    this.topProfiles = [];
    this.tags = {}; // keep track of tags for recommender
    this.modifiers = {};
    this.level = 'básico';
  }

  calculateScores(answers) {
    // Reset
    this.rawScores = { D:0, T:0, E:0, L:0, O:0, S:0, X:0, P:0 };
    this.tags = {};
    
    // Calculate raw scores based on responses
    for (const [qId, response] of Object.entries(answers)) {
      const q = QUESTIONS.find(question => question.id === qId);
      if (!q) continue;

      const weight = Weights[qId] || 0;
      let selectedOptions = Array.isArray(response) ? response : [response];

      selectedOptions.forEach(optId => {
        const option = q.options.find(o => o.id === optId);
        if (option) {
          if (option.scores) {
            for (let [profile, score] of Object.entries(option.scores)) {
              if (this.rawScores[profile] !== undefined) {
                this.rawScores[profile] += score * weight;
              }
            }
          }
          if (option.tags) {
            option.tags.forEach(tag => {
              this.tags[tag] = (this.tags[tag] || 0) + 1;
            });
          }
          if (option.modifier) {
            this.modifiers[option.modifier] = (this.modifiers[option.modifier] || 0) + 1;
          }
          if (option.level) {
            this.level = option.level;
          }
        }
      });
    }

    this.normalizeScores();
    return this.getResults();
  }

  normalizeScores() {
    let maxPossible = 0;
    // Approximating max possible score per profile based on answers is tricky, 
    // we can either normalize over the sum of all profiles or the max profile score.
    // Let's normalize relative to the maximum profile score obtained.
    let maxScore = Math.max(...Object.values(this.rawScores));
    if (maxScore === 0) maxScore = 1; // avoid division by zero
    
    for (let profile in this.rawScores) {
      this.percentages[profile] = Math.round((this.rawScores[profile] / maxScore) * 100);
    }

    // Determine Top Profiles
    let sorted = Object.entries(this.percentages).sort((a,b) => b[1] - a[1]);
    this.topProfiles = sorted.slice(0, 3);
  }
  
  getCombinedProfile() {
    if (this.topProfiles.length < 2) return null;
    let p1 = this.topProfiles[0];
    let p2 = this.topProfiles[1];
    
    // Check if they are within 15% of each other
    if (p1[1] - p2[1] <= 15) {
      // Find combined profile
      const combination = [p1[0], p2[0]].sort().join('-');
      return COMBINED_PROFILES.find(cp => cp.profiles.slice().sort().join('-') === combination) || null;
    }
    return null;
  }

  getResults() {
    let combined = this.getCombinedProfile();
    return {
      percentages: this.percentages,
      topProfile: PROFILES[this.topProfiles[0][0]],
      secondaryProfiles: this.topProfiles.slice(1).map(p => PROFILES[p[0]]),
      combinedProfile: combined,
      topTags: Object.entries(this.tags).sort((a,b) => b[1] - a[1]).slice(0,5).map(t => t[0]),
      level: this.level
    };
  }
}

window.ScoringEngine = ScoringEngine;
