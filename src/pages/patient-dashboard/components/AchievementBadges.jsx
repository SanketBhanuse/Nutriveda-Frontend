import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: "Sugar-Free Hero",
      emoji: "🏆",
      description: "Completed 7 days without added sugar",
      earned: true,
      earnedDate: "2025-09-15",
      progress: 100,
      category: "dietary"
    },
    {
      id: 2,
      title: "Streak Master",
      emoji: "🔥",
      description: "Maintained 10-day meal plan streak",
      earned: true,
      earnedDate: "2025-09-10",
      progress: 100,
      category: "consistency"
    },
    {
      id: 3,
      title: "Ayurvedic Explorer",
      emoji: "🌿",
      description: "Tried 15 different Ayurvedic recipes",
      earned: false,
      progress: 80,
      target: 15,
      current: 12,
      category: "exploration"
    },
    {
      id: 4,
      title: "Early Bird",
      emoji: "🌅",
      description: "Had breakfast before 8 AM for 5 days",
      earned: false,
      progress: 60,
      target: 5,
      current: 3,
      category: "timing"
    },
    {
      id: 5,
      title: "Hydration Champion",
      emoji: "💧",
      description: "Drank 8 glasses of water daily for a week",
      earned: false,
      progress: 40,
      target: 7,
      current: 3,
      category: "hydration"
    },
    {
      id: 6,
      title: "Mindful Eater",
      emoji: "🧘",
      description: "Practiced mindful eating for 21 days",
      earned: false,
      progress: 25,
      target: 21,
      current: 5,
      category: "mindfulness"
    }
  ];

  const earnedAchievements = achievements?.filter(a => a?.earned);
  const inProgressAchievements = achievements?.filter(a => !a?.earned);

  const getCategoryColor = (category) => {
    const colors = {
      dietary: 'text-success',
      consistency: 'text-warning',
      exploration: 'text-primary',
      timing: 'text-accent',
      hydration: 'text-blue-500',
      mindfulness: 'text-purple-500'
    };
    return colors?.[category] || 'text-muted-foreground';
  };

  const getCategoryBg = (category) => {
    const colors = {
      dietary: 'bg-success/10',
      consistency: 'bg-warning/10',
      exploration: 'bg-primary/10',
      timing: 'bg-accent/10',
      hydration: 'bg-blue-50',
      mindfulness: 'bg-purple-50'
    };
    return colors?.[category] || 'bg-muted/10';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Award" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Achievement Badges</h2>
          <p className="text-sm text-muted-foreground">
            {earnedAchievements?.length} earned • {inProgressAchievements?.length} in progress
          </p>
        </div>
      </div>
      {/* Earned Achievements */}
      {earnedAchievements?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="Trophy" size={16} className="text-success" />
            <span>Earned Badges</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {earnedAchievements?.map((achievement) => (
              <div
                key={achievement?.id}
                className={`p-4 rounded-lg border-2 border-success/20 ${getCategoryBg(achievement?.category)} relative overflow-hidden`}
              >
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} className="text-white" />
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{achievement?.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {achievement?.description}
                    </p>
                    <p className="text-xs text-success font-medium">
                      Earned on {new Date(achievement.earnedDate)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* In Progress Achievements */}
      <div>
        <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Target" size={16} className="text-primary" />
          <span>In Progress</span>
        </h3>
        <div className="space-y-3">
          {inProgressAchievements?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`p-4 rounded-lg border border-border ${getCategoryBg(achievement?.category)}`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl opacity-60">{achievement?.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                    <span className="text-sm text-muted-foreground">
                      {achievement?.current}/{achievement?.target}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement?.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">Progress</span>
                      <span className="text-xs text-muted-foreground">
                        {achievement?.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-smooth ${getCategoryColor(achievement?.category)?.replace('text-', 'bg-')}`}
                        style={{ width: `${achievement?.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-lg font-semibold text-foreground">{earnedAchievements?.length}</p>
          <p className="text-xs text-muted-foreground">Earned</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-lg font-semibold text-foreground">{inProgressAchievements?.length}</p>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-lg font-semibold text-foreground">{achievements?.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;