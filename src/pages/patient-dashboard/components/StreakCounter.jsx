import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakCounter = () => {
  const currentStreak = 7;
  const longestStreak = 15;
  const weeklyGoal = 7;
  const streakProgress = (currentStreak / weeklyGoal) * 100;

  const recentDays = [
    { date: '11', day: 'Mon', completed: true },
    { date: '12', day: 'Tue', completed: true },
    { date: '13', day: 'Wed', completed: true },
    { date: '14', day: 'Thu', completed: true },
    { date: '15', day: 'Fri', completed: true },
    { date: '16', day: 'Sat', completed: true },
    { date: '17', day: 'Sun', completed: true, isToday: true }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <span className="text-xl">🔥</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Streak Counter</h2>
          <p className="text-sm text-muted-foreground">Keep your momentum going!</p>
        </div>
      </div>
      {/* Current Streak Display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-2 bg-warning/10 rounded-full px-6 py-3 mb-3">
          <span className="text-3xl">🔥</span>
          <div className="text-left">
            <p className="text-2xl font-bold text-warning">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          You're on fire! Keep following your meal plan.
        </p>
      </div>
      {/* Weekly Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Weekly Goal</span>
          <span className="text-sm text-muted-foreground">
            {currentStreak}/{weeklyGoal} days
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 bg-warning rounded-full transition-smooth"
            style={{ width: `${Math.min(streakProgress, 100)}%` }}
          />
        </div>
      </div>
      {/* Recent Days */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">This Week</h3>
        <div className="flex justify-between space-x-1">
          {recentDays?.map((day, index) => (
            <div key={index} className="flex-1 text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-smooth ${
                  day?.completed
                    ? day?.isToday
                      ? 'bg-warning text-white' :'bg-success text-white' :'bg-muted text-muted-foreground'
                }`}
              >
                {day?.completed ? (
                  day?.isToday ? (
                    <span>🔥</span>
                  ) : (
                    <Icon name="Check" size={16} />
                  )
                ) : (
                  day?.date
                )}
              </div>
              <p className="text-xs text-muted-foreground">{day?.day}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-lg font-semibold text-foreground">{longestStreak}</p>
          <p className="text-xs text-muted-foreground">Longest Streak</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-lg font-semibold text-foreground">95%</p>
          <p className="text-xs text-muted-foreground">This Month</p>
        </div>
      </div>
      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="Target" size={16} className="text-success" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">Great Progress!</h4>
            <p className="text-sm text-muted-foreground">
              You've completed your meal plan for 7 consecutive days. 
              Just 3 more days to reach your personal best!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;